console.log('hello word');
console.log('child process.pid', process.pid);
// 监听主进程发过来的消息
process.on('message', function(msg) {
  console.log(msg);
  // 向主进程发送消息
  process.send('hello main process', () => {
    // process.disconnect();
  });
});
