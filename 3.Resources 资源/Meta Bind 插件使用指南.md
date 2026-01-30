---
title: Meta Bind 插件使用指南
category: Obsidian/插件
tags:
  - obsidian
  - plugin
  - meta-bind
  - frontmatter
  - interactive
创建时间: 2026-01-30T16:09
更新时间: 2026-01-30T16:10
---

# Meta Bind 插件使用指南

## 概述

Meta Bind 插件允许你在 Obsidian 笔记中创建交互式控件（输入框、下拉菜单、滑块等），并将这些控件与笔记的 YAML frontmatter 属性绑定。通过这种方式，你可以直接在阅读模式下编辑笔记的元数据，而无需进入编辑模式或手动修改 YAML。

## 基础语法

Meta bind 使用 `%%` 包裹内联绑定表达式：

```markdown
%%bind:类型[属性名](默认值为空)%%
```

## 可用的控件类型

### 1. 文本输入框

```
%%bind:text[title](默认标题)%%
%%bind:text[author](Anonymous)%%
```

### 2. 数字输入框

```
%%bind:number[rating](5)%%
%%bind:number[age](25)%%
```

### 3. 日期选择器

```
%%bind:date[due_date](2024-01-30)%%
%%bind:date[created](today)%%
```

### 4. 下拉选择框

```
%%bind:select[status](未开始|进行中|已完成)%%
%%bind:select[priority](高|中|低)%%
```

### 5. 复选框（布尔值）

```
%%bind:toggle[is_completed](false)%%
%%bind:toggle[is_important](true)%%
```

### 6. 滑块（范围）

```
%%bind:range[progress](0|100|50)%%  % 最小值|最大值|默认值
%%bind:range[volume](0|100|75)%%
```

### 7. 文本区域

```
%%bind:textarea[notes](这是一个笔记区域)%%
```

## 使用示例

### 示例 1：项目跟踪

```yaml
---
project: 个人网站重构
status: 进行中
priority: 高
progress: 60
due_date: 2024-02-15
is_completed: false
---
```

在笔记中添加控件：

```
项目状态：%%bind:select[status](未开始|进行中|已完成]%%
优先级：%%bind:select[priority](高|中|低)%%
进度：%%bind:range[progress](0|100|60)%%
截止日期：%%bind:date[due_date]%%
```

### 示例 2：图书追踪

```yaml
---
book_title: 原子习惯
author: James Clear
rating: 4
read_date: 2024-01-20
notes:
is_recommended: true
---
```

### 示例 3：日常记录

```yaml
---
mood: 良好
energy: 7
exercise_done: true
water_intake: 2000
journal_entry:
---
```

控件写法：
```
今日心情：%%bind:select[](很糟糕|不太好|一般|良好|很棒)%%
能量值：%%bind:range[energy](1|10|5)%%
运动完成：%%bind:toggle[exercise_done]%%
饮水量：%%bind:number[water_intake](2000)%%
```

## 高级用法

### 1. 组合多个属性

你可以在一个笔记中绑定多个 frontmatter 属性：

```markdown
---
title:
author:
rating:
review:
---
```

控件：
```
书名：%%bind:text[title]%%
作者：%%bind:text[author]%%
评分：%%bind:range[rating](1|5|3)%%
书评：%%bind:textarea[review]%%
```

### 2. 在 Callout 中使用

```markdown
> [!info] 任务信息
> 状态：%%bind:select[status](待办|进行中|完成)%%
> 重要性：%%bind:toggle[is_important]%%
```

### 3. 在表格中使用

| 属性 | 控件 |
|------|------|
| 名称 | %%bind:text[name]%% |
| 分类 | %%bind:select[category](工作|生活|学习)%% |
| 进度 | %%bind:range[progress](0|100|0)%% |

## 注意事项

1. **属性名匹配**：控件的 `属性名` 必须与 frontmatter 中的属性名完全匹配（区分大小写）

2. **初始值**：如果 frontmatter 中已有该属性的值，控件会显示该值而不是默认值

3. **触发更新**：修改控件值后，需要触发 Obsidian 的刷新才能更新 frontmatter（通常自动或手动刷新）

4. **隐藏控件**：如果你只想在阅读模式下看到控件，可以在 YAML 中隐藏属性

5. **不支持的属性类型**：
   - 数组
   - 对象
   - 嵌套属性

## 常见问题

### Q: 修改控件后 frontmatter 没有更新？
A: 确保笔记处于可编辑状态，尝试切换阅读/编辑模式，或运行 `Meta Bind: Refresh all bindings` 命令

### Q: 如何批量更新多个笔记？
A: 可以使用 DataviewJS 或 Templater 脚本批量插入绑定

### Q: 控件显示但不工作？
A: 检查插件是否启用，属性名是否正确匹配

## 相关资源

- 插件仓库：[obsidian-meta-bind-plugin](https://github.com/MohrJonas/obsidian-meta-bind-plugin)
- 官方文档：见插件设置中的帮助链接
