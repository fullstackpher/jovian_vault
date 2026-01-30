---
创建时间: 2026-01-18T11:47
更新时间: 2026-01-18T11:48
tags:
  - CSS
---
## 层叠、继承与值计算

CSS全名叫做 “层叠式样式表”，层叠性是他很重要的性质
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
