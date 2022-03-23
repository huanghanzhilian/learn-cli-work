const ejs = require('ejs')
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

//第三种用法
const renderFile = ejs.renderFile(path.resolve(__dirname,'test.html'),data,options)
renderFile.then(file => console.log(file))
