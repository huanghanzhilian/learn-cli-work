const EventEmitter = require('events');
const readline = require('readline');
const MuteStream = require('mute-stream');
const { fromEvent } = require('rxjs'); // 处理事件监听
const ansiEscapes = require('ansi-escapes');

const options = {
  type: 'list',
  name: 'name',
  message: 'select your name: ',
  choices: [{
    name: 'sam', value: 'sam'
  },{
    name: 'shuangyue', value: 'sy',
  },{
    name: 'zhangxuan', value: 'zx',
  }],
};

function Prompt(options) {
  return new Promise((resolve, reject) => {
    try {
      const list = new List(options);
      list.render();
      list.on('exit', function(answers){
        resolve(answers);
      });
    } catch (e) {
      reject(e)
    }
  });
}

// 交互列表组件
class List extends EventEmitter {
  constructor(option) {
    super();
    this.name = option.name;
    this.message = option.message;
    this.choices = option.choices;
    this.input = process.stdin;
    this.output = process.stdout;

    const ms = new MuteStream();
    ms.pipe(process.stdout);
    this.output = ms;
    this.rl = readline.createInterface({
      input: this.input,
      output: this.output
    });
    this.selected = 0;
    this.height = 0; // 列表高度， 有四行就是4
    this.keypresss = fromEvent(this.rl.input, 'keypress').forEach(this.onKeypress); // 监听 input keypress 事件。处理函数为 this.onKeypress
    this.haveSelected = false; // 是否已经选择完毕
  }

  /**
   * 处理按下上下键逻辑
   * @param {Array} keymap 按键信息
   */
  onKeypress = (keymap) => {
    const key = keymap[1]; // 第一个元素是undefined
    if (key.name === 'down') { // 下键
      this.selected++;
      if (this.selected > this.choices.length - 1) {
        this.selected = 0;
      }
      this.render();
    } else if (key.name === 'up') {
      this.selected--;
      if (this.selected < 0) {
        this.selected = this.choices.length - 1;
      }
      this.render();
    } else if (key.name === 'return') {
      this.haveSelected = true;
      this.render();
      this.close();
      this.emit('exit', this.choices[this.selected]);
    }
  }

  /**
   * 想控制台输出信息
   */
  render() {
    this.output.unmute(); // 允许输出信息
    this.clean();
    this.output.write(this.getContent());
    this.output.mute(); // 阻止输出信息
  }

  /**
   * 获取当前渲染信息
   */
  getContent = () => {
    if (!this.haveSelected) {
      // 32m：绿色前景；39m：默认前景；1m：字体加粗；22m：默认粗；0m：重置；2m：字体变细
      let title = '\x1B[32m?\x1B[39m \x1B[1m' + this.message + '\x1B[22m\x1B[0m\x1B[0m\x1B[2m(Use arrow keys)\x1B[22m\n';
      this.choices.forEach((choices, index) => {
        if (index === this.selected) {
          // 判断是否为最后一个元素，如果是，则不加 \n
          if (index === this.choices.length - 1) {
            title += '\x1B[36m❯ ' + choices.name + '\x1B[39m';
          } else {
            title += '\x1B[36m❯ ' + choices.name + '\x1B[39m \n';
          }
        } else {
          // 判断是否为最后一个元素，如果是，则不加 \n
          if (index === this.choices.length - 1) {
            title += '  ' + choices.name;
          } else {
            title += '  ' + choices.name + '\n';
          }
        }
      });
      this.height = this.choices.length + 1;
      return title;
    } else {
      // 输入结束后逻辑
      const name = this.choices[this.selected].name;
      let title = '\x1B[32m?\x1B[39m \x1B[1m' + this.message + '\x1B[22m\x1B[0m\x1B[36m' + name + '\x1B[39m\x1B[0m \n';
      return title;
    }
  }

  /**
   * 清屏
   */
  clean() {
    const emptyLines = ansiEscapes.eraseLines(this.height); // 生成空行
    this.output.write(emptyLines);
  }

  /**
   * 关闭输入输出流
   */
  close() {
    this.output.mute(); // 禁止输出
    this.rl.output.end();
    this.rl.pause(); // 停止监听
    this.rl.close();
  }
}

Prompt(options).then(answers => {
  console.log('answers: ', answers);
});
