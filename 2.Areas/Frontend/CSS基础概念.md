---
concept: CSS基础概念
importance: high
category: 前端
tags:
  - "#CSS"
  - "#领域/前端"
创建时间: 2026-01-18T11:40
更新时间: 2026-02-23T03:12
---
## 📚 定义

**CSS（Cascading Style Sheets）**：层叠样式表，用于描述HTML文档的呈现方式。

核心作用：
- 分离内容（HTML）与样式（CSS），提高代码可维护性
- 控制布局、颜色、字体、动画等视觉效果
- 实现响应式设计，适配不同设备屏幕

## 💡 核心理解
- [[CSS引入方式]]
- [[CSS选择器]]
- [[CSS层叠、继承、值计算]]
- [[盒模型]]
- [[行内元素与块元素]]
- [[CSS布局系统]]（布局核心）
- [[响应式布局]]（现代必备）
- [[flexbox布局]]（推荐布局方式）

## 🎯 应用场景

### 1. 技术面试
- 选择器优先级计算
- 盒模型与布局原理
- Flexbox与Grid布局对比
- BFC概念与应用

### 2. 实际开发
- **页面样式设计**：美化UI组件，实现设计稿
- **响应式开发**：适配桌面、平板、手机等多端
- **布局实现**：使用Flexbox/Grid实现复杂布局
- **动画效果**：实现过渡动画、交互反馈
- **浏览器兼容**：处理不同浏览器的样式差异


## ⚠️ 注意事项

### 选择器优先级
- CSS选择器的权重不同，计算优先级时要考虑：
  - `!important`（最高）
  - 内联样式（1000分）
  - ID选择器（100分）
  - 类选择器/属性选择器/伪类（10分）
  - 标签选择器/伪元素（1分）

### 盒模型
- 移动端开发默认选择 `border-box` 替代盒模型
  ```css
  * {
    box-sizing: border-box;
  }
  ```

### 元素隐藏方式
- **不占位隐藏**：`display: none;`（元素从文档流中移除）
- **占位隐藏**：`visibility: hidden;`（元素仍占位但不可见）
- **透明度隐藏**：`opacity: 0;`（占位且可交互）


## 🔗 实际应用

### 代码示例

#### 1. 居中对齐
```css
/* Flexbox居中 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 绝对定位居中 */
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### 2. 清除浮动
```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

#### 3. 单行/多行文本溢出
```css
/* 单行省略 */
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 多行省略（Webkit） */
.ellipsis-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

### 常用技巧
- 使用 CSS 变量（自定义属性）管理主题色
- 利用 `calc()` 函数进行动态计算
- 使用媒体查询实现响应式布局
- 合理使用 `rem`/`em` 相对单位
- 预处理器（Sass/Less）提升开发效率

## 📖 延伸阅读

- MDN CSS文档：[CSS参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- CSS Tricks Flexbox指南
- 现代 CSS 布局：Grid vs Flexbox
- CSS 动画与过渡实践

