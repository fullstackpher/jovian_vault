---
创建时间: 2026-01-19T19:00
更新时间: 2026-01-20T21:04
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
	1. `animation-name`：指定要绑定到选择器的关键帧的名称。
	2. `animation-duration`：定义动画完成一个周期所需的时间。
	3. `animation-timing-function`：规定动画的速度曲线（如 linear、ease、ease-in、ease-out、ease-in-out、cubic-bezier(n,n,n,n)）。
	4. `animation-delay`：定义动画何时开始（延迟时间）。
	5. `animation-iteration-count`：定义动画应播放的次数（数字或 infinite）。
		1. `infinite`：无限循环
	6. `animation-direction`：定义动画播放方向（normal、reverse、alternate、alternate-reverse）。
		1. normal：默认，正向播放
		2. reverse：反向播放
		3. alternate：奇数次正向，偶数次反向
		4. alternate-reverse：奇数次反向，偶数次正向
	7. `animation-fill-mode`：规定当动画不播放时（完成或延迟），要应用到元素的样式（none、forwards、backwards、both）。
		1. none：默认，动画前后不变
		2. forwards：保持最后一帧
		3. backwards：第一帧
		4. both：第一帧和最后一帧
	8. `animation-play-state`：指定动画是运行还是暂停（running、paused）
		1. running：运行
		2. paused：暂停

### 多关键帧动画
```css
@keyframes changeColor {  
    0% {  
        background-color: red;  
    }  
    20% {  
        background-color: orange;  
    }  
    40% {  
        background-color: yellow;  
    }  
    60% {  
        background-color: green;  
    }  
    80% {  
        background-color: cyan;  
    }  
    100% {  
        background-color: blue;  
    }  
}
```

### 动画实战案例

> [!info] 灯泡闪烁效果

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>动画效果实战</title>  
    <style>  
        * {  
            margin: 0;  
            padding: 0;  
        }  
  
        .bulb {  
            position: absolute;  
            top: 300px;  
            left: 300px;  
        }  
  
        .light {  
            position: absolute;  
            top: 235px;  
            left: 222px;  
            animation: blinking 1s ease 0s infinite alternate;  
        }  
  
        @keyframes blinking {  
            from {  
                opacity: 0;  
            }  
            to {  
                opacity: 1;  
            }  
        }  
    </style>  
</head>  
<body>  
<img class="bulb" src="images/bulb.png" alt="">  
<img class="light" src="images/light.png" alt="">  
</body>  
</html>
```

> [!info] 火箭穿梭效果

```html

```

### 参考资料
- [deepseek](https://chat.deepseek.com/share/dz8ggibhsy2ihgbuvq)