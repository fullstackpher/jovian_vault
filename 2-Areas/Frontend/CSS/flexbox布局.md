---
创建时间: 2026-01-18T11:32
更新时间: 2026-01-18T14:40
tags:
  - CSS
---
### flexbox
- 弹性盒子
- 盒子本身就是并列的
- 指定宽度即可

#### 示例一
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>html</title>  
    <style>  
        .container {  
            width: 800px;  
            height: 200px;  
            display: flex;  
            border: 1px solid black;  
        }  
  
        .flex {  
            flex: 1;  
            background-color: red;  
            margin: 5px;  
        }  
    </style>  
</head>  
<body>  
<div class="container">  
    <div class="flex">  
        flex  
    </div>  
    <div class="flex">  
        flex  
    </div>  
    <div class="flex">  
        flex  
    </div>  
    <div class="flex">  
        flex  
    </div>  
    <div class="flex">  
        flex  
    </div>  
  
</div>  
</body>  
</html>
```

> [!tip]- display: flex; 表示启用flexbox布局，使其子元素成为弹性项目；
> 	flex: 1; 表示弹性伸缩系数为1，所有子元素平分容器宽度

#### 示例二
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
      display: flex;  
    }  
  
    .left {  
      width: 200px;  
      display: flex;  
      background-color: red;  
    }  
  
    .right {  
      display: flex;  
      flex: 1;  /* 弹性伸缩系数为1，自动占据剩余空间 */
      background-color: blue;  
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