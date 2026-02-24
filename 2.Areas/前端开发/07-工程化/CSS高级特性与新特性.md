---
concept: CSS高级特性
importance: high
category: 前端
tags:
  - "#CSS"
  - "#领域/前端"
创建时间: 2026-01-16T17:36
更新时间: 2026-02-24T19:56
---

## 📚 定义

### 1. CSS 自定义属性（CSS 变量）

**核心概念**：使用 `--variable-name` 定义变量，通过 `var()` 函数使用，支持作用域和继承。

**基本语法**：
```css
/* 定义变量 */
:root {
  --primary-color: #3b82f6;
  --font-size-base: 16px;
  --spacing-unit: 8px;
}

/* 使用变量 */
.button {
  background: var(--primary-color);
  font-size: var(--font-size-base);
  padding: calc(var(--spacing-unit) * 2);
}

/* 组件级别覆盖变量 */
.button.secondary {
  --primary-color: #10b981;
}

/* 提供回退值 */
.element {
  color: var(--custom-color, #333);
}
```

**作用域规则**：
- 在 `:root` 中定义的变量是全局变量
- 在特定选择器中定义的变量只在作用域内有效
- 变量支持继承，子元素可以访问父元素的变量

---

### 2. CSS 数学函数

**calc()**：执行数学计算
```css
.container {
  width: calc(100% - 20px);
  height: calc(50vh + 100px);
  margin: calc(var(--spacing-unit) * 2);
}
```

**min()**：取最小值
```css
.responsive-image {
  width: min(100%, 400px); /* 最大不超过400px */
}
```

**max()**：取最大值
```css
.button {
  padding: max(8px, 5%); /* 最小8px */
}
```

**clamp()**：限制范围（最小值，首选值，最大值）
```css
.responsive-text {
  font-size: clamp(1rem, 2.5vw, 2rem); /* 最小1rem，最大2rem，中间使用2.5vw */
}
```

---

### 3. CSS 颜色函数

**现代颜色语法**（CSS Color Module Level 4）：
```css
/* 空间分隔法 */
.button {
  background: rgb(255 0 0);
  color: rgba(255 0 0 / 0.5);
}

/* HSL 支持透明度 */
.card {
  background: hsl(210 100% 50% / 0.1);
  border-color: hsl(210 100% 50%);
}

/* 相对颜色调整 */
.button:hover {
  background: hsl(from var(--primary-color) h s calc(l - 10%));
}

/* color-mix() 混合颜色 */
.badge {
  background: color-mix(in srgb, var(--primary-color), white 90%);
}
```

---

### 4. 混合模式与滤镜

**混合模式**：
```css
/* 元素混合模式 */
.image-overlay {
  mix-blend-mode: multiply;
}

/* 背景混合模式 */
.gradient-overlay {
  background:
    linear-gradient(to right, rgba(0,0,0,0.8), transparent),
    url(image.jpg);
  background-blend-mode: overlay;
}
```

**滤镜**：
```css
.image-effect {
  filter: blur(5px);
  filter: grayscale(100%);
  filter: contrast(150%);
  filter: brightness(1.2);
  filter: sepia(50%);
  filter: saturate(200%);
  filter: hue-rotate(90deg);
}

/* 组合滤镜 */
.complex-filter {
  filter: contrast(1.2) brightness(1.1) saturate(1.1);
}
```

---

### 5. 剪切与遮罩

**clip-path**：创建复杂形状
```css
/* 基本形状 */
.circle {
  clip-path: circle(50% at 50% 50%);
}

.polygon {
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}

/* 使用函数动态计算 */
.dynamic-clip {
  clip-path: polygon(
    calc(50% - 20px) 0%,
    calc(50% + 20px) 0%,
    100% 100%,
    0% 100%
  );
}

/* 动画过渡 */
.animated-clip {
  transition: clip-path 0.3s ease;
}
.animated-clip:hover {
  clip-path: circle(75% at 50% 50%);
}
```

**mask-image**：图像遮罩
```css
/* 使用图片作为遮罩 */
.masked-image {
  mask-image: url(mask.png);
  mask-size: cover;
  mask-position: center;
  mask-repeat: no-repeat;
}

/* 使用渐变作为遮罩 */
.fade-out {
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

/* 组合遮罩 */
.complex-mask {
  mask-image:
    radial-gradient(circle at 30% 30%, black 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, black 0%, transparent 50%);
}
```

