---
创建时间: 2026-01-23T12:22
更新时间: 2026-01-23T14:15
tags:
  - JavaScript
---
### JavaScript编写方式
#### 位置一：HTML代码行内（不推荐）
```html
<a href="javascript: alert('百度一下')" onclick="alert('百度一下')">百度一下</a>
```

#### 位置二：script元素内
```html
<a href="#" class="google">Google一下</a>
<script>
	document.querySelector('.google').onclick = function () {
		alert('Google一下');
	}
</script>
```

#### 位置三：外部的script文件
- 需要通过script元素的**src属性**来**引入JavaScript文件**
```html
<script src="01_abc.js"></script>
```

```js
document.querySelector('.bing').onclick = function() {
    alert('Bing一下!');
}
```

### noscript元素的使用
- 如果运行的浏览器不支持JavaScript，那么我们如何给用户更好的提示呢？
	- 针对早期浏览器不支持JavaScript的问题，需要一个页面优雅降级的处理方案；
	- 最终，`<noscript>`元素

### JavaScript注意事项


### JavaScript交互方式


### JavaScript语句和分号


### JavaScript注释方式

