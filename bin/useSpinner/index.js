const {Spinner} = require('cli-spinner');
const dots = require('cli-spinners');


// const s = new Spinner('loading %s');
// s.setSpinnerString('|/-\\');
// s.start();


function spinnerStart(msg) {
  const s = new Spinner('%s '+msg);
  const _dots = Object.keys(dots);
  const r = Math.ceil(Math.random() * _dots.length);
  s.setSpinnerString(dots[_dots[r]].frames.join(''));
  s.start();
  return s
}

async function execute () {
  const spinner = spinnerStart('模板下载中...')
  await new Promise(resolve => setTimeout(resolve,5000))
  spinner.stop(true);
}

execute()
