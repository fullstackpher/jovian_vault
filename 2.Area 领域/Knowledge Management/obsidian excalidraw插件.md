---
tags:
  - "#知识管理"
  - "#obsidian"
  - "#excalidraw"
  - "#绘图"
创建时间: 2026-01-17T20:02
更新时间: 2026-01-26T18:50
---

# Obsidian Excalidraw 插件使用指南

## 插件概述

Excalidraw 是 Obsidian 最受欢迎的手绘风格绘图插件，提供：
- 🎨 **手绘风格**：独特的白板手绘视觉效果
- 📝 **图文混排**：将绘图嵌入笔记，支持链接和嵌入
- 📐 **丰富工具**：基本形状、箭头、文本、自由绘制等
- 🔗 **深度集成**：与 Obsidian 的 Wiki 链接完美结合
- 💾 **模板系统**：保存和复用常用图形
- 📤 **多种导出**：PNG、SVG、PDF 等格式

> 💡 核心理念：让图表像手绘一样简单，像专业工具一样强大

---

## 安装与启用

1. **安装**：
   - 设置 → 第三方插件 → 关闭安全模式
   - 浏览 → 搜索 "Excalidraw" → 安装

2. **启用**：
   - 启用插件
   - 推荐：同时安装 **Excalidraw Plugin** 和 **Drawing Toolbar** 插件

3. **初始设置**：
   - 首次使用会提示设置绘图文件夹（默认 `excalidraw/`）
   - 设置默认画布尺寸和样式

---

## 核心功能

### 1. 创建绘图

**方式一：新建文件**
1. 使用命令面板：`Excalidraw: Create new drawing`
2. 或快捷键：`Ctrl/Cmd + E`（需自定义）
3. 文件保存为 `.excalidraw.md` 格式

**方式二：从模板创建**
1. 命令面板：`Excalidraw: Create new drawing from template`
2. 选择模板文件夹中的模板
3. 自动填充预定义的图形和样式

### 2. 工具栏介绍

| 工具 | 快捷键 | 功能说明 |
|------|--------|----------|
| 选择 | `V` | 移动、缩放、旋转元素 |
| 画笔 | `P` | 自由手绘线条 |
| 直线 | `L` | 绘制直线 |
| 箭头 | `A` | 绘制箭头 |
| 矩形 | `R` | 绘制矩形/框 |
| 椭圆 | `O` | 绘制椭圆/圆形 |
| 文字 | `T` | 添加文字 |
| 铅笔 | `H` | 素描风格绘制 |
| 橡皮 | `E` | 擦除元素 |

### 3. 手绘风格渲染

Excalidraw 的核心特色是手绘效果：

**开启方式**：
- 工具栏右侧 → 点击 "手绘风格" 图标
- 或使用快捷键：`Ctrl/Cmd + D` 切换

**风格特点**：
- 线条略微抖动，模拟手绘
- 颜色采用柔和的手绘配色
- 字体使用圆体，模拟手写
- 阴影和边框不规则

### 4. 嵌入 Obsidian 笔记

**嵌入单行文字**：
```
{{renderer excalidraw, [[笔记名]]}}
```

**嵌入整个绘图**：
```
![drawing]([[drawing.excalidraw.md]])
```

**嵌入绘图中的部分**：
```
{{excalidraw-link}}
[[drawing.excalidraw.md]]
{{excalidraw-link}}
```

### 5. 链接与嵌入

**添加 Wiki 链接**：
1. 选中元素
2. 右键 → "Add Link"
3. 输入 `[[笔记名]]` 或 `#heading`
4. 点击链接跳转到对应笔记/标题

**嵌入其他笔记内容**：
1. 使用文本工具
2. 在文本框中输入 `{{embed: [[笔记名]]}}`
3. 渲染后显示笔记摘要

---

## 高级功能

### 1. 模板系统

**创建模板**：
1. 绘制常用图形
2. 另存为模板：`Ctrl/Cmd + Shift + S`
3. 选择保存位置（`templates/excalidraw/` 文件夹）

**使用模板**：
- 命令面板 → `Excalidraw: Create new drawing from template`
- 或点击工具栏 "模板" 图标

**模板语法**：
```
---
excalidraw-plugin: raw
excalidraw:
  SVGCanvas: 800x600
  background: "#ffffff"
---
[图形定义...]
```

### 2. 脚本扩展（JS）

Excalidraw 支持 JavaScript 脚本增强：

**示例脚本 - 自动对齐**：
```javascript
// AlignElements.js
const alignElements = (elements, direction) => {
  // 获取所有选中元素
  const selected = elements.filter(el => el.isSelected);
  if (selected.length < 2) return;

  // 根据方向对齐
  if (direction === 'left') {
    const minX = Math.min(...selected.map(el => el.x));
    selected.forEach(el => el.x = minX);
  }
  // ... 其他方向
};

alignElements(app.selectedElements, 'left');
```

