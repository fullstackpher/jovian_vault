---
tags:
  - "#2026-01-16"
  - "#CSS"
创建时间: 2026-01-16T17:08
更新时间: 2026-01-17T15:57
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

---

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

---

## 属性选择器
[`[attr]`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attr)

表示带有以 _attr_ 命名的属性的元素。

[`[attr=value]`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attrvalue)

表示带有以 _attr_ 命名的属性，且属性值为 _value_ 的元素。

[`[attr~=value]`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attrvalue_2)

表示带有以 _attr_ 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少有一个值为 _value_。

[`[attr|=value]`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attrvalue_3)

表示带有以 _attr_ 命名的属性的元素，属性值为“value”或是以“**value-**”为前缀（**`-` 为连字符**，Unicode 编码为 U+002D）开头。典型的应用场景是用来匹配语言简写代码（如 zh-CN、zh-TW 可以用 zh 作为 value）。

[`[attr^=value]`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attrvalue_4)

表示带有以 _attr_ 命名的属性，且属性值是以 _value_ 开头的元素。

[`[attr$=value]`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attrvalue_5)

表示带有以 _attr_ 命名的属性，且属性值是以 _value_ 结尾的元素。

[`[attr*=value]`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attrvalue_6)

表示带有以 _attr_ 命名的属性，且属性值至少包含一个 _value_ 值的元素。

[`[attr operator value i]`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attr_operator_value_i)

在属性选择器的右方括号前添加一个用空格隔开的字母 `i`（或 `I`），可以在匹配属性值时忽略大小写（支持 ASCII 字符范围之内的字母）。

