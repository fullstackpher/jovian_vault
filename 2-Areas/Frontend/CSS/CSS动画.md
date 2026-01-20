---
创建时间: 2026-01-19T19:00
更新时间: 2026-01-20T20:24
tags:
  - CSS
---
### 动画的定义
- CSS可以使用`@keyframes`来定义动画，`keyframes` 表示**关键帧**
- 在项目上线前，要补上`@-webkit-`这样的私有前缀
- 示例
	```css
	@keyframes r{  
    from{  
        transform: rotate(0);  
    }  
    to{  
        transform: rotate(360deg);  
    }  
}
	```
- `r` ：动画的名字
- `from`：起始状态
- `to`：结束状态
### 动画的调用
- 定义动画之后，就可以使用`animation`属性调用动画
- `animation: r 1s linear 0s;`