**使用脚本**：
1. 脚本放在 `.obsidian/scripts/` 目录
2. 在 Excalidraw 中运行：`Excalidraw: Run script`

### 3. 变量与自动文本

**日期时间变量**：
```
{{date:YYYY-MM-DD}}    → 2026-01-26
{{time:HH:mm}}         → 14:30
{{datetime}}           → 2026-01-26 14:30
```

**文件变量**：
```
{{title}}              → 当前文件名
{{folder}}             → 当前文件夹路径
{{basename}}           → 不含扩展名的文件名
```

**Obsidian 变量**：
```
{{vp:frontmatter.tag}} → 读取当前笔记的 frontmatter
```

### 4. 图层管理

**图层面板**：
- 右侧面板 → 图层选项卡
- 显示所有元素层级
- 可拖拽调整顺序
- 隐藏/锁定图层

**图层操作**：
- `Ctrl/Cmd + [` → 上移一层
- `Ctrl/Cmd + ]` → 下移一层
- `Ctrl/Cmd + Shift + [` → 移到顶层
- `Ctrl/Cmd + Shift + ]` → 移到底层

### 5. 导出功能

| 格式 | 说明 | 使用场景 |
|------|------|----------|
| PNG | 位图格式 | 插入到笔记、分享 |
| SVG | 矢量格式 | 缩放不失真、网页使用 |
| PDF | 矢量格式 | 打印、文档导出 |
| MD | 源文件 | 备份、版本控制 |
| Excalidraw JSON | 纯数据 | 脚本处理 |

**导出步骤**：
1. 工具栏 → "导出" 图标
2. 选择格式和分辨率
3. 设置文件名和保存位置
4. 点击导出

---

## 常用场景与示例

### 场景 1：系统架构图

```
1. 新建 Excalidraw 绘图
2. 使用矩形框绘制组件
3. 添加箭头连接组件
4. 使用文字标注功能名称
5. 添加颜色区分不同层次
6. 保存为模板 arch-template.excalidraw.md
```

**推荐设置**：
- 背景色：透明或浅灰
- 线条宽度：2-3px
- 字体大小：16-20px

### 场景 2：思维导图

```
1. 中央放置主题（椭圆）
2. 使用放射状分支
3. 颜色编码不同类别
4. 链接到详细笔记
```

**技巧**：
- 锁定中心元素防止移动
- 使用组合快捷键：`Ctrl/Cmd + G`
- 分支使用圆角箭头

### 场景 3：流程图

```
开始 → 步骤1 → 条件判断 → 结束
         ↓ 是         ↓ 否
      步骤2 → 循环
```

**形状规范**：
- 开始/结束：圆角矩形
- 流程步骤：矩形
- 判断：菱形
- 文档：平行四边形

### 场景 4：UI/UX 线框图

```
┌─────────────────────┐
│      导航栏          │
├─────────┬───────────┤
│ 侧边栏  │   内容区   │
│         │           │
│         │           │
└─────────┴───────────┘
```

**技巧**：
- 使用 8px 网格对齐
- 保持线条粗细一致
- 标注关键尺寸

### 场景 5：数学图表

```
         y
         ↑
         │    ●
         │   /
         │  /
    ─────┼─●──────→ x
       ● │
     ●   │
   ●     │
```

**工具推荐**：
- 画笔工具绘制坐标轴
- 椭圆工具绘制数据点
- 箭头工具绘制趋势线
- 文字工具添加公式

---

## 快捷键速查

### 常用操作

| 操作 | Windows/Linux | Mac |
|------|---------------|-----|
| 新建绘图 | Ctrl+Shift+E | Cmd+Shift+E |
| 保存 | Ctrl+S | Cmd+S |
| 撤销 | Ctrl+Z | Cmd+Z |
| 重做 | Ctrl+Shift+Z | Cmd+Shift+Z |
| 复制 | Ctrl+C | Cmd+C |
| 粘贴 | Ctrl+V | Cmd+V |
| 删除 | Del | Delete |
| 全选 | Ctrl+A | Cmd+A |
| 切换手绘风格 | Ctrl+D | Cmd+D |
| 导出 | Ctrl+Shift+S | Cmd+Shift+S |

### 工具切换

| 工具 | 快捷键 |
|------|--------|
| 选择 | V |
| 画笔 | P |
| 直线 | L |
| 箭头 | A |
| 矩形 | R |
| 椭圆 | O |
| 文字 | T |
| 橡皮 | E |

### 视图操作

| 操作 | 快捷键 |
|------|--------|
| 放大 | + / = |
| 缩小 | - |
| 适应屏幕 | 0 |
| 重置视图 | 1 |
| 移动画布 | 空格 + 拖拽 |

---

## 配置选项

在 **设置 → Excalidraw** 中可配置：

### 画布设置

