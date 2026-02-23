---
创建时间: 2026-02-23T19:00
更新时间: 2026-02-23T19:33
tags:
  - 领域/前端
  - JavaScript
---
## BOM

> [!note]+ BOM：浏览器对象模型（Browser Object Model）

- 由浏览器用于处理文档（document）之外的所有内容的其他对象
- 比如：navigator，location，history等对象

> [!success]+ JavaScript有一个非常重要的运行环境就是浏览器
- 浏览器本身作为一个应用程序需要对其本身进行操作
- 所以通常浏览器会有对应的模型（BOM，Browser Object Model）
- 我们可以将BOM看成是连接JavaScript脚本与浏览器窗口的桥梁

> [!tip]+ BOM主要包括的对象模型：

- [[Window对象]]：包括全局属性，方法，控制浏览器窗口相关的属性、方法
- location：浏览器连接的对象的位置（URL）
- history：操作浏览器的历史
- navigator：用户代理（浏览器）的状态和标识（很少用到）
- screen：屏幕窗口信息（很少用到）

### window
> [!success]+ window对象在浏览器中可以从两个视角来看待

- 视角一：全局对象
	- ECMAscript其实是有一个全局对象的，这个全局对象在Node中是global
	- 在浏览器中就是window对象
- 视角二：浏览器窗口对象
	- 作为浏览器窗口时，提供了对浏览器操作的相关API

> [!tip]+ 区别

- 事实上对于浏览器和Node中全局对象名称不一样的情况，目前已经 指定了对应的标准，称之为globalThis，并且现代浏览器都支持它
- 放在window对象上的所有属性都可以被访问
- 使用var定义的变量会被添加到window对象中
- window默认给我们提供了全局的函数和类：setTimeout、Math、Date、Object等

### event


### location


### history


### navigator


### screen


