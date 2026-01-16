---
tags:
  - 2026-01-16
  - "#HTML"
创建时间: 2026-01-16T13:06
更新时间: 2026-01-16T16:58
---
# HTML概念
HTML（HyperTextMarkupLanguage）超文本标记语言，是制作网页的基本语言，直接由浏览器执行

# HTML结构
一个标准的HTML文档结构包含几个关键部分。以下是其基本结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文档标题</title>
</head>
<body>
    <!-- 页面内容在这里 -->
</body>
</html>
```

### 结构解析

1.  **文档类型声明 (`<!DOCTYPE html>`)**
    *   这是HTML5的文档类型声明，告诉浏览器这是一个HTML5文档。

2.  **根元素 (`<html>`)**
    *   整个HTML文档的根元素。`lang`属性用于指定文档的主要语言（例如`zh-CN`表示简体中文）。

3.  **头部 (`<head>`)**
    *   包含文档的元信息（metadata），这些信息不会直接显示在页面上。
    *   **`<meta charset="UTF-8">`**: 定义文档的字符编码为UTF-8，确保中文字符等能正确显示[^1]。
    *   **`<meta name="viewport" ...>`**: 控制视口，对移动端响应式布局至关重要。
    *   **`<title>`**: 定义浏览器标签页上显示的页面标题。

4.  **主体 (`<body>`)**
    *   包含所有在网页上可见的内容，如文本、图片、链接、表格等。



# div标签
> 特点
- 独占一行：`<div>` 是一个块级元素，它自己占一行，它后面的内容也会从新的一行开始
- 默认尺寸：`<div>` 元素默认会占据其父容器的全部可用宽度

> [!tip]- `<div>`是一个通用的块级容器，主要用作于布局和样式分组

# img标签
`<img>` 是用来在网页中显示图片的标签

通常，`<img>` 标签还需要一些关键属性才能正常工作，例如：

- **`src`**：指定图片的路径或URL（相对路径|绝对路径）
- **`alt`**：提供图片的替代文本，用于在图片无法加载时显示，或供屏幕阅读器使用。
- `title`：鼠标移到标签上的提醒文本

`<img>` 标签是**行内元素**（inline element），而不是块级元素。

**与块标签（如 `<div>`）的区别：**

| 特性       | 行内元素（如 `<img>`）             | 块级元素（如 `<div>`）                   |
| :------- | :-------------------------- | :-------------------------------- |
| **布局行为** | 不会独占一行，会与相邻的行内元素或文本在同一行内排列。 | 独占一行，会从新的一行开始，其后的内容也会从新的一行开始[^1]。 |
| **默认尺寸** | 宽度和高度由内容（如图片本身）决定。          | 默认会占据其父容器的全部可用宽度[^1]。             |
| **主要用途** | 用于包裹文本或嵌入内容（如图片、链接）。        | 用作通用的块级容器，主要用于布局和样式分组[^1]。        |

简单来说，块级元素像是一个“盒子”，会占据整个水平空间并强制换行；而行内元素像是一个“词”，会与其他内容在同一行内流动。

# a标签
`<a>` 标签是HTML中用于创建超链接的标签[^1]。

这是一个非常基础的总结。通常，`<a>` 标签还需要一些关键属性才能正常工作，例如：
- **`href`**：指定链接的目标URL。
- **`target`**：指定链接在何处打开（例如 `_blank` 在新窗口打开）。

> [!tip]- `<a>` 标签同样也是行内元素（inline element），不会独占一行



# ol标签
`<ol>` 标签是HTML中用于创建**有序列表**的标签
- **定义**：`<ol>` 代表“Ordered List”（有序列表），用于创建带有数字或字母等顺序标记的列表。
- **用法**：必须与 `<li>` 标签配合使用，每个 `<li>` 代表列表中的一个项目。
- **基本语法**：
  ```html
  <ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
  </ol>
  ```
- **常用属性**：
  - `type`：指定列表标记的类型（如 `1` 表示数字，`A` 表示大写字母，`a` 表示小写字母，`I` 表示大写罗马数字，`i` 表示小写罗马数字）。
  - `start`：指定列表的起始数字。
  - `reversed`：布尔属性，如果设置，列表会倒序显示。

**示例：**
```html
<ol type="A" start="3">
  <li>项目 C</li>
  <li>项目 D</li>
  <li>项目 E</li>
</ol>
```
这个例子会显示一个从字母C开始的大写字母列表。

**与 `<ul>` 的区别**：
- `<ol>`：有序列表，有顺序标记（1, 2, 3 或 A, B, C）。
- `<ul>`：无序列表，通常用圆点、方块等符号标记。

# ul标签
`<ul>` 标签是HTML中用于创建**无序列表**的标签
通常也与`<li>` 标签一块使用

示例：
```html
<ul>
  <li>项目 C</li>
  <li>项目 D</li>
  <li>项目 E</li>