---

## 💡 核心理解

### CSS 原生特性 vs CSS 预处理器

| 特性 | CSS 原生 | CSS 预处理器 |
|-----|---------|------------|
| **变量** | ✅ CSS 变量支持动态更新、继承、运行时修改 | ⚠️ 编译时静态，运行时不可变 |
| **计算** | ✅ calc(), min(), max(), clamp() | ✅ 类似计算功能 |
| **嵌套** | ✅ CSS 原生嵌套（部分浏览器支持） | ✅ 完整的嵌套支持 |
| **Mixin** | ✅ @property, 容器查询等替代方案 | ✅ 专门的 mixin 功能 |
| **循环** | ❌ 不支持 | ✅ 强大的循环功能 |
| **模块化** | ⚠️ @import (性能问题), ES模块 | ✅ 完善的模块系统 |

**选择建议**：
- **现代项目**：优先使用 CSS 原生特性 + 预处理器（如果需要复杂逻辑）
- **简单项目**：CSS 原生特性 + 原生嵌套（浏览器支持足够）
- **大型团队**：预处理器 + CSS 原生特性（结合优势）

### CSS 原生特性的优势

1. **运行时动态**：CSS 变量可以通过 JavaScript 动态修改
2. **浏览器原生**：无需编译，减少构建复杂度
3. **可访问性**：浏览器原生支持，对屏幕阅读器友好
4. **性能优化**：减少不必要的样式重新计算

> 📌 **相关知识**：
> - [[2.Areas/前端开发/CSS工程化]] - CSS 工程化整体方案
> - [[2.Areas/前端开发/现代 CSS 新特性]] - 现代 CSS 新功能（容器查询、层叠层等）
> - [[2.Areas/前端开发/Less预处理器]] - Less 预处理器
> - [[2.Areas/前端开发/Sass预处理器]] - Sass 预处理器

---

## 🎯 应用场景

### 1. 主题切换系统

```css
:root {
  /* 浅色主题 */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --primary-color: #3b82f6;
}

[data-theme="dark"] {
  /* 深色主题 */
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --primary-color: #60a5fa;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
}
```

```javascript
// JavaScript 切换主题
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
}
```

---

### 2. 响应式字体大小

```css
/* 使用 clamp() 实现流畅缩放 */
.responsive-typography {
  /* 标题：1.5rem ~ 3rem */
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);

  /* 正文：1rem ~ 1.25rem */
  font-size: clamp(1rem, 2vw + 0.5rem, 1.25rem);

  /* 行距与字号成比例 */
  line-height: calc(1.5 * var(--font-size));
}
```

---

### 3. 按钮状态系统

```css
.button {
  --base-color: #3b82f6;
  --hover-brightness: 1.2;
  --active-scale: 0.95;

  background: var(--base-color);
  filter: brightness(1);
  transform: scale(1);
  transition: filter 0.2s, transform 0.1s;
}

.button:hover {
  filter: brightness(var(--hover-brightness));
}

.button:active {
  transform: scale(var(--active-scale));
}

/* 变体按钮 */
.button.success {
  --base-color: #10b981;
}

.button.danger {
  --base-color: #ef4444;
}
```

---

### 4. 卡片悬停效果

```css
.card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover::before {
  opacity: 0.1;
}

.card img {
  transition: filter 0.3s ease;
}

.card:hover img {
  filter: grayscale(100%) brightness(1.2);
}
```

---

### 5. 复杂形状设计

```css
/* 六边形头像 */
.avatar-hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

/* 波浪形分割线 */
.wave-divider {
  clip-path: polygon(
    0% 100%,
    5% 95%,
    10% 100%,
    15% 95%,
    20% 100%,
    25% 95%,
    30% 100%,
    35% 95%,
    40% 100%,
    45% 95%,
    50% 100%,
    55% 95%,
    60% 100%,
    65% 95%,
    70% 100%,
    75% 95%,
    80% 100%,
    85% 95%,
    90% 100%,
    95% 95%,
    100% 100%,
    100% 0%,
    0% 0%
  );
}
```

---

## ⚠️ 注意事项

