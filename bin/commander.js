#!/usr/bin/env node

// commander 会自动实现 -V -h 功能
// ode index.js  --version

// const { program } = require('commander');

const { Command } = require('commander');
const pkg = require('../package.json');

const program = new Command();

// 基本使用,注册参数
program
  .name(Object.keys(pkg.bin)[0])// Usage: imooc-test-berners <command> [options] 实现nanme
  .usage('<command> [options]') // Usage: imooc-test-berners <command> [options] 实现后面两个参数
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false) // 默认值为 false
  .option('-e, --envName <envName>', '获取环境变量名称')


// 相关方法
// program.outputHelp();

// 打印参数
// const options = program.opts();
// console.log(options.debug);
// console.log(options.envName);


// 注册command命令为主命令，方式1, 参考 https://github.com/tj/commander.js/blob/master/examples/configure-help.js
//              https://github.com/tj/commander.js/blob/master/examples/custom-help-description
const clone = program.command('clone <source> [destination]');
clone
  .option('-f, --force', '是否强制克隆')
  .description('clone a repository into a newly created directory')
  .action((source, destination, option) => {
    console.log(source, destination, option.force);
  });
// imooc-test-berners clone https://github.com/tj/commander.js.git 开发脚手架工具 --force


// 注册command命令为子命令，方式2, 注册一个子命令,方便扩展
const service = new Command('service');
service
  .command('start [port]')
  .description('start service at some port')
  .action((port) => {
    console.log(port);
  });
//imooc-test-berners service start 3000
service
  .command('stop')
  .description('stop service')
  .action(() => {
    console.log('stop service');
  });
// imooc-test-berners service stop
// 添加这个子命令
program.addCommand(service);



// 接收任意命令
// program
//     .arguments('<cmd> [options]')
//     .description('test command', {
//         cmd: 'command to run',
//         options: 'options for command',
//     })
//     .action((cmd, env) => {
//         console.log('arguments',cmd, env);
//     });


// 带执行命令
program
  .command('install [name]', 'install package', {
    executableFile: 'berners-cli', // 当执行 imooc-test-berners install 这个命令时，对应执行 berners-cli 命令。很强大
    // isDefault: true, // 在不输入任何命令的适合默认执行的命令
    // hidden: true, // 让这个命令在控制台不显示
  })
  .alias('i'); // 别名


// 高级定制1: 自定义 help 信息
// console.log(program.helpInformation());
// program.helpInformation = () => ''; // 先清空输出
// program.on('--help', () => {
//     console.log('your help information'); // 自定义输出命令
// });


// 高级定制2: 自定义 help 信息, 这个命令早去其他命令执行
program.on('option:debug', () => {
  const options = program.opts();
  if (options.debug) {
    process.env.LOG_LEVEL = 'verbose'; // 修改日志级别
  }
  // console.log('debug', options.debug);
  console.log(process.env.LOG_LEVEL);
});


//  高级定制3: 对位置命令监听
program.on('command:*', (obj) => { // imooc-test-berners aaa
  console.log(obj); // [ 'aaa' ] 不可用用的命令
  console.log( program.commands.map(cmd => cmd.name()) ); // 可用的命令
});


// 这句话要写在结尾， 解析参数
program.parse(process.argv);
