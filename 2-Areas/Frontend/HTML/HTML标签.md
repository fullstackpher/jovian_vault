---
tags:
  - 2026-01-16
  - "#HTML"
创建时间: 2026-01-16T13:06
更新时间: 2026-01-16T15:05
---
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

