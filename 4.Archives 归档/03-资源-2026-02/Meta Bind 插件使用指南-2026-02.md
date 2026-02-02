---
title: Meta Bind 插件使用指南
category: Obsidian/插件
tags:
  - "#obsidian/plugin"
创建时间: 2026-01-30T16:09
更新时间: 2026-02-02T20:16
rating: "5"
age: "18"
is_important: true
status: 完成
priority: 高
is_completed: false
status_:
  - 进行中
  - 待办
collection: 工作
progress: 50
index: 37
---

# Meta Bind 插件使用指南

## 概述

Meta Bind 插件允许你在 Obsidian 笔记中创建交互式控件（输入框、下拉菜单、滑块等），并将这些控件与笔记的 YAML frontmatter 属性绑定。通过这种方式，你可以直接在阅读模式下编辑笔记的元数据，而无需进入编辑模式或手动修改 YAML。

## 基础语法

Meta bind 使用 `%%` 包裹内联绑定表达式：

```markdown
`INPUT[类型:属性名]`
```

## 可用的控件类型

### 1. 文本输入框

`INPUT[text:title]`

`INPUT[text:author]`

```
`INPUT[text:title]`
`INPUT[text:author]`
```

### 2. 数字输入框

`INPUT[number:rating]`

`INPUT[number:age]`

```
`INPUT[number:rating]`
`INPUT[number:age]`
```

### 3. 日期选择器

`INPUT[date:exampleProperty]`

`INPUT[datePicker:exampleProperty]`



```
`INPUT[date:exampleProperty]`
`INPUT[datePicker:exampleProperty]`
```

### 4. 下拉选择框

`INPUT[inlineSelect(option(高), option(中), option(低)):priority]`

> [!example]+ 多选
```meta-bind
INPUT[multiSelect(option(待办), option(进行中), option(完成)):status_]
```

> [!example]+ 单选
```meta-bind
INPUT[select(option(待办), option(进行中), option(完成)):status]
```

`INPUT[inlineList:exampleProperty]`

### 5. 复选框（布尔值）

`INPUT[toggle:is_completed]`

```
`INPUT[toggle:is_completed]`
```

### 6. 滑块（范围）

`INPUT[slider(addLabels):progress]`

```
`INPUT[slider(addLabels):progress]`
```

### 7. 文本区域
`INPUT[textArea:exampleProperty]`
### 8. 进度条


```meta-bind
INPUT[progressBar:index]
```


## 使用示例

### 示例 1：项目跟踪

[[示例 1：项目跟踪]]

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

控件写法：

> [!example]+ 图书追踪控件
> **书名**：
> 
> `INPUT[text:book_title]`
> 
> 
> **作者**：
> 
> `INPUT[text:author]`
> 
> **我的评分**：
> 
> `INPUT[number:rating]` （1-5分）
> 
> **阅读日期**：
> 
> `INPUT[date:read_date]`
> 
> **个人笔记**：
> 
> `INPUT[textArea:notes]`
> 
> **推荐他人**：`INPUT[toggle:is_recommended]`

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

[[示例 3：日常记录]]

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

### 2. 在 Callout 中使用

```markdown
> [!info] 任务信息
> 状态：`INPUT[inlineSelect(option(选项1),option(选项2),option(选项3)):status]`
> 重要性：`INPUT[toggle:is_important]`
```

> [!example]+ 在Callout中使用

> [!info] 任务信息
> 状态：`INPUT[inlineSelect(option(待办),option(进行中),option(完成)):status]`
> 重要性：`INPUT[toggle:is_important]`
### 3. 在表格中使用

| 属性  | 控件                                                                 |
| --- | ------------------------------------------------------------------ |
| 名称  | `INPUT[text:title]`                                                |
| 分类  | `INPUT[inlineSelect(option(工作),option(生活),option(学习)):collection]` |
| 进度  | <br>`INPUT[slider(addLabels):progress]`<br>                        |


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
