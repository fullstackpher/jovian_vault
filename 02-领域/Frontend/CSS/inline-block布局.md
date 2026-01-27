---
创建时间: 2026-01-18T11:31
更新时间: 2026-01-18T14:34
tags:
  - CSS
---
## inline-block
- 像文本一样排列block元素
- 没有清除浮动等问题
- **==需要处理间隙==**

### 案例一：两栏布局

示例代码：

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
    <style>  
        .container {  
            width: 800px;  
            height: 200px;  
            /*font-size: 0; !* 消除空白间隙 *!*/        }  
  
        /*.left, .right {*/  
        /*    font-size: 16px; !* 恢复文字大小 *!*/        /*}*/        .left {  
            width: 200px;  
            height: 100%;  
            background: green;  
            display: inline-block;  
        }  
        .right {  
            width: 600px;  
            height: 100%;  
            background: deepskyblue;  
            display: inline-block;  
        }  
    </style>  
</head>  
<body>  
<div class="container">  
    <div class="left">  
        左  
    </div>  
    <div class="right">  
        右  
    </div>  
</div>  
</body>  
</html>
```

#### 🔍 问题现象

![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260118_142130.png)

#### ⚠️ 根本原因

- **为什么会出现**：
	- inline-block的空白间隙问题
	- 使用display: inline-block时，HTML元素之间的换行符和空格会被浏览器解析为文本节点，产生大约4px的空白间隙

#### 💡 解决方案
`inline-block` 元素之间的空白间隙是由 HTML 中的换行符和空格被解析为文本节点导致的。以下是几种常见的解决方案：

##### 1. **移除 HTML 中的空白字符**
```html
<!-- 方法1：元素紧贴在一起 -->
<div class="item">1</div><div class="item">2</div><div class="item">3</div>

<!-- 方法2：使用注释连接 -->
<div class="item">1</div><!--
--><div class="item">2</div><!--
--><div class="item">3</div>
```

##### 2. **使用负边距 (Negative Margin)**
```css
.item {
  display: inline-block;
  width: 100px;
  margin-right: -4px; /* 消除间隙，值可能因字体大小而异 */
}
```

##### 3. **父元素设置 font-size: 0**
```css
.parent {
  font-size: 0; /* 消除空白节点 */
}
.item {
  display: inline-block;
  font-size: 16px; /* 重置字体大小 */
}
```

##### 4. **使用 Flex 布局 (推荐)**
```css
.parent {
  display: flex; /* 替代 inline-block */
}
```

##### 5. **使用 Grid 布局**
```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 根据需求调整 */
}
```

##### 6. **浮动替代方案**
```css
.item {
  float: left; /* 注意清除浮动 */
}
.parent::after {
  content: '';
  display: table;
  clear: both;
}
```

##### 7. **设置 word-spacing 或 letter-spacing**
```css
.parent {
  word-spacing: -4px; /* 或 letter-spacing: -4px */
}
.item {
  display: inline-block;
  word-spacing: normal; /* 重置内部 */
}
```

#### 完整示例
```html
<style>
  /* 方案A: flex布局 */
  .flex-parent {
    display: flex;
  }
  
  /* 方案B: 父元素font-size:0 */
  .fontzero-parent {
    font-size: 0;
  }
  .fontzero-parent .item {
    font-size: 16px;
  }
  
  /* 通用样式 */
  .item {
    width: 100px;
    height: 100px;
    background: #3498db;
    color: white;
    text-align: center;
    line-height: 100px;
  }
</style>

<!-- 使用flex -->
<div class="flex-parent">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>

<!-- 使用font-size:0 -->
<div class="fontzero-parent">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

#### **推荐方案**
1. **现代方案**：使用 Flex 或 Grid 布局
2. **兼容方案**：父元素设置 `font-size: 0`
3. **传统方案**：负边距或移除 HTML 空白

#### 注意事项
- 负边距的值需要根据实际字体大小调整（通常是 4px）
- `font-size: 0` 会影响内部的文本，需要重新设置字体
- Flex/Grid 布局需要考虑浏览器兼容性（现代浏览器都支持）

选择哪种方案取决于项目需求和兼容性要求。在大多数现代项目中，使用 Flex 布局是最佳选择。