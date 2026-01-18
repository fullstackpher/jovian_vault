---
创建时间: 2026-01-18T11:30
更新时间: 2026-01-18T12:26
tags:
  - CSS
---
### 布局示例
示例
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
    <style>  
        .left {  
            background-color: red;  
        }  
  
        .right {  
            background-color: green;  
        }  
  
        table {  
            width: 800px;  
            height: 200px;  
            border-collapse: collapse;  
        }  
  
        .table {  
            margin: 20px;  
            display: table;  
            width: 800px;  
            height: 200px;  
        }  
  
        .table-row {  
            display: table-row;  
        }  
  
        .table-cell {  
            display: table-cell;  
            vertical-align: middle;  
        }  
    </style>  
</head>  
<body>  
<table class="table">  
    <tr>  
        <td class="left">左</td>  
        <td class="right">右</td>  
    </tr>  
</table>  
  
<div class="table">  
    <div class="table-row">  
        <div class="left table-cell">  
            左  
        </div>  
        <div class="right table-cell">  
            右  
        </div>  
    </div>  
</div>  
</body>  
</html>
```

![](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/局部截取_20260118_120955.png)


### 布局属性
> display

- 确定元素的显示类型
	- block/inline/inline-block

示例：
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
  <style>  
  
    .block {  
      height: 200px;  
      background: red;  
    }  
  
    .inline {  
      display: inline;  
      background: green;  
    }  
  
    .inline-block {  
      display: inline-block;  
      background: blue;  
      width: 200px;  
      height: 100px;  
    }  
  </style>  
</head>  
<body>  
<div class="block">  
  block  
</div>  
  
<div class="inline">inline</div>  
<div class="inline">inline</div>  
<div class="inline-block">inline-block</div>  
</body>  
</html>
```

> position

- 确定元素的位置
	- static/relative/absolute/fixed

示例：
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
    <style>  
        .p1 {  
            width: 200px;  
            height: 200px;  
            background-color: red;  
            position: static;  
        }  
  
        .p2 {  
            width: 200px;  
            height: 200px;  
            background-color: green;  
            left: 10px;  
            top: -10px;  
            position: relative;  
        }  
  
        .p3 {  
            width: 200px;  
            height: 200px;  
            background-color: blue;  
            position: absolute;  
            left: 80px;  
            top: 30px;  
        }  
  
        .p4 {  
            width: 200px;  
            height: 200px;  
            background-color: yellow;  
            position: fixed;  
            left: 0;  
            bottom: 10px;  
        }  
  
        .p5 {  
            width: 200px;  
            height: 200px;  
            background-color: orange;  
        }  
    </style>  
</head>  
<body>  
<div class="p1">position: static</div>  
<div class="p2">position: relative</div>  
<div class="p3">position: absolute</div>  
<div class="p4">position: fixed</div>  
<div class="p5">p5</div>  
</body>  
</html>
```