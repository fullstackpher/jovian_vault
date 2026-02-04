---
创建时间: 2026-01-18T11:45
更新时间: 2026-01-18T11:46
tags:
  - CSS
---
## CSS的引入方式
### 行内式：
```html
<div style="width: 100px;"></div>
```

> [!tip]- 最大的特点就是写在标签上，级别最高，缺点是容易影响阅读，修改比较麻烦

### 内嵌式
```html
<style type="text/css">
	div {
		width: 114px;
		height: 114px;
		background: black;
	}
</style>
```

> [!tip]- 最大的特点是嵌入在html文件里，级别中等，缺点是影响html文件大小

### 外链式
```html
<link rel="stylesheet" type="text/css" href="./1.css">
```

> [!tip]-  最大的特点就是引入外面的css文件，级别最低
