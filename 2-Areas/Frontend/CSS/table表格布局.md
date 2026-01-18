---
创建时间: 2026-01-18T11:30
更新时间: 2026-01-18T12:09
tags:
  - CSS
---
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