[`[attr operator value s]` 实验性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors#attr_operator_value_s)

在属性选择器的右方括号前添加一个用空格隔开的字母 `s`（或 `S`），可以在匹配属性值时区分大小写（支持 ASCII 字符范围之内的字母）。

示例：
```css
a {
  color: blue;
}

/* 以 "#" 开头的页面内部链接 */
a[href^="#"] {
  background-color: gold;
}

/* 包含 "example" 的链接 */
a[href*="example"] {
  background-color: silver;
}

/* 包含 "insensitive" 的链接，不区分大小写 */
a[href*="insensitive" i] {
  color: cyan;
}

/* 包含 "cAsE" 的链接，区分大小写 */
a[href*="cAsE" s] {
  color: pink;
}

/* 以 ".org" 结尾的链接 */
a[href$=".org"] {
  color: red;
}

/* 以 "https" 开始，".org" 结尾的链接 */
a[href^="https"][href$=".org"] {
  color: green;
}
```

> 总结
- `[alt]` 有这个属性
- `[alt='北京故宫']` 精确匹配
- `[alt ^= 'abc']` 开头匹配
- `[alt $= 'abc']` 结尾匹配
- `[alt *= 'abc']` 任意位置匹配
- `[alt |= 'abc']` abc-开头
- `[alt ~= 'abc']` abc为空格分开的独立部分

[MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Attribute_selectors)

---

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

---

## 伪类选择器
css伪类是用来添加一些选择器的特殊效果
### 超链接的伪类
```css
a:link {color: #FF0000;} /* 未访问的链接 */
a:visited {color: #00FF00;} /* 已访问的链接 */
a:hover {color: #FF00FF;} /* 鼠标划过链接 */
a:active {color: #0000FF;} /* 已选中的链接 */ 
```

---

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

- [伪类参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Pseudo-classes)
- [伪元素参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Pseudo-elements)

---

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

---

## 盒子模型
### 盒模型基本概念
#### 认识盒模型
- 所有HTML标签都可以看成矩形盒子，由width、height、padding、border构成，称为 “盒模型”
- 盒子的总宽度 = width + 左右padding + 左右border

#### width和height属性详解
> width属性
- width属性表示盒子==内容的宽度==
- ==width属性的单位通常是px==，移动端开发也会设计百分数、rem等单位
- ==当块级元素（div、h系列、li等）没有设置width属性时，它将自动撑满==，但这并不意味着width可以继承

> height属性

- height属性表示盒子==内容的高度==
- ==height属性的单位通常是px==，移动端开发也会涉及百分数，rem等单位
- ==盒子的height属性如果不设置，它将自动被其内容撑开==，如果没有内容，则height默认为0

#### padding属性详解
> padding是盒子的内边距

- padding是盒子的内边距，即盒子边框内壁到内容之间的距离 

##### 1. 基本设置方式
**四个方向分别设置：**
- `padding-top`：上内边距
- `padding-right`：右内边距  
- `padding-bottom`：下内边距
- `padding-left`：左内边距

##### 2. 简写语法（推荐）
**四值写法：** `上 右 下 左`
```css
padding: 10px 20px 30px 40px;
/* 上:10px 右:20px 下:30px 左:40px */
```

**三值写法：** `上 左右 下`
```css
padding: 10px 20px 30px;
/* 上:10px 左右:20px 下:30px */
```

**二值写法：** `上下 左右`
```css
padding: 10px 20px;
/* 上下:10px 左右:20px */
```

**单值写法：** `全部`
```css
padding: 15px;
/* 四个方向都是15px */
```

##### 3. 灵活设置技巧
**对称间距：**
```css
/* 上下30px，左右自动居中/平均分布 */
padding: 30px auto;

/* 上下有间距，左右无间距 */
padding: 20px 0;

/* 左右有间距，上下无间距 */
padding: 0 20px;
```

**部分方向为零：**
```css
/* 上30px，左右10px，下0 */
padding: 30px 10px 0;

/* 上0，左右10px，下20px */
padding: 0 10px 20px;

/* 只有底部有间距 */
padding: 0 0 15px 0;
/* 等价于：padding-bottom: 15px; */
```

##### 4. 实用场景示例
**按钮内边距优化：**
```css
.btn {
  /* 舒适的点击区域，左右间距大于上下 */
  padding: 8px 24px;
  border-radius: 4px;
}

.btn-small {
  /* 小按钮紧凑布局 */
  padding: 4px 12px;
}
```

**卡片内容留白：**
```css
.card {
  /* 内部内容呼吸空间 */
  padding: 20px;
  /* 或不对称留白：上少下多 */
  padding: 15px 20px 25px;
}
```

**列表项分隔：**
```css
.list-item {
  /* 垂直间距，无水平间距 */
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
```

##### 5. 注意事项
1. **百分比值**：padding的百分比是相对于**父元素的宽度**计算的
   ```css
   .box {
     /* 内边距为父元素宽度的10% */
     padding: 10%;
   }
   ```

2. **负值无效**：padding不支持负值（与margin不同）

3. **背景延伸**：元素的背景色/背景图会延伸到padding区域

4. **盒模型影响**：padding会增加元素的实际占用空间，除非使用`box-sizing: border-box`

5. **行内元素**：行内元素的上下padding不会影响行高计算，但左右padding正常生效

##### 6. 与margin的区别
| 特性    | padding | margin    |
| ----- | ------- | --------- |
| 作用位置  | 边框内部    | 边框外部      |
| 背景延伸  | ✅ 会延伸   | ❌ 不会延伸    |
| 折叠现象  | ❌ 不会折叠  | ✅ 垂直方向会折叠 |
| 负值    | ❌ 不支持   | ✅ 支持      |
| 百分比基准 | 父元素宽度   | 父元素宽度     |

这样的优化使笔记更加：
- **结构化**：分模块讲解，逻辑清晰
- **实用化**：增加实际应用场景和示例
- **对比化**：明确padding与margin的区别
- **可操作化**：提供具体的代码示例和技巧

#### margin属性详解
> margin是盒子的外边距

- margin是盒子的外边距，即盒子和其他盒子之间的距离 [^1]
- 与padding不同，margin作用于元素边框的外部，用于控制元素之间的间距

##### 1. 基本设置方式
**四个方向分别设置：**
- `margin-top`：上外边距
- `margin-right`：右外边距  
- `margin-bottom`：下外边距
- `margin-left`：左外边距

##### 2. 简写语法（推荐）
**四值写法：** `上 右 下 左`
```css
margin: 10px 20px 30px 40px;
/* 上:10px 右:20px 下:30px 左:40px */
```

**三值写法：** `上 左右 下`
```css
margin: 10px 20px 30px;
/* 上:10px 左右:20px 下:30px */
```

**二值写法：** `上下 左右`
```css
margin: 10px 20px;
/* 上下:10px 左右:20px */
```

**单值写法：** `全部`
```css
margin: 15px;
/* 四个方向都是15px */
```

##### 3. 特殊值设置
**auto值：水平居中**
```css
.box {
  width: 200px;
  margin: 0 auto; /* 水平居中 */
}
```

**负值：元素重叠**
```css
.box1 {
  margin-right: -20px; /* 与右侧元素重叠 */
}
```

**0值：清除默认间距**
```css
* {
  margin: 0; /* 清除浏览器默认边距 */
  padding: 0;
}
```

##### 4. 实用场景示例
**元素水平居中：**
```css
.container {
  width: 1200px;
  margin: 0 auto; /* 容器居中 */
}

.card {
  width: 300px;
  margin: 20px auto; /* 卡片居中且有上下间距 */
}
```

**列表项间距：**
```css
.list-item {
  margin-bottom: 10px; /* 垂直列表间距 */
  padding: 10px;
  border: 1px solid #ddd;
}

/* 最后一个元素不需要下边距 */
.list-item:last-child {
  margin-bottom: 0;
}
```

**按钮组间距：**
```css
.btn-group .btn {
  margin-right: 10px; /* 按钮间水平间距 */
}

/* 最后一个按钮不需要右边距 */
.btn-group .btn:last-child {
  margin-right: 0;
}
```

**响应式布局间距：**
```css
.grid-item {
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .grid-item {
    margin-bottom: 30px;
  }
}
```

##### 5. 重要特性
**外边距折叠（Margin Collapsing）：**
- 垂直相邻的块级元素外边距会发生折叠
- 折叠后的外边距等于两者中较大的那个
```css
/* 上元素下边距20px，下元素上边距30px */
/* 实际间距为30px（取较大值） */
.box1 { margin-bottom: 20px; }
.box2 { margin-top: 30px; }
```

**不会折叠的情况：**
- 浮动元素
- 绝对定位元素
- 行内块元素
- 清除浮动的元素
- 设置了overflow且值不为visible的元素

##### 6. 注意事项
1. **百分比值**：margin的百分比是相对于**父元素的宽度**计算的 [^2]
   ```css
   .child {
     /* 外边距为父元素宽度的10% */
     margin: 10%;
   }
   ```

2. **负值有效**：margin支持负值，可用于元素重叠或调整位置

3. **背景不延伸**：元素的背景色/背景图不会延伸到margin区域

4. **行内元素**：行内元素的上下margin不会生效，左右margin正常生效

5. **外边距穿透**：子元素的margin-top可能会穿透父元素（可通过父元素设置border、padding或overflow解决）
6. 一些元素（比如body、ul、p等）都有默认的margin，在开始编码时要将它们清除掉

##### 7. 与padding的区别
| 特性 | margin | padding |
|------|--------|---------|
| 作用位置 | 边框外部 | 边框内部 |
| 背景延伸 | ❌ 不会延伸 | ✅ 会延伸 |
| 折叠现象 | ✅ 垂直方向会折叠 | ❌ 不会折叠 |
| 负值 | ✅ 支持 | ❌ 不支持 |
| 百分比基准 | 父元素宽度 | 父元素宽度 |

##### 8. 最佳实践
1. **使用简写语法**提高代码可读性
2. **利用auto值**实现水平居中
3. **注意外边距折叠**避免意外间距
4. **移动端优先**使用相对单位（rem、%）
5. **清除默认边距**确保一致性


#### 盒模型计算
> 理解盒模型的计算方式对于精确控制元素尺寸至关重要

##### 1. 标准盒模型（content-box）
在标准盒模型中，元素的**实际占用空间**由以下公式计算：

**宽度计算：**
```
元素总宽度 = width + 左右padding + 左右border + 左右margin
```

**高度计算：**
```
元素总高度 = height + 上下padding + 上下border + 上下margin
```

**示例：**
```css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```
- **内容区域**：200px × 100px
- **内边距**：每边20px，增加40px宽度和40px高度
- **边框**：每边5px，增加10px宽度和10px高度
- **外边距**：每边10px，增加20px宽度和20px高度
- **总占用空间**：270px × 170px

##### 2. 替代盒模型（border-box）
使用`box-sizing: border-box`时，元素的**width和height属性包含padding和border**：

**宽度计算：**
```
元素总宽度 = width + 左右margin
（其中width已包含左右padding和左右border）
```

**高度计算：**
```
元素总高度 = height + 上下margin
（其中height已包含上下padding和上下border）
```

**示例：**
```css
.box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```
- **width包含**：内容宽度 + 左右padding + 左右border
- **height包含**：内容高度 + 上下padding + 上下border
- **内容区域实际尺寸**：150px × 50px
- **总占用空间**：220px × 120px

##### 3. 计算规则对比
| 特性 | 标准盒模型（content-box） | 替代盒模型（border-box） |
|------|-------------------------|------------------------|
| width/height含义 | 仅内容区域尺寸 | 内容+padding+border总尺寸 |
| 实际内容尺寸 | width/height值 | width/height - padding - border |
| 总元素尺寸 | width/height + padding + border + margin | width/height + margin |
| 常用场景 | 传统布局 | 现代响应式布局 |

##### 4. 实用计算技巧
**百分比计算：**
```css
.parent {
  width: 600px;
}

.child {
  /* 子元素宽度为父元素宽度的50% */
  width: 50%; /* 300px */
  
  /* padding百分比也是相对于父元素宽度 */
  padding: 5%; /* 30px */
  
  /* margin百分比同样相对于父元素宽度 */
  margin: 10%; /* 60px */
}
```

**calc()函数动态计算：**
```css
.box {
  /* 宽度为100%减去40px */
  width: calc(100% - 40px);
  
  /* 高度为视口高度减去头部高度 */
  height: calc(100vh - 80px);
  
  /* 复杂计算 */
  padding: calc(2rem + 10px);
}
```

##### 5. 常见问题与解决方案
**问题1：元素超出容器**
```css
/* 错误：元素可能超出父容器 */
.container {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
}

/* 解决方案：使用border-box */
.container {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
}
```

**问题2：浮动元素宽度计算**
```css
/* 浮动元素宽度计算需考虑margin */
.float-box {
  float: left;
  width: 50%;
  margin-right: 20px;
  /* 实际占用：50% + 20px */
}

/* 解决方案：使用calc() */
.float-box {
  float: left;
  width: calc(50% - 20px);
  margin-right: 20px;
}
```

##### 6. 最佳实践
1. **全局设置border-box** [^1]
   ```css
   * {
     box-sizing: border-box;
   }
   ```

2. **明确计算顺序**
   - 先确定内容尺寸需求
   - 再添加padding和border
   - 最后考虑margin

3. **使用现代布局技术**
   - Flexbox：自动计算子元素尺寸
   - Grid：网格系统简化计算
   - 容器查询：响应式尺寸计算

4. **调试工具利用**
   - 浏览器开发者工具盒模型视图
   - 实时计算值显示
   - 盒模型可视化


#### box-sizing属性
> `box-sizing`属性用于定义元素的盒模型计算方式，控制元素的width和height属性如何计算

##### 1. 属性值详解
**content-box（默认值）**
- 标准盒模型：width和height只包含内容区域
- 元素的padding和border会添加到width/height之外
- 计算公式：元素总宽度 = width + padding + border + margin [^1]

**border-box**
- 替代盒模型：width和height包含内容、padding和border
- 元素的padding和border包含在width/height之内
- 计算公式：元素总宽度 = width + margin [^2]

##### 2. 使用示例
**标准盒模型（content-box）**
```css
.box {
  box-sizing: content-box; /* 默认值，可省略 */
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* 实际宽度：200 + 40 + 10 = 250px */
}
```

**替代盒模型（border-box）**
```css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* 实际内容宽度：200 - 40 - 10 = 150px */
}
```

##### 3. 两种盒模型对比
| 特性 | content-box | border-box |
|------|------------|------------|
| width/height含义 | 仅内容区域尺寸 | 内容+padding+border总尺寸 |
| 实际内容尺寸 | width/height值 | width/height - padding - border |
| 总元素尺寸 | width/height + padding + border + margin | width/height + margin |
| 常用场景 | 传统布局 | 现代响应式布局 [^3] |

##### 4. 实际应用场景
**响应式布局**
```css
* {
  box-sizing: border-box; /* 全局设置，简化计算 */
}

.container {
  width: 100%;
  padding: 20px; /* 不会导致容器溢出 */
}

.grid-item {
  width: 33.33%;
  padding: 15px;
  border: 1px solid #ddd; /* 精确控制网格布局 */
}
```

**表单元素**
```css
input, textarea, select {
  box-sizing: border-box; /* 确保表单元素尺寸一致 */
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
```

##### 5. 常见问题与解决方案
**问题：元素超出父容器**
```css
/* 错误：使用content-box时，padding和border会导致元素溢出 */
.container {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
}

/* 解决方案：使用border-box */
.container {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
}
```

**问题：浮动布局宽度计算**
```css
/* 浮动元素宽度计算需考虑margin */
.float-box {
  float: left;
  width: 50%;
  margin-right: 20px;
  /* 实际占用：50% + 20px，可能导致换行 */
}

/* 解决方案：使用calc()配合border-box */
.float-box {
  box-sizing: border-box;
  float: left;
  width: calc(50% - 20px);
  margin-right: 20px;
}
```

##### 6. 最佳实践
1. **全局设置border-box**
   ```css
   * {
     box-sizing: border-box; /* 现代Web开发标准做法 */
   }
   ```

2. **明确计算顺序**
   - 先确定内容尺寸需求
   - 再添加padding和border
   - 最后考虑margin [^4]

3. **使用现代布局技术**
   - Flexbox：自动计算子元素尺寸
   - Grid：网格系统简化计算
   - 容器查询：响应式尺寸计算 [^4]

4. **调试工具利用**
   - 浏览器开发者工具盒模型视图
   - 实时计算值显示
   - 盒模型可视化 [^4]

##### 7. 注意事项
1. **继承性**：`box-sizing`属性不会被继承，需要为每个元素单独设置
2. **兼容性**：现代浏览器都支持`box-sizing`属性
3. **重置样式**：许多CSS重置框架（如Normalize.css）默认设置`box-sizing: border-box`
4. **与百分比结合**：使用border-box时，百分比宽度计算更加直观



### 行内元素和块级元素

#### display属性


#### 行内元素和块级元素的相互转换


#### 元素的隐藏

