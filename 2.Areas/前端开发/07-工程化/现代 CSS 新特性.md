---
concept: 现代 CSS 新特性
importance: high
category: 前端
tags:
  - CSS
  - 领域/前端
创建时间: 2026-01-16T17:38
更新时间: 2026-02-24T19:56
---

## 📚 定义

### 1. 容器查询（Container Queries）

**核心概念**：允许根据**父容器**的尺寸而非视口尺寸应用样式，实现真正的组件级响应式。

**基本语法**：
```css
/* 声明容器 */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* 使用容器查询 */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

**与媒体查询的对比**：
- `@media`：基于视口宽度，适合页面级布局
- `@container`：基于父容器宽度，适合组件级布局

---

### 2. 层叠层（Cascade Layers）

**核心概念**：提供更可控的层叠顺序，让 CSS 的优先级管理更加清晰和可预测。

**基本语法**：
```css
/* 定义层叠层 */
@layer base, components, utilities;

/* 在层中定义规则 */
@layer base {
  * {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: system-ui;
  }
}

@layer components {
  .card {
    border-radius: 8px;
  }
}

@layer utilities {
  .text-center {
    text-align: center;
  }
}

/* 非层规则优先级高于层规则 */
.unlayered {
  /* 即使在 @layer 之后定义，也高于所有层 */
  z-index: 999;
}
```

**层叠层优先级**（从低到高）：
1. 未声明层的样式
2. 后定义的层优先级更高（`utilities` > `components` > `base`）

**应用场景**：
- CSS Reset/Normalize 放在底层
- 组件样式放在中间层
- 工具类样式放在高层

---

### 3. 子网格（Subgrid）

**核心概念**：允许嵌套的网格元素继承父网格的轨道定义，实现跨层级的对齐。

**基本语法**：
```css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.child-subgrid {
  /* 子网格继承父网格的列轨道 */
  grid-column: span 2;
  display: grid;
  grid-template-columns: subgrid; /* 关键：使用 subgrid */
  gap: inherit;
}
```

**使用示例**：
```html
<div class="card-grid">
  <div class="card">
    <div class="card-header">标题</div>
    <div class="card-body">内容</div>
    <div class="card-footer">底部</div>
  </div>
</div>

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  grid-column: span 1;
  display: grid;
  grid-template-rows: subgrid; /* 继承父网格的行轨道 */
  grid-row: span 3;
}
</style>
```

**解决的问题**：
- 组件内部元素与外部网格对齐
- 避免硬编码尺寸，实现真正的弹性布局

---

### 4. CSS 逻辑属性（Logical Properties）

**核心概念**：使用与文本书写方向相关的属性名，而不是固定方向的属性名，支持多语言布局（如 RTL）。

**属性对照表**：

| 物理属性 | 逻辑属性 | 说明 |
|---------|---------|------|
| `margin-left` | `margin-inline-start` | 行首边距 |
| `margin-right` | `margin-inline-end` | 行尾边距 |
| `margin-top` | `margin-block-start` | 块首边距 |
| `margin-bottom` | `margin-block-end` | 块尾边距 |
| `padding-left` | `padding-inline-start` | 行首内边距 |
| `padding-right` | `padding-inline-end` | 行尾内边距 |
| `border-left` | `border-inline-start` | 行首边框 |
| `border-right` | `border-inline-end` | 行尾边框 |
| `width` | `inline-size` | 行内尺寸 |
| `height` | `block-size` | 块级尺寸 |
| `min-width` | `min-inline-size` | 最小行内尺寸 |
| `max-width` | `max-inline-size` | 最大行内尺寸 |

**基本语法**：
```css
/* 传统物理属性（固定方向） */
.box {
  margin-left: 20px;
  padding-right: 10px;
}

/* 逻辑属性（自适应方向） */
.box {
  margin-inline-start: 20px;
  padding-inline-end: 10px;
}

/* 多语言支持示例 */
/* LTR（从左到右，如中文、英文） */
[dir="ltr"] .box {
  margin-inline-start: 20px; /* 等于 margin-left: 20px */
}

/* RTL（从右到左，如阿拉伯语、希伯来语） */
[dir="rtl"] .box {
  margin-inline-start: 20px; /* 等于 margin-right: 20px */
}
```

**应用场景**：
- 国际化项目（支持 RTL 语言）
- 需要动态切换方向的布局
- 书写方向不确定的场景

---

## 💡 核心理解

现代 CSS 新特性解决了传统 CSS 的几个痛点：

1. **响应式从页面级到组件级**：容器查询让组件能够根据自身容器尺寸调整样式，而不是依赖视口。

2. **优先级管理更清晰**：层叠层通过分层机制，让 CSS 的优先级规则更加可控。

3. **网格嵌套更自然**：子网格解决了嵌套网格的对齐问题，让复杂布局更加简洁。

4. **多语言支持更便捷**：逻辑属性让布局能够自适应不同书写方向，简化国际化开发。

### 相关知识

- [[2.Areas/前端开发/响应式布局]] - 容器查询是响应式的扩展，从页面级到组件级
- [[2.Areas/前端开发/CSS高级特性]] - 现代 CSS 功能补充

---

## 🎯 应用场景

### 1. 容器查询应用场景

```css
/* 卡片组件：根据容器宽度调整布局 */
.card {
  container-type: inline-size;
  container-name: card;
}

