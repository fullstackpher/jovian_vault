---
创建时间: 2026-02-23T19:00
更新时间: 2026-02-23T20:25
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
- `location`：浏览器连接的对象的位置（URL）
- `history`：操作浏览器的历史
- `navigator`：用户代理（浏览器）的状态和标识（很少用到）
- `screen`：屏幕窗口信息（很少用到）

### window
> [!success]+ window对象在浏览器中可以从两个视角来看待

- 视角一：全局对象
	- ECMAscript其实是有一个全局对象的，**这个全局对象在Node中是global**
	- 在浏览器中就是window对象
- 视角二：浏览器窗口对象
	- 作为**浏览器窗口**时，提供了对浏览器操作的相关API

> [!tip]+ 区别

- 事实上对于浏览器和`Node`中全局对象名称不一样的情况，目前已经 指定了对应的标准，称之为`globalThis`，并且现代浏览器都支持它
- 放在`window`对象上的所有属性都可以被访问
- 使用`var`定义的变量会被添加到window对象中
- window默认给我们提供了全局的函数和类：`setTimeout`、`Math`、`Date`、`Object` 等

> [!danger]+ window对象很重：

- 包含大量的属性：`localstorage`，`console`，`location`，`history`，`screenX`，`scrollX` 等等
- 包含大量的方法：`alert`，`close`，`scrollTo`，`open` 等等
- 包含大量的事件：`focus`，`blur`，`load`，`hashchange` 等等
- 包含从EventTarget继承过来的方法，`addEventListener`，`removeEventListener`，`dispatchEvent`方法

### location
> [!note]+ location常用属性

- location对象常用于表示window上当前链接到的URL信息
- `href`：当前window对应的超链接URL，整个URL
- `protocol`：当前的协议
- `host`：主机地址
- `hostname`：主机地址（不带端口）
- `port`：端口
- `pathname`：路径
- `search`：查询字符串
- `hash`：哈希值
- username：URL中的username（很多浏览器已禁用）
- password：URL中的password（很多浏览器已禁用）

> [!tip]+ location常用方法

- assign：赋值一个新的URL，并且跳转到该URL中
- replace：打开一个新的URL，并且跳转到该URL中（不同的是不会在浏览记录中留下之前的记录）
- reload：重新加载页面，可以传入一个Boolean类型

> [!example]+ URLSearchParams常用方法如下：

- get：获取搜索参数的值
- set：设置一个搜索参数和值
- append：追加一个搜索参数和值
- has：判断是否有某个搜索参数

```ad-tip 
title: 中文会使用encodeURIComponent和decodeURIComponent进行编码和解码
```

### history
> [!note]+ history对象允许我们访问浏览器曾经的会话历史记录

- 两个属性：
	- `length`：会话中的记录条数
	- `state`：当前保留的状态值
- 五个方法：
	- `back()`：返回上一页，等价于history.go(-1)
	- `forward()`：前进下一页，等价于history.go(1)
	- `go()`：加载历史的某一页
	- `pushState()`：打开一个指定的地址
	- `replaceState()`：打开一个新的的地址，并使用replace
> [!tip]+ history和hash目前是Vue，react等框架实现路由的底层原理
### navigator


### screen


### event


### 参考资料

- [Window - Web API \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)
- [URLSearchParams - Web API \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)