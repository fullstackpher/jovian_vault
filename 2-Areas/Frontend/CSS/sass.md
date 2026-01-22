---
创建时间: 2026-01-22T13:14
更新时间: 2026-01-22T15:07
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

### mixin
```scss
$bgColor: #f5f5f5;
$fontSize: 16px;

body {
  padding: 0;
  margin: 0;
}

@mixin block($fontSize) {
  font-size: $fontSize;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.wrapper {
  background: adjust-color($bgColor, $lightness: 50%);

  .nav {
    @include block($fontSize);
  }

  .content {
    @include block($fontSize + 2px);
    &:hover {
      background: $bgColor;
    }
  }
}
```

> [!tip] 使用sass的mixin可以实现css复用
> 	定义复用的部分使用@mixin xxx
> 	调用的部分使用@include xxx

### extend
```scss
$bgColor: #f5f5f5;  
$fontSize: 16px;  
  
body {  
  padding: 0;  
  margin: 0;  
}  
  
.block {  
  font-size: $fontSize;  
  border: 1px solid #ccc;  
  border-radius: 4px;  
}  
  
.wrapper {  
  background: adjust-color($bgColor, $lightness: 50%);  
  
  .nav {  
    @extend .block;  
    color: #333;  
  }  
  
  .content {  
    @extend .block;  
    &:hover {  
      background: $bgColor;  
    }  
  }  
}
```

> [!tip] 使用@extend + 选中继承样式的选择器

### loop
```scss
@mixin gen-col($n) {  
  @if $n > 0 {  
    @include gen-col($n - 1);  
    .col-#{$n} {  
      width: 1000px /12 * $n;  
    }  
  }  
}  
  
@include gen-col(12);
```

简写版本：
```scss
@for $i from 1 through 12 {  
  .col-#{$i} {  
    width: 1000px / 12*$i;  
  }  
}
```

### import

