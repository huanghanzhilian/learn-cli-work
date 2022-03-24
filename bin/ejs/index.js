const ejs = require('ejs')
const fs = require('fs');
const path = require('path')
//第一种方法
const html ='<div><%= user.name%></div>'
const options = {}
const data ={
  user:{
    name:'继小鹏'
  }
}

const template = ejs.compile(html,options) //// 返回一个用于解析html中模板的 function

const compileTemplate = template(data)

console.log(compileTemplate)   //<div>liugezhou</div>

//第二种用法
const renderTemplate = ejs.render(html,data,options)
console.log(renderTemplate)

let myFileLoader = function (filePath) {
  return 'myFileLoader: ' + fs.readFileSync(filePath).toString(); // 在所有加载的 ejs 模板前，加上 myFileLoader 字符串
};

ejs.fileLoader = myFileLoader; // 通过 myFileLoader 去加载文件

//第三种用法
const renderFile = ejs.renderFile(path.resolve(__dirname,'test.html'),data,options)
renderFile.then(file => console.log(file))



