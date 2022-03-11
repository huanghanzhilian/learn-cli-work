const cp = require('child_process');
const path = require('path');

/**
 * 异步
 * exec 执行 shell 命令
 */
/*
cp.exec('ls -la', function(err, stdout, stderr){
  console.log('err: ', err); // 错误
  console.log('stdout: ', stdout); // 正常运行输出的结果，后面会有个换行
  console.log('stderr: ', stderr); // 异常输出的结果
});
*/

/**
 * 异步
 * execFile 执行 shell 文件
 */
/*
cp.execFile('ls', ['-la'], function(err, stdout, stderr){
  console.log('err: ', err);
  console.log('stdout: ', stdout);
  console.log('stderr: ', stderr);
});
*/

// console.log(path.resolve(__dirname, 'test.shell'))
// console.log(__filename, __dirname)

/*cp.execFile(path.resolve(__dirname, 'test.shell'), ['-al', '-bl'], function(err, stdout, stderr){
  console.log('err: ', err);
  console.log('stdout: ', stdout);
  console.log('stderr: ', stderr);
});*/


/*cp.exec(path.resolve(__dirname, 'test.shell'), {
  cwd: path.resolve('..')
}, function(err, stdout, stderr){
  console.log('err: ', err);
  console.log('stdout: ', stdout);
  console.log('stderr: ', stderr);
});*/

/*const child = cp.spawn(path.resolve(__dirname, 'test.shell'), ['-al', '-bl'], {
  cwd: path.resolve('..')
})

console.log(child.pid, process.pid)
// 监听data
child.stdout.on('data', function(chunk) {
  console.log(chunk.toString());
});
// 监听错误
child.stderr.on('data', function(err) {
  console.log('stderr', err);
});
child.on('error', e => { // 监听错误
  console.log('error')
  process.exit(1);
});
// 监听退出
child.on('exit', function (err) {
  console.log('exit');
});*/
/**
 * 返回值：子进程对象
 * 参数1：执行连续的 shell 脚本
 * 参数2：执行结果 回调
 * child_process.exec(command[, options][, callback])
 */
// cp.exec('npm', {
//     timeout: 10, // 设置超时时间
//     cwd: process.cwd(), // 设置执行路径
// }, function(error, stdout, stderr) {
//     console.log(error); // 出现错误
//     console.log(stdout); // 正常执行输出的结果
//     console.log(stderr); // 异常执行输出的结果
// });




// 要运行的可执行文件的名称或路径
// child_process.execFile(file[, args][, options][, callback])
// cp.execFile('D:/tool/HBuilderX/HBuilderX.exe', [], function(error, stdout, stderr) {
//     console.log(error); // 出现错误
//     console.log(stdout); // 正常执行输出的结果
//     console.log(stderr); // 异常执行输出的结果
// });
// cp.execFile(path.resolve(__dirname, 'test.sh'), ['-al', '-bl'], function (error, stdout, stderr) {
//     console.log(error); // 出现错误
//     console.log(stdout); // 正常执行输出的结果
//     console.log(stderr); // 异常执行输出的结果
// });

// 返回 子进程
// 执行类型 npm -v 命令
// spawn: 使用流的方式执行，适合耗时任务，比如 npm install, 需要不断打印日志
// exec, execFile: 适合比较小的任务
var child = cp.spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], {
    stdio: 'inherit',
    cwd: process.cwd()
});
console.log(child.pid, process.pid);
// 监听data
child.on('data', function(chunk) {
    console.log(chunk.toString());
});
// 监听错误
child.on('error', function(err) {
    console.log(err);
});
// 监听退出
child.on('exit', function (err) {
    console.log('exit');
});



// node(main) -> node(child)
// 底层也是调用 spawn
// 返回一个 child，可以实现主进程和子进程通信
/*

const child = cp.fork( path.resolve(__dirname, 'child.js') ); // 使用多进程执行一段脚本
// 主进程向子进程发送消息
child.send('hello child process', () => { // 发送消息给子进程
    // child.disconnect(); // 断开连接，不然两边处于等待的状态
});
// 监听子进程发送过来的消息
child.on('message', (msg) => {
    console.log(msg);
    child.disconnect(); // 断开连接，不然两边处于等待的状态
});
console.log('main process.pid', process.pid);

*/

// 同步方法
/*
const ret = cp.execSync('npm -v');
console.log(ret.toString());

const ret2 = cp.execFileSync('D:/tool/HBuilderX/HBuilderX.exe');
console.log(ret2.toString());

const ret3 = cp.spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install']);
console.log(ret3);*/
