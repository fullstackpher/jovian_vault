---
创建时间: 2026-01-22T13:14
更新时间: 2026-01-22T14:31
tags:
  - CSS
---
### 嵌套
```scss
.wrapper {
  background: white;
  .nav {
    font-size: 16px;
  }
  .content {
    font-size: 18px;
    &:hover {
      background: red;
    }
  }
}
```

### 变量
```scss
$bgColor: #f5f5f5;
$fontSize: 16px;

body {
  padding: 0;
  margin: 0;
}

.wrapper {
  background: adjust-color($bgColor, $lightness: 50%);

  .nav {
    font-size: $fontSize;
  }

  .content {
    font-size: $fontSize + 2px;
    &:hover {
      background: $bgColor;
    }
  }
}
```

> [!tip] sass中使用$变量的方式定义变量
> 		调用时使用$变量的方式

