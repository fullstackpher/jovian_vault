---
tags:
  - "#2026-01-16"
  - "#CSS"
创建时间: 2026-01-16T17:08
更新时间: 2026-01-17T13:15
---
# 1、CSS基础与核心概念
## CSS的引入方式
### 行内式：
```html
<div style="width: 100px;"></div>
```

> [!tip]- 最大的特点就是写在标签上，级别最高，缺点是容易影响阅读，修改比较麻烦

### 内嵌式
```html
<style type="text/css">
	div {
		width: 114px;
		height: 114px;
		background: black;
	}
</style>
```

> [!tip]- 最大的特点是嵌入在html文件里，级别中等，缺点是影响html文件大小

### 外链式
```html
<link rel="stylesheet" type="text/css" href="./1.css">
```

> [!tip]-  最大的特点就是引入外面的css文件，级别最低

## 基本选择器
### 全选符 *
```css
*{
    width: 200px;
    height: 200px;
    background: black;
}
```


> [!tip]-  选择html文件内的所有元素，权重最低

### 标签选择器
```css
div{width: 200px; height: 200px; backgroud: black;}
span{backgroud: red;}
```

> [!tip]- 通过标签的分类来选择html元素，权重比全选符高

### 类（class）选择器
```css
.abc{width: 200px; height: 200px; backgroud: black;}
<div class="abc"></div>
```

> [!tip]- 我们可以定义分类，然后通过我们定义分类的去给予样式，权重比标签选择器高

### id选择器
```css
#abc{width: 200px; height: 200px; backgroud: black;}
<div id="abc"></div>
```

> [!tip]- 权重最高的选择器，我们可以给元素设定一个唯一的Id值，就像身份证一样

### 总结：
> [!tip]- id选择器 > 类选择器 > 标签选择器 > 全选符


## 关系选择器
### 后代选择器（以空格分隔）
```css
div p {backgroud: yellow;}
```

> [!tip]- 后代选择器用于选取某元素的后代元素。

### 子元素选择器（以>分隔）
```css
div>p{backgroud: yellow;}
```

> [!tip]- 子元素选择器（Child selectors）只能选择作为某元素直接/一级子元素的元素

### 相邻元素选择器（以+分隔）
```css
div+p{backgroud: yellow;}
```

> [!tip]- 可选择紧接在另一元素后的元素，且二者有相同父元素

### 后续兄弟选择器（以~分隔）
```css
div~p{backgroud: yellow;}
```

> [!tip]- 后续兄弟选择器选取所有指定元素之后的相邻兄弟元素。

### 交集选择器（li.spec）
选择既是li标签，也属于spec类的标签
```css
li.spec {color: red;}
```

### 并集选择器（ul, ol）
选择所有ul和ol标签
```css
ul, ol {color: blue;}
```

## 伪类选择器
css伪类是用来添加一些选择器的特殊效果
### 超链接的伪类
```css
a:link {color: #FF0000;} /* 未访问的链接 */
a:visited {color: #00FF00;} /* 已访问的链接 */
a:hover {color: #FF00FF;} /* 鼠标划过链接 */
a:active {color: #0000FF;} /* 已选中的链接 */ 
```

- [官方资料](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements)

## 盒子模型



## 层叠、继承与值计算
css全名叫做 “层叠式样式表”，层叠性是他很重要的性质
层叠性：多个选择器可以同时作用于同一个标签，效果叠加