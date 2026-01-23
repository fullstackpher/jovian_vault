---
创建时间: 2026-01-23T12:21
更新时间: 2026-01-23T13:48
tags:
  - JavaScript
---
### 认识编程语言

JS是一种编程语言

>[!info] 计算机语言和编程语言的区别

- **计算机语言**：计算机语言是指人与计算机之间**通讯的语言**，是人与计算机之间传递信息的介质，例如HTML是标记语言，也是计算机语言，但并不是编程语言
- **编程语言**：是用来定义计算机程序的**形式语言**。

> [!tip] 编程语言的特点

- 数据和数据结构
- 指令及流程控制
- 引用机制和重用机制
- 设计哲学

### 编程语言发展历史

![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260123_123616.png)
![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260123_123818.png)

#### 阶段一：机器语言
- 计算机的存储单元只有**0和1两种状态**，因此一串代码要让计算机“读懂”，这串代码只能由0和1组成
- 像这种由数字0和1按照一定的规律组成的代码就叫做**机器码**，也叫**二进制码**
- 一定长度的机器码组成了**机器指令，用这些机器指令所编写的程序就称为机器语言**
	![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260123_124132.png)
##### 优点：
- 代码能**被计算机直接识别，不需要经过编译解析**
- 直接对硬件产生作用，**程序的执行效率非常高**

##### 缺点：
- 程序全是些**0和1的指令代码，可读性差，还容易出错**
- **不易编写**（目前没有人这样开发）

#### 阶段二：汇编语言
- 为了解决机器语言的缺陷，**人们发明了另一种语言-汇编语言**
- 这种语言用**符号**来**代替冗长的、难以忘记的0、1代码**（mov/push指令，经过**汇编器**，汇编代码再进一步转成0101）

##### 优点：
- 像机器语言一样，可以**直接访问，控制计算机的各种硬件设备**
- **占用内存少，执行速度快**

##### 缺点：
- 第一，**不同的机器有不同的汇编语法和编译器**，代码缺乏可移植性（换到其他机器就不行了）
- 第二，**符合非常多，难记**（大量的汇编指令，容易产生bug，难调试）

##### 应用场景
- 操作系统内核，驱动程序，单片机程序

#### 阶段三：高级语言
- 最好的编程语言应该是什么？**自然语言**
- 而高级语言，就是接近自然语言，更符合**人类的思维方式**
- 跟和人交流的方式类似，但是大多数编程语言是国外发明的，因为都是接近于**英文的交流方式**

##### 优点：
- **简单，易用，易于理解**，语法和结构类似于普通英文
- **远离对硬件的直接操作**，使得**一般人经过学习之后都可以编程**，而不用熟悉硬件知识；
- 一个程序还可以在不同的机器上运行，具有**可移植性**

##### 缺点：
- 程序**不能直接被计算机识别**，需要经过**编译翻译成二进制指令**后，才能运行到计算机上
- 种类繁多，JavaScript，C语言，C++，C#，Java，Objective-C、Python等

![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260123_130318.png)

### 认识JavaScript

> [!info] 维基百科对JavaScript的定义

- JavaScript（通常缩写为JS）是一种**高级的，解释型**的编程语言
- JavaScript是一门基于**原型，头等函数**的语言，是一门**多范式**的语言，它支持**面向对象设计，指令式编程，以及函数式编程**

> [!tip] 通俗的说法
> 	JavaScript是一门高级编程语言，是前端开发的重要组成部分！

### JavaScript历史
- 1995年Brendan Eich用了10天设计出了JavaScript
	- 最初这门语言是Mocha（摩卡）
	- 在Navigator2.0 beta版本更名为LiveScript
	- 在Navigator2.0 beta 3版本正式更名为JavaScript，（搭上Java的热门）
- 当时门语言更像是一个多语言的大杂烩
	- 借鉴C语言的基本语法
	- 借鉴Java语言的数据类型和内存管理
	- 借鉴Scheme语言，将函数提升为一等公民（first class）的地位
	- 借鉴Self语言，使用基于原型（prototype）的继承机制
- 微软公司于1995年首次推出Internet Explorer，从而引发了于Netscape的浏览器大战
	- 微软对Netscape Navigator解释器进行了逆向工程，创建了JScript，以与市场领导地位的网景产品同台竞争
	- 这个时候对于开发者来说是一场噩耗，因为需要针对不同的浏览器进行不同的适配
- 1996年11月，网景正式向ECMA（欧洲计算机制造商协会）提交语言标准
	- 1997年6月，ECMA以JavaScript语言为基础制定了ECMAScript标准规范ECMA-262
	- ECMA-262是一份标准，定义了ECMAScript
	- JavaScript成为了ECMAScript最著名的实现之一
	- 除此之外，ActionScript和JScript也都是ECMAScript规范的实现语言
- 所以说，ECMAScript是一种规范，而JavaScript是这种规范的一种实现

### JavaScript的组成
- ECMAScript是JavaScript的标准，描述了该语言的语法和基本对象
	- JavaScript是ECMAScript的语言层面的实现
	- 因为除了语言规范之外，**JavaScript还需要对页面和浏览器进行各种操作**；
	- 除了基本实现之外，还包括**DOM和BOM操作**
	![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260123_132954.png)
	![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260123_133125.png)
### JavaScript运行引擎
- 我们经常会说，不同的浏览器有不同的内核组成
	- Gecko：早期被Netscape和Mozilla Firefox浏览器使用
	- Trident：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink
	- Webkit：苹果基于KHTML开发，开源的，用于Safari，Google Chrome之前也在用
	- Blink：是webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等
- 事实上，我们经常说的浏览器内核是指浏览器的排版引擎：
	- 排版引擎（layout engine）也称浏览器引擎（browser engine）、页面渲染引擎（rendering engine）或样板引擎

- 那么JavaScript代码由谁来执行呢？
	- JavaScript引擎

> [!tip] 为什么需要JavaScript引擎呢？

- **高级编程语言**都是需要转成**最终的机器指令来执行**的
- 事实上我们编写的JavaScript无论你交给**浏览器或Node执行**，最后都需要被**CPU执行**的
- 但是CPU只认识自己的指令集，实际上是机器语言，才能被CPU所执行
- 所以我们需要**JavaScript引擎**来帮助我们将**JavaScript代码**翻译成**CPU指令**来执行

> [!tip] 比较常见的JavaScript引擎有哪些呢？

- SpiderMonkey：第一款JavaScript引擎，由Brendan Eich开发（也就是JavaScript作者）
- Chakra：微软开发，用于IT浏览器
- JavaScriptCore：Webkit中的JavaScript引擎，Apple公司开发
- V8：Google开发的强大JavaScript引擎，也帮助Chrome从众多浏览器中脱颖而出
- 等等...

> [!tip] 浏览器内核和JS引擎的关系

- 这里以webkit为例，webkit事实上由两部分组成：
	- WebCore：负责HTML解析，布局，渲染等等相关工作
	- JavaScriptCore：解析，执行JavaScript代码

### JavaScript应用场景