### 浏览器兼容性

| 特性 | Chrome | Firefox | Safari | Edge | 支持度 |
|-----|--------|---------|--------|------|--------|
| CSS 变量 | 49+ | 31+ | 9.1+ | 15+ | ✅ 广泛支持 |
| calc() | 19+ | 4+ | 6+ | 12+ | ✅ 广泛支持 |
| min()/max()/clamp() | 79+ | 75+ | 11.1+ | 79+ | ✅ 较好支持 |
| color-mix() | 111+ | 113+ | 16.2+ | 111+ | ⚠️ 较新 |
| clip-path | 55+ | 54+ | 9.1+ | 79+ | ✅ 广泛支持 |
| mask-image | 85+ | 53+ | 15.4+ | 85+ | ⚠️ 部分支持 |

**降级策略**：
```css
/* 为不支持 CSS 变量的浏览器提供回退 */
.button {
  background: #3b82f6; /* 回退值 */
  background: var(--primary-color, #3b82f6);
}

/* 使用 @supports 检测支持 */
@supports (backdrop-filter: blur(10px)) {
  .glass-effect {
    backdrop-filter: blur(10px);
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .glass-effect {
    background: rgba(255, 255, 255, 0.9);
  }
}
```

---

### 性能注意事项

**CSS 变量**：
- ✅ 更新变量只会影响使用该变量的元素
- ⚠️ 避免在频繁动画中使用 CSS 变量（如 transform、opacity）
- ✅ 使用 CSS 变量实现主题切换性能良好

**滤镜**：
- ⚠️ `filter` 会创建新的层叠上下文，可能影响性能
- ⚠️ 复杂滤镜在大量元素上使用时可能卡顿
- ✅ 尽量只在 hover 或特定状态下使用滤镜

**clip-path 和 mask-image**：
- ⚠️ 会创建新的层叠上下文
- ✅ 动画 clip-path 性能良好（硬件加速）
- ⚠️ 复杂的 mask-image 可能影响渲染性能

---

### 最佳实践

1. **命名规范**：使用有意义的变量名
   ```css
   /* 好的命名 */
   --color-primary-brand: #3b82f6;
   --spacing-vertical-unit: 8px;
   --font-size-base: 16px;

   /* 避免过短的命名 */
   --c1: #3b82f6; /* 不好 */
   ```

2. **默认值**：始终提供回退值
   ```css
   .element {
     color: var(--custom-color, #333); /* 提供默认值 */
   }
   ```

3. **类型安全**：保持变量类型一致
   ```css
   :root {
     --spacing: 8px; /* 始终使用 px 单位 */
   }

   /* 避免混合类型 */
   .element {
     margin: var(--spacing) var(--spacing) 10px; /* 不一致 */
   }
   ```

4. **合理使用**：不要过度使用复杂特性
   - 简单场景优先使用原生 CSS
   - 复杂逻辑考虑使用预处理器
   - 权衡浏览器兼容性和开发效率

---

## 🔗 实际应用