| 选项 | 说明 | 默认值 |
|------|------|--------|
| Default folder | 默认保存文件夹 | excalidraw/ |
| Canvas size | 默认画布尺寸 | 1920x1080 |
| Background color | 背景颜色 | #ffffff |
| Grid size | 网格大小 | 10px |

### 样式设置

| 选项 | 说明 | 默认值 |
|------|------|--------|
| Stroke width | 线条宽度 | 2px |
| Font size | 默认字体大小 | 20px |
| Handwriting font | 手写字体 | 自定义 |
| Theme | 主题 | Light |

### 导出设置

| 选项 | 说明 | 默认值 |
|------|------|--------|
| Export scale | 导出缩放比例 | 1x |
| Export background | 包含背景 | 是 |
| PNG quality | PNG 质量 | 100% |
| SVG embed images | SVG 嵌入图片 | 否 |

---

## 插件组合使用

### Excalidraw + Dataview

```dataview
TABLE file.link AS "图表"
FROM "excalidraw"
WHERE file.name LIKE "architecture*"
```

### Excalidraw + Templater

```javascript
// 在模板中自动插入当前日期
<% tp.date.now("YYYY-MM-DD") %>

// 插入链接的笔记标题
<% tp.file.title %>
```

### Excalidraw + Obsidian Shell Commands

```bash
# 一键导出所有绘图为 PNG
for f in excalidraw/*.excalidraw.md; do
  # 调用 Excalidraw API 导出
done
```

### Excalidraw + Style Settings

- 自定义配色方案
- 调整字体样式
- 主题切换

---

## 常见问题

### Q1: 绘图中文字显示乱码？
- 检查系统字体是否支持中文
- 在设置中指定中文字体（如"微软雅黑"）

### Q2: 导出图片模糊？
- 在导出设置中提高缩放比例（2x 或 3x）
- 选择 SVG 格式可无损缩放

### Q3: 如何插入图片？
- 直接拖拽图片到画布
- 或使用工具栏 "插入图片" 按钮
- 支持 PNG、JPG、SVG 格式

### Q4: 绘图中如何添加 LaTeX 公式？
- 使用文本工具输入 `$公式$`
- 例如：`$E=mc^2$` 或 `$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$`

### Q5: 如何制作可复用的组件？
1. 绘制组件
2. 选中组件 → 右键 → "Group"
3. 保存到模板文件夹
4. 在其他绘图中插入使用

### Q6: 多人协作支持？
- 导出为 Excalidraw JSON 格式
- 使用第三方协作工具（如 tldraw）

### Q7: 绘图文件太大？
- 减少嵌入图片的数量和尺寸
- 使用链接代替嵌入
- 定期清理未使用的元素

---

## 使用技巧

### 技巧 1：快速复制样式
1. 选中具有目标样式的元素
2. 按 `Ctrl/Cmd + Alt + C` 复制样式
3. 选中其他元素
4. 按 `Ctrl/Cmd + Alt + V` 应用样式

### 技巧 2：批量修改
1. 选中多个元素（Shift + 点击）
2. 右键 → "Batch edit"
3. 同时修改颜色、大小等属性

### 技巧 3：对称绘制
1. 开启工具栏 "镜像" 功能
2. 绘制时自动生成对称图形
3. 适合绘制图标和对称图案

### 技巧 4：网格对齐
1. 开启 "显示网格"
2. 开启 "吸附到网格"
3. 元素自动对齐到网格点

### 技巧 5：快捷键自定义
在 Obsidian 快捷键设置中搜索 "Excalidraw"：
- 为常用命令设置快捷键
- 如：切换手绘风格、打开模板等

---

## 参考资源

- [Excalidraw 官网](https://excalidraw.com/)
- [Excalidraw Obsidian 插件](https://github.com/zsviczian/obsidian-excalidraw-plugin)
- [Excalidraw 社区模板](https://github.com/zsviczian/obsidian-excalidraw-plugin/tree/master/src/templates)
- [YouTube 教程](https://www.youtube.com/results?search_query=obsidian+excalidraw)
- [Obsidian 论坛讨论](https://forum.obsidian.md/tag/excalidraw)

---

## 补充说明

### 推荐字体

| 用途 | Windows | Mac |
|------|---------|-----|
| 手写风 | 微软雅黑 | PingFang SC |
| 整洁风 | JetBrains Mono | SF Mono |
| 艺术风 | 方正手写体 | Apple Chancery |

### 配色方案推荐

```
# 经典黑白
线条: #000000
填充: #ffffff
文字: #000000

# 柔和彩色
线条: #1a1a1a
填充: #f5f5f5
强调: #ff6b6b

# 商务风格
线条: #2c3e50
填充: #ecf0f1
强调: #3498db
```

### 相关插件

| 插件名称 | 功能 |
|----------|------|
| Drawing Toolbar | 增强工具栏 |
| Excalidraw Automate | 脚本自动化 |
| Excalidraw LaTeX | LaTeX 公式支持 |
| Style Settings | 样式自定义 |
| Templater | 模板增强 |

