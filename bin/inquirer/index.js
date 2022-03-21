#!/usr/bin/env node

const inquirer = require('inquirer');
/*
inquirer
    .prompt([
        {
            type: 'input',// 输入类型
            name: 'name',// 字段名称
            message: 'your name',// 提示文字
            // default: 'zhangshan',// 默认值
            // validate: function(value) { // 校验
            //     return value;
            // },
            // transformer: function (value) {
            //     return `name[${value}]`; // 输入的值在被包裹中，做提醒用，不会影响最终结果
            // },
            // filter: function (value) {
            //     return `name[${value}]`; // 会影响最终结果
            // }
        },
        {
            type: 'number',// 输入类型
            name: 'age',// 字段名称
            message: 'your age',// 提示文版
            // default: 18,// 默认值
        }
    ])
    .then(answers => {
        // Use user feedback for... whatever!!
        console.log(answers);// 结果
    })
    .catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    });
*/


inquirer
  .prompt([
    {
      type: 'confirm',// 二选一的类型
      name: 'choice',// 字段名称
      message: 'your choice',// 提示文字
    },
    {
      type: 'list',// 下拉列表
      name: 'live',
      message: 'your live',
      default: 0, // 默认选中
      choices: [
        {
          value: 1,
          name: '苹果',
        },
        {
          value: 2,
          name: '橘子',
        }
      ]
    },
    {
      type: 'rawlist', // 带序号的列表
      name: 'live2',
      message: 'your live',
      default: 0, // 默认选中
      choices: [
        {
          value: 1,
          name: '苹果',
        },
        {
          value: 2,
          name: '橘子',
        }
      ]
    },
    {
      type: 'password',
      name: 'password',
      message: 'your password',
      default: '',
    },
    {
      type: 'editor',
      name: 'editor',
      message: 'your editor',
      default: '',
    },
    {
      type: 'expand',
      name: 'color',
      message: 'your color',
      default: 'red', // 默认选中
      choices: [
        {
          key: 'R',
          value: 'red',
        },
        {
          key: 'G',
          value: 'green',
        },
        {
          key: 'B',
          value: 'blue',
        }
      ]
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);// 结果
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
