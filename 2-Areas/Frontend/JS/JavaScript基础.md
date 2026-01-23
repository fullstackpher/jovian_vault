---
创建时间: 2026-01-23T12:22
更新时间: 2026-01-23T15:19
tags:
  - JavaScript
---
### JavaScript编写方式
#### 位置一：HTML代码行内（不推荐）
```html
<a href="javascript: alert('百度一下')" onclick="alert('百度一下')">百度一下</a>
```

#### 位置二：script元素内
```html
<a href="#" class="google">Google一下</a>
<script>
	document.querySelector('.google').onclick = function () {
		alert('Google一下');
	}
</script>
```

#### 位置三：外部的script文件
- 需要通过script元素的**src属性**来**引入JavaScript文件**
```html
<script src="01_abc.js"></script>
```

```js
document.querySelector('.bing').onclick = function() {
    alert('Bing一下!');
}
```

### noscript元素的使用
- 如果运行的浏览器不支持JavaScript，那么我们如何给用户更好的提示呢？
	- 针对早期浏览器不支持JavaScript的问题，需要一个页面优雅降级的处理方案；
	- 最终，`<noscript>`元素出现，被用于给不支持JavaScript的浏览器提供替代内容
- 下面的情况下，浏览器将显示包含在`<noscript>`中的内容：
	- **浏览器不支持脚本**
	- **浏览器对脚本的支持被关闭**
	- Google浏览器 / 设置 / 隐私与安全 / 网站设置 / JavaScript
### JavaScript注意事项
#### 注意一：script标签**不能写成单标签**
- 在外联式引用JS文件时，script标签中不可以写JavaScript代码，并且script标签不能写成单标签
- 即不能写成`<script src="index.js"/>`

#### 注意二：省略type属性
- 在以前的代码中，`<script>`标签中会使用type="text/javascript";
- 现在可不写这个属性了，因为**JavaScript是现代浏览器及HTML5中的默认脚本语言**；

#### 注意三：加载顺序
- 作为HTML文档内容的一部分，JavaScript遵循**HTML文档的加载顺序**，即**自上而下的加载顺序**
- 推荐将JavaScript代码和编写位置放在**body子元素的最后一行**

#### 注意四：JavaScript代码严格区分大小写
- HTML元素和CSS属性不区分大小写，但是在JavaScript中严格区分大小写

### JavaScript交互方式

| 交互方法           | 方法说明    | 效果查看          |
| -------------- | ------- | ------------- |
| alert          | 接受一个参数  | 弹窗查看          |
| console.log    | 接受多个参数  | 在浏览器控制台查看     |
| document.write | 接受多个字符串 | 在浏览器页面查看      |
| prompt         | 接受一个参数  | 在浏览器接受用户输入    |
| confirm        | 接受一个参数  | 对话框查看，用于确定和取消 |
Chrome可以调试JavaScript，通过控制台可以显示console函数输出的内容
- 如果在代码中**出现了错误**，那么可以在**console中显示错误**
- console中**有个 > 标志，它表示控制台的命令行**
	- 在命令行中可以直接编写JavaScript代码，按下enter会执行代码
	- 如果希望编写多行代码，可以按下shift + enter来进行换行编写
- Chrome支持**debug方式来调试，查看代码的执行流程**

### JavaScript语句和分号
- 语句是向浏览器发出的指令，通常表达为一个操作或行为（Action）
	- 语句英文是**Statement**
	- 比如我们写的每一行代码都是一个语句，用于告知浏览器一条执行的命令
	```js
	alert('hello world');
	alert('hello Codewhy');
	```

- 通常每条语句的后面我们会添加一个分号，表示语句的结束
	- 分号的英文是**semicolon**
	- 当存在换行符（line break）时，在大多数情况下可以**省略分号**；
	- JavaScript将**换行符理解成 “隐式”的分号**
	- 这也被称之为**自动插入分号**（an automatic semicolon）；

### JavaScript注释方式

> [!tip] JavaScript注释主要分为三种

- 单行注释
- 多行注释
- 文档注释（VSCode中需要单独的JS文件中编写才有效）

> [!danger] JavaScript不支持注释的嵌套

