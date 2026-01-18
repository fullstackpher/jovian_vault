---
创建时间: 2026-01-18T11:31
更新时间: 2026-01-18T14:25
tags:
  - CSS
---
### inline-block
- 像文本一样排列block元素
- 没有清除浮动等问题
- **==需要处理间隙==**

#### 案例一：两栏布局

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
- **如何避免**：


#### 💡 解决方案
##### xxx方案
- 
- 