@container card (max-width: 300px) {
  .card {
    display: flex;
    flex-direction: column;
  }
  .card-image {
    width: 100%;
    height: 200px;
  }
}

@container card (min-width: 301px) and (max-width: 600px) {
  .card {
    display: flex;
    flex-direction: row;
  }
  .card-image {
    width: 200px;
    height: 100%;
  }
}

@container card (min-width: 601px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

**实际应用**：
- 可复用卡片组件（在不同容器中自适应）
- 侧边栏中的小组件
- 网格中的单元格内容

---

### 2. 层叠层应用场景

```css
/* 项目中的 CSS 架构 */
@layer reset, base, components, utilities, overrides;

/* Reset 层：浏览器样式重置 */
@layer reset {
  * {
    box-sizing: border-box;
  }
}

/* Base 层：基础样式 */
@layer base {
  body {
    font-family: system-ui;
    line-height: 1.6;
  }
}

/* Components 层：组件样式 */
@layer components {
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
}

/* Utilities 层：工具类 */
@layer utilities {
  .flex { display: flex; }
  .center { align-items: center; justify-content: center; }
}

/* Overrides 层：覆盖层 */
@layer overrides {
  /* 高优先级，覆盖所有层 */
  .btn-primary {
    background: blue;
    color: white;
  }
}
```

**实际应用**：
- 大型项目的 CSS 架构
- UI 组件库开发
- CSS-in-JS 替代方案

---

### 3. 子网格应用场景

```css
/* 日历组件：日期对齐 */
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  display: grid;
  grid-template-rows: subgrid; /* 继承父网格的行 */
  grid-row: span 6;
}

/* 事件卡片网格 */
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.event-card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4;
  gap: 8px;
}
```

**实际应用**：
- 日历组件（日期对齐）
- 数据表格（单元格对齐）
- 网格卡片布局（内容对齐）

---

### 4. 逻辑属性应用场景

```css
/* 按钮：根据书写方向调整 */
.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  margin-inline-end: 0.5rem; /* LTR 在图标后留空，RTL 在图标前留空 */
}

/* 导航栏：自适应方向 */
.nav {
  display: flex;
  justify-content: space-between;
  padding-inline: 1rem; /* LTR: left/right, RTL: right/left */
}

.nav-list {
  display: flex;
  gap: 1rem;
}

.nav-link {
  padding-inline-start: 1rem; /* 左/右边距自适应 */
  border-inline-start: 2px solid transparent;
}

.nav-link:hover {
  border-inline-start-color: blue;
}
```

**实际应用**：
- 国际化网站（支持 RTL）
- 需要切换方向的布局
- 多语言 CMS 系统

---

## ⚠️ 注意事项

### 浏览器兼容性

| 特性 | Chrome | Firefox | Safari | Edge | 支持度 |
|-----|--------|---------|--------|------|--------|
| 容器查询 | 105+ | 110+ | 16+ | 105+ | ⚠️ 需要降级 |
| 层叠层 | 99+ | 97+ | 15.4+ | 99+ | ⚠️ 需要降级 |
| 子网格 | 117+ | 71+ | 16.2+ | 117+ | ⚠️ Safari 较新 |
| 逻辑属性 | 87+ | 66+ | 14.1+ | 87+ | ✅ 较好支持 |

### 降级策略

```css
/* 容器查询降级 */
.card {
  /* 默认样式（不支持的浏览器） */
  display: block;
}

/* 支持容器查询的浏览器 */
@supports (container-type: inline-size) {
  .card {
    container-type: inline-size;
  }

  @container (min-width: 400px) {
    .card {
      display: grid;
    }
  }
}
```

```css
/* 子网格降级 */
.grid-item {
  /* 默认：使用固定列数 */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* 支持子网格的浏览器 */
@supports (grid-template-rows: subgrid) {
  .grid-item {
    grid-template-rows: subgrid;
  }
}
```

### 性能注意事项

1. **容器查询**：
   - 过多的容器查询可能影响性能
   - 避免深层嵌套的容器查询

2. **层叠层**：
   - 不要创建过多的层（建议 < 10 层）
   - 明确每层的职责

3. **子网格**：
   - 复杂的子网格布局可能影响渲染性能
   - 测试大数量元素的子网格

4. **逻辑属性**：
   - 确保明确设置 `dir` 属性
   - 测试 LTR/RTL 切换的视觉效果

---

## 🔗 实际应用

### 综合示例：响应式卡片组件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>现代 CSS 新特性示例</title>
  <style>
    /* 层叠层定义 */
    @layer base, components, utilities;

    @layer base {
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        font-family: system-ui;
        padding: 2rem;
        background: #f5f5f5;
      }
    }

    @layer utilities {
      .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }
    }

    @layer components {
      /* 卡片容器：支持容器查询 */
      .card-wrapper {
        container-type: inline-size;
        container-name: card;
      }

      /* 卡片基础样式 */
      .card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding-block: 1rem;
        padding-inline: 1rem;
        border-inline-start: 4px solid blue;
        display: grid;
        gap: 0.5rem;
      }

      /* 小容器：垂直布局 */
      @container card (max-width: 300px) {
        .card {
          grid-template-rows: auto auto 1fr;
          grid-template-columns: 1fr;
        }
        .card-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        .card-title {
          font-size: 1.25rem;
        }
      }

      /* 中等容器：水平布局 */
      @container card (min-width: 301px) {
        .card {
          grid-template-rows: 1fr;
          grid-template-columns: auto 1fr;
          gap: 1rem;
        }
        .card-image {
          width: 120px;
          height: 100%;
          object-fit: cover;
        }
        .card-title {
          font-size: 1.5rem;
        }
      }

      /* 大容器：网格布局 */
      @container card (min-width: 500px) {
        .card {
          grid-template-rows: auto 1fr auto;
          grid-template-columns: 1fr 1fr;
        }
        .card-image {
          grid-column: 1 / -1;
          width: 100%;
          height: 200px;
        }
        .card-title {
          grid-column: 1 / -1;
          font-size: 1.75rem;
        }
        .card-content {
          grid-column: 1;
        }
        .card-meta {
          grid-column: 2;
        }
      }

      /* 逻辑属性示例 */
      .card-meta {
        display: flex;
        gap: 0.5rem;
        padding-inline-start: 1rem;
        border-inline-start: 2px solid #ddd;
        font-size: 0.875rem;
        color: #666;
      }
    }
  </style>