</ul>
```

# dl标签
`<dl>` 标签是HTML中用于创建**定义列表**的标签

通常与 `<dt>`（定义术语）和 `<dd>`（定义描述）标签配合使用

示例：
```html
<dl>
  <dt>Beast of Bodmin</dt>
  <dd>A large feline inhabiting Bodmin Moor.</dd>

  <dt>Morgawr</dt>
  <dd>A sea serpent.</dd>

  <dt>Owlman</dt>
  <dd>A giant owl-like creature.</dd>
</dl>
```

# 注释
HTML中的注释使用 `<!--` 开始，以 `-->` 结束。注释中的内容不会在浏览器中显示，主要用于给开发者添加说明或临时禁用代码[^1]。

**基本语法：**
```html
<!-- 这是一个HTML注释 -->
```

**示例：**
```html
<!DOCTYPE html>
<html>
<head>
    <title>示例页面</title>
</head>
<body>
    <!-- 这是页面的主要内容区域 -->
    <h1>欢迎来到我的网站</h1>
    
    <!-- 
    这是一个多行注释
    可以跨越多行
    用于更详细的说明
    -->
    
    <p>这是一个段落。</p>
    
    <!-- 
    注释也可以用于临时禁用代码：
    <p>这段文字暂时不会显示</p>
    -->
</body>
</html>
```

**主要用途：**
1. **代码说明**：解释代码的功能或目的
2. **临时禁用代码**：调试时暂时隐藏某些HTML元素
3. **标记TODO**：提醒自己或团队成员需要完成的工作
4. **组织代码**：将代码分成逻辑部分

**注意事项：**
- 注释不能嵌套（即不能在注释内再写注释）
- 注释内容不会影响页面的渲染
- 用户可以通过查看网页源代码看到注释内容

# input标签
`<input>` 标签是HTML中用于创建各种表单输入控件的标签，如文本框、复选框、单选按钮等
HTML 中的 `<input>` 标签是表单中最核心的元素，用于创建各种交互控件，使用户能够输入数据。其功能主要通过 `type` 属性来定义。

## 核心属性
### 1. type - 定义输入类型
这是最重要的属性，决定了输入框的行为和外观
#### 基础文本输入
```html
<input type="text">       <!-- 单行文本 -->
<input type="password">   <!-- 密码字段 -->
<input type="email">      <!-- 电子邮件 -->
<input type="tel">        <!-- 电话号码 -->
<input type="url">        <!-- URL地址 -->
<input type="search">     <!-- 搜索框 -->
<input type="number">     <!-- 数字输入 -->
<textarea></textarea>     <!-- 多行文本 -->
```

#### 选择性输入
```html
<input type="checkbox">   <!-- 复选框 -->
<input type="radio">      <!-- 单选框 -->
<select>...</select>      <!-- 下拉列表 -->
```

#### 特殊输入
```html
<input type="file">       <!-- 文件上传 -->
<input type="date">       <!-- 日期选择器 -->
<input type="time">       <!-- 时间选择器 -->
<input type="color">      <!-- 颜色选择器 -->
<input type="range">      <!-- 滑块 -->
```

#### 按钮类型
```html
<input type="submit">     <!-- 提交按钮 -->
<input type="reset">      <!-- 重置按钮 -->
<input type="button">     <!-- 普通按钮 -->
<button></button>         <!-- 按钮标签 -->
```

### 2.常用通用属性
```html
<input
  name="username"         <!-- 字段名称（提交用） -->
  value="默认值"          <!-- 初始值 -->
  placeholder="提示文字"  <!-- 占位符提示 -->
  required                <!-- 必填字段 -->
  disabled                <!-- 禁用状态 -->
  readonly                <!-- 只读 -->
  maxlength="20"          <!-- 最大字符数 -->
  minlength="3"           <!-- 最小字符数 -->
  pattern="[A-Za-z]+"     <!-- 正则验证 -->
  autocomplete="off"      <!-- 关闭自动填充 -->
  autofocus               <!-- 自动聚焦 -->
>
```

### 3.特定类型的专属属性
```html
<!-- 数字输入 -->
<input type="number" min="0" max="100" step="5">

<!-- 范围滑块 -->
<input type="range" min="0" max="100" value="50">

<!-- 日期时间 -->
<input type="date" min="2024-01-01" max="2024-12-31">

<!-- 文件上传 -->
<input type="file" accept=".jpg,.png" multiple>
```

## 重要特性
#### 1.表单关联
```html
<form>
  <label for="username">用户名：</label>
  <input id="username" name="user">
  <!-- label的for与input的id关联 -->
</form>
```

#### 2.数据列表
```html
<input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
</datalist>
```

#### 3.HTML5新增验证
```html
<input type="email" required>      <!-- 必须输入邮箱格式 -->
<input type="url" required>        <!-- 必须输入URL格式 -->
<input type="number" min="1" max="10">
```

## 最佳实践
### 1. 始终使用`<label>`
```html
<!-- 推荐 -->
<label for="email">邮箱：</label>
<input id="email" type="email">

<!-- 或包裹式 -->
<label>
  邮箱：<input type="email">
</label>
```

### 2.合理选择输入类型
- 用`email`类型获得邮箱
- 用`number`类型获得数字
- 用`tel`类型获得电话


> [!tip]- `<input>` 是空元素，没有闭合标签

# p标签


# span标签