### 综合示例：现代化按钮组件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS 高级特性示例</title>
  <style>
    :root {
      /* 颜色系统 */
      --color-primary: #3b82f6;
      --color-primary-hover: #2563eb;
      --color-success: #10b981;
      --color-danger: #ef4444;
      --color-text: #1f2937;
      --color-text-light: #6b7280;

      /* 间距系统 */
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;

      /* 字体系统 */
      --font-size-base: clamp(1rem, 2vw + 0.5rem, 1.25rem);
      --font-weight-normal: 400;
      --font-weight-bold: 600;

      /* 圆角系统 */
      --radius-sm: 4px;
      --radius-md: 8px;
      --radius-lg: 12px;

      /* 阴影系统 */
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: var(--font-size-base);
      line-height: 1.6;
      color: var(--color-text);
      padding: var(--spacing-lg);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      max-width: min(100%, 800px);
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-lg);
    }

    h1 {
      font-size: clamp(1.5rem, 4vw + 1rem, 2.5rem);
      margin-bottom: var(--spacing-md);
      color: var(--color-text);
    }

    /* 按钮基础样式 */
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      color: white;
      background: var(--button-color, var(--color-primary));
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s ease;
      filter: brightness(1);
      transform: translateY(0);
    }

    .button:hover {
      background: var(--button-hover-color, var(--color-primary-hover));
      filter: brightness(1.1);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .button:active {
      transform: translateY(0);
      filter: brightness(0.95);
    }

    .button:focus {
      outline: 2px solid var(--button-color);
      outline-offset: 2px;
    }

    /* 按钮变体 */
    .button.primary {
      --button-color: var(--color-primary);
      --button-hover-color: var(--color-primary-hover);
    }

    .button.success {
      --button-color: var(--color-success);
      --button-hover-color: #059669;
    }

    .button.danger {
      --button-color: var(--color-danger);
      --button-hover-color: #dc2626;
    }

    /* 按钮组 */
    .button-group {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
      margin-bottom: var(--spacing-lg);
    }

    /* 卡片样式 */
    .card {
      background: white;
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      margin-bottom: var(--spacing-md);
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--color-primary), var(--color-success));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card:hover::before {
      opacity: 0.05;
    }

    .card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-4px);
    }

    .card-title {
      font-size: calc(var(--font-size-base) * 1.25);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--spacing-sm);
    }

    .card-content {
      color: var(--color-text-light);
      margin-bottom: var(--spacing-md);
    }

    /* 形状示例 */
    .shape-demo {
      display: flex;
      gap: var(--spacing-md);
      margin: var(--spacing-lg) 0;
      flex-wrap: wrap;
    }

    .shape {
      width: 100px;
      height: 100px;
      background: var(--color-primary);
      transition: all 0.3s ease;
    }

    .shape.circle {
      clip-path: circle(50% at 50% 50%);
    }

    .shape.hexagon {
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }

    .shape.star {
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    .shape:hover {
      background: var(--color-success);
      transform: scale(1.1);
    }

    /* 滤镜示例 */
    .filter-demo {
      display: flex;
      gap: var(--spacing-md);
      margin: var(--spacing-lg) 0;
      flex-wrap: wrap;
    }

    .filter-item {
      width: 150px;
      text-align: center;
    }

    .filter-item img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-sm);
      transition: filter 0.3s ease;
    }

    .filter-item:hover img {
      filter: none;
    }

    .filter-item:hover img.grayscale {
      filter: grayscale(100%);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 CSS 高级特性演示</h1>

    <section class="button-group">
      <button class="button primary">主按钮</button>
      <button class="button success">成功按钮</button>
      <button class="button danger">危险按钮</button>
    </section>

    <h2>📦 卡片组件</h2>
    <div class="card">
      <h3 class="card-title">CSS 变量</h3>
      <p class="card-content">使用 CSS 自定义属性实现主题化和动态样式。</p>
    </div>

    <div class="card">
      <h3 class="card-title">数学函数</h3>
      <p class="card-content">使用 calc()、min()、max()、clamp() 实现响应式布局。</p>
    </div>

    <div class="card">
      <h3 class="card-title">滤镜效果</h3>
      <p class="card-content">使用 filter 实现图片处理和视觉效果。</p>
    </div>

    <h2>🔷 形状剪裁</h2>
    <div class="shape-demo">
      <div class="shape circle"></div>
      <div class="shape hexagon"></div>
      <div class="shape star"></div>
    </div>

    <h2>🖼️ 滤镜效果</h2>
    <div class="filter-demo">
      <div class="filter-item">
        <img src="https://via.placeholder.com/150" alt="原图">
        <p>原图</p>
      </div>
      <div class="filter-item">
        <img src="https://via.placeholder.com/150" alt="灰度" style="filter: grayscale(100%);">
        <p>灰度</p>
      </div>
      <div class="filter-item">
        <img src="https://via.placeholder.com/150" alt="对比度" style="filter: contrast(150%);">
        <p>对比度</p>
      </div>
      <div class="filter-item">
        <img src="https://via.placeholder.com/150" alt="模糊" style="filter: blur(3px);">
        <p>模糊</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 📖 学习资源

- [MDN - CSS 自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN - CSS 数学函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Functions)
- [MDN - clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)
- [MDN - filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
- [CSS Tricks - A Complete Guide to Custom Properties](https://css-tricks.com/guides/css-custom-properties/)
- [Can I Use - 浏览器兼容性查询](https://caniuse.com/)
