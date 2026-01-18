---
创建时间: 2026-01-18T11:30
更新时间: 2026-01-18T14:05
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

示例代码：

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
            /*margin: 10px;*/  
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
  
<div class="container" style="height: 200px; background: blue; /*overflow: auto*/"></div>  
  
</body>  
</html>
```

> [!tip]- 使用 `overflow: auto;` 可以解决高度塌陷的问题

 #### 解决高度塌陷问题
 
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
            margin: 20px;  
        }  
  
        .p1 {  
            background: green;  
            float: right;  
            width: 200px;  
            height: 50px;  
        }  
  
        .container2::after {  
            content: " ";  
            clear: both;  
            display: block;  
            visibility: hidden;  
            height: 0;  
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
  
<div class="container container2">  
    <span>写几个字</span>  
    <span class="p1">float1</span>  
    <span class="p1">float2</span>  
</div>  
  
<div class="container" style="height: 200px; background: blue; /*overflow: auto;*/">  
    <p>第一行</p>  
    <p>第二行</p>  
    <p>第三行</p>  
</div>  
  
</body>  
</html>
 ```

#### 浮动布局（两栏布局）示例

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
            background: red;  
            margin: 20px;  
        }  
  
        .left {  
            width: 200px;  
            height: 100%;  
            background: green;  
            float: left;  
        }  
  
        .right {  
            margin-left: 200px;  
            height: 100%;  
            background: blue;  
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

演示效果：
![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260118_134710.png)
#### 浮动布局（三栏布局）示例

示例代码一：

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
            margin: 20px;  
            overflow: hidden; /** 清除浮动 **/        }  
  
        .left {  
            width: 200px;  
            height: 100%;  
            background: green;  
            float: left;  
        }  
  
        .right {  
            float: right;  
            width: 200px;  
            height: 100%;  
            background: blue;  
        }  
  
        .middle {  
            margin: 0 200px;  
            height: 100%;  
            background: yellow;  
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
    <div class="middle">  
        中间  
    </div>  
</div>  
</body>  
</html>
```

示例代码二：

```html

```

演示效果：
