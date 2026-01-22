---
创建时间: 2026-01-22T13:11
更新时间: 2026-01-22T14:32
tags:
  - CSS
---
### 嵌套
```less
.wrapper {
	background: white;
	.nav {
		font-size: 16px;
		.content {
			font-size: 18px;
			&:hover {
				background: red;
			}
		}
	}
}
```

### 变量
```less
@headingFontSize: 16px;
@contentFontSize: 12px;
@footerFontSize: 9px;
@fontSize: 16px;
@bgColor: green;
@textBgColor: red;
@textColor: #333;
@linkColor: #f60;

body {
  padding: 0;
  margin: 0;
}

.wrapper {
  background: lighten(@bgColor, 40%);
  .nav {
    font-size: @fontSize;
  }
  .content {
    font-size: @fontSize + 2px;
    &:hover {
      background: @bgColor;
    }
  }
}
```

> [!tip] less中使用@变量名的方式定义css变量
> 		 调用时也是使用@变量的方式

### mixin
```less

```