</head>
<body>
  <h1>现代 CSS 新特性示例</h1>

  <div class="container">
    <!-- 卡片 1 -->
    <div class="card-wrapper">
      <div class="card">
        <img src="https://via.placeholder.com/300x200" alt="示例图片" class="card-image">
        <h2 class="card-title">容器查询</h2>
        <p class="card-content">
          卡片布局根据容器宽度自动调整。尝试调整浏览器窗口大小，观察卡片布局的变化。
        </p>
        <div class="card-meta">
          <span>📅 2026-02-06</span>
          <span>👁️ 128</span>
        </div>
      </div>
    </div>

    <!-- 卡片 2 -->
    <div class="card-wrapper">
      <div class="card">
        <img src="https://via.placeholder.com/300x200" alt="示例图片" class="card-image">
        <h2 class="card-title">层叠层</h2>
        <p class="card-content">
          CSS 层叠层提供了更可控的样式优先级管理，让大型项目的 CSS 架构更加清晰。
        </p>
        <div class="card-meta">
          <span>📅 2026-02-05</span>
          <span>👁️ 256</span>
        </div>
      </div>
    </div>

    <!-- 卡片 3 -->
    <div class="card-wrapper">
      <div class="card">
        <img src="https://via.placeholder.com/300x200" alt="示例图片" class="card-image">
        <h2 class="card-title">逻辑属性</h2>
        <p class="card-content">
          使用逻辑属性实现自适应书写方向的布局，支持 LTR 和 RTL 语言无缝切换。
        </p>
        <div class="card-meta">
          <span>📅 2026-02-04</span>
          <span>👁️ 512</span>
        </div>
      </div>
    </div>
  </div>

  <!-- RTL 测试示例 -->
  <h2 style="margin-top: 2rem;">RTL 布局示例</h2>
  <div dir="rtl" class="container">
    <div class="card-wrapper">
      <div class="card">
        <img src="https://via.placeholder.com/300x200" alt="示例图片" class="card-image">
        <h2 class="card-title">RTL 示例</h2>
        <p class="card-content">
          此卡片使用 RTL（从右到左）布局，逻辑属性会自动调整间距和边框位置。
        </p>
        <div class="card-meta">
          <span>📅 2026-02-06</span>
          <span>👁️ 64</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 📖 学习资源

- [MDN - 容器查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Container_Queries)
- [MDN - 层叠层](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer)
- [MDN - 子网格](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid/Layout_Alignment#Subgrid)
- [MDN - 逻辑属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Logical_Properties)
- [Can I Use - 浏览器兼容性查询](https://caniuse.com/)
