---
创建时间: 2026-01-22T13:11
更新时间: 2026-01-22T14:44
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
@fontSize: 16px;
@bgColor: green;
@textColor: #333;

body {
  padding: 0;
  margin: 0;
}

.block (@fontSize){
  font-size: @fontSize;
  border: 1px solid @textColor;
  border-radius: 4px;
}

.wrapper {
  background: lighten(@bgColor, 40%);

  .nav {
    .block(@fontSize);
  }

  .content {
    .block(@fontSize + 2px);
    &:hover {
      background: @bgColor;
    }
  }
}
```

> [!tip] 使用less的mixin可以实现css复用

### extend
```less

```