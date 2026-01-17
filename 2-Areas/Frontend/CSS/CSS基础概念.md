---
tags:
  - "#2026-01-16"
  - "#CSS"
创建时间: 2026-01-16T17:08
更新时间: 2026-01-17T13:59
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

## 伪元素
伪元素是css的一种特殊选择器，用于选择元素的特定部分而不是整个元素。
它们允许你为元素的特点部分添加样式，而无需修改HTML

> [!tip]- CSS3 规范使用双冒号 `::`（推荐），但单冒号 `:` 也被支持以保持向后兼容。

### ::before
作用：在元素内容之前插入生成的内容
```css
.element::before {
    content: "前缀：";
    color: red;
}
```

### ::after
作用：在元素内容之后插入生成的内容
```css
.element::after {
    content: "（后缀）";
    font-style: italic;
}
```

### ::first-letter
作用：选择元素的第一个字母
```css
p::first-letter {
    font-size: 200%;
    color: blue;
    float: left;
    margin-right: 5px;
}
```

### ::first-line
作用：选择元素的第一行
```css
p::first-line {
    font-weight: bold;
    color: darkblue;
}
```

### ::selection
作用：选择用户选中的文本部分（鼠标圈选的部分）
```css
::selection {
    background-color: yellow;
    color: black;
}
```

### ::placeholder
作用：选择表单元素的占位文本
```css
input::placeholder {
    color: #999;
    font-style: italic;
}
```

### ::marker
作用：选择列表项的标记（项目符合或数字）
```css
li::marker {
    color: red;
    font-size: 1.2em;
}
```

### 重要特点和用法

#### 1. **content 属性**（用于 ::before 和 ::after）
```css
/* 插入文本 */
.element::before {
    content: "提示：";
}

/* 插入图标（使用 Unicode） */
.element::after {
    content: "❯";
}

/* 插入属性值 */
a::after {
    content: " (" attr(href) ")";
}

/* 空内容（用于装饰性元素） */
.element::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background: red;
}
```


#### 2. **与伪类的组合使用**
```css
/* 鼠标悬停时显示 */
button:hover::after {
    content: "点击我！";
    color: white;
}

/* 第一个段落的第一个字母 */
p:first-child::first-letter {
    font-size: 300%;
}
```

---

### 实际应用示例

#### 示例 1：装饰性引号
```css
blockquote::before {
    content: "“";
    font-size: 3em;
    color: gray;
    vertical-align: -0.4em;
}
blockquote::after {
    content: "”";
    font-size: 3em;
    color: gray;
    vertical-align: -0.4em;
}
```

#### 示例 2：自定义列表样式
```css
ul.custom-list li::before {
    content: "✓";
    color: green;
    margin-right: 10px;
    font-weight: bold;
}
```

#### 示例 3：清除浮动
```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

#### 示例 4：Tooltip 提示
```css
.tooltip {
    position: relative;
}
.tooltip:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    background: black;
    color: white;
    padding: 5px;
    border-radius: 3px;
    top: 100%;
    left: 0;
    white-space: nowrap;
}
```

### 注意事项
1. **不是真正的 DOM 元素**：
    
    - 伪元素不会出现在 HTML 中
        
    - 不能通过 JavaScript 直接操作
        
    - 可以通过 `window.getComputedStyle()` 读取样式
        
2. **content 属性必需**：
    
    - `::before` 和 `::after` 必须设置 `content` 属性，即使为空字符串
        
3. **某些元素不支持**：
    
    - `<img>`、`<input>`、`<br>` 等替换元素和空元素通常不支持 `::before` 和 `::after`
        
4. **优先级**：
    
    - 伪元素与普通元素具有相同的优先级权重

- [官方资料](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements)

## 层叠、继承与值计算
css全名叫做 “层叠式样式表”，层叠性是他很重要的性质
层叠性：多个选择器可以同时作用于同一个标签，效果叠加

### 层叠性的冲突处理
> 如果多个选择器定义的属性有冲突呢？

- **CSS有严密的处理冲突的规则**
```css
p {
    color: red;
}
#para {
    text-decoration: underline;
}
.spec {
    font-style: italic;
    font-size: 28px;
}
```

> [!tip]- id权重 > class权重 > 标签权重

### 复杂选择器权重计算

- 复杂选择器可以通过（id的个数，class的个数，标签的个数）的形式，计算权重

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #box #box2 p {
            color: red; /* 2 0 1 */
        }


        #box1 div.box2 #box3 p {
            color: green; /* 2 1 2 */
        }


        .box1 .box2 .box3 p {
            color: blue; /* 0 3 1 */
        }
    </style>
</head>
<body>
    <div id="box1" class="box1">
        <div id="box2" class="box2">
            <div id="box3" class="box3">
                <p>我是段落</p>
            </div>
        </div>
    </div>
</body>
</html> 
```

### !important提升权重
- 如果我们需要将某个选择器的某条属性提升权重，可以在属性后面写`!important`
```css
.spec { color: blue !important;}
```

> [!danger]- 很多公司不允许使用!important，因为会带来不经意的样式冲突

## 盒子模型