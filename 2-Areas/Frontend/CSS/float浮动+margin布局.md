---
创建时间: 2026-01-18T11:30
更新时间: 2026-01-18T13:11
tags:
  - CSS
---
### float
- 元素 ”浮动“ 
- 脱离文档流
- 但不脱离文本流

####  对自身元素的影响：
- 形成块（BFC）
- 位置尽量靠上 
- 尽量靠左（右）

示例：
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
  
    <style>  
        .container {  
            width: 400px;  
            background: red;  
            margin: 10px;  
        }  
  
        .p1 {  
            background: green;  
            float: right;  
            width: 200px;  
            height: 50px;  
        }  
    </style>  
</head>  
<body>  
<div class="container">  
  <span class="p1">  
    float  
  </span>  
    <div class="p2">  
        很长的文字很长的文字很长的文字很长的文字很长的文字很长的文字很长的文字很长的文字很长的文字很长的文字很长的文字很长的文字  
    </div>  
</div>  
  
<div class="container">  
    <span>写几个字</span>  
    <span class="p1">float1</span>  
    <span class="p1">float2</span>  
</div>  
  
</body>  
</html>
```

#### 对兄弟元素的影响

- 上面贴着非float的元素（一般情况下）
- 旁边贴float元素

#### 对父级元素的影响

- 从布局上 ”消失“
- 高度塌陷

