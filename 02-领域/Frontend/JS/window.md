---
创建时间: 2026-01-27T16:53
更新时间: 2026-01-29T13:54
tags:
  - JavaScript
---
### window 介绍

1. window 表示浏览器窗口，运行在浏览器的JS，全局对象就是window
2. 在打开浏览器的时候，window对象就被创建了
3. 所有的全局变量，都是window的属性，使用window的属性可以省略window

### window的作用

1. 查找变量时，最终会找到window上
2. 将一些浏览器全局提供给我们的变量、函数、对象，放在window对象上
3. 全局作用域下使用var定义的变量会被默认添加到window上