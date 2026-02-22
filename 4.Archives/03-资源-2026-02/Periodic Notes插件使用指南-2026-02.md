---
创建时间: 2026-02-09T16:14
更新时间: 2026-02-23T03:12
tags:
  - obsidian/plugin
---

# Periodic Notes 插件使用指南

## 📝 插件简介

Periodic Notes 是 Obsidian 中一个非常实用的插件，它可以帮助你创建和管理周期性的笔记，包括：
- **日笔记** (Daily Notes)
- **周笔记** (Weekly Notes)
- **月笔记** (Monthly Notes)
- **季度笔记** (Quarterly Notes)
- **年笔记** (Yearly Notes)

### 主要功能

- 快速创建不同周期的笔记
- 自动命名和归档
- 在笔记间导航（上一篇/下一篇）
- 自定义笔记模板
- 命令面板集成
- 侧边栏集成（需配合[[社区插件：Command Palette]]使用）

## 🔧 安装方法

### 1. 安装步骤

1. 打开 Obsidian 设置
2. 转到「社区插件」→「浏览」
3. 搜索「Periodic Notes」
4. 点击安装并启用插件

### 2. 基本设置

安装完成后，你会在设置中看到「Periodic Notes」选项卡。

## ⚙️ 配置指南

### 日笔记配置

**文件位置设置：**
- **文件夹**：设置日记笔记的存储位置，例如 `daily notes/`
- **日期格式**：设置文件名中的日期格式，例如 `YYYY-MM-DD` 或 `YYYY年MM月DD日`

**模板配置：**
- **模板文件位置**：设置模板文件的路径，例如 `templates/Daily Note Template.md`
- **新建时打开**：勾选后创建新日记时会自动打开

**导航功能：**
- **显示在命令面板中**：在命令面板中显示日笔记相关命令
- **显示在侧边栏中**：将日笔记添加到侧边栏（需要[[Community Plugin: Periodic Notes]]支持）

### 周笔记配置

**文件位置设置：**
- **文件夹**：设置周记的存储位置，例如 `weekly notes/`
- **日期格式**：设置文件名中的日期格式

**周的开始日：**
- 选择每周的起始日（周日、周一等）

**模板配置：**
- 与日笔记类似，设置周记的模板文件

### 月/季/年笔记配置

配置方式与日笔记和周笔记类似，只需选择对应的周期类型即可。

## 📖 使用方法

### 创建周期笔记

#### 方法一：通过命令面板

1. 按 `Ctrl/Cmd + P` 打开命令面板
2. 输入「Periodic Notes」
3. 选择对应的周期（如「打开今日日记」）
4. 如果笔记不存在，会自动创建

#### 方法二：通过侧边栏

如果你配置了侧边栏集成，可以：
1. 点击侧边栏中对应的周期图标
2. 快速访问该周期的当前笔记

### 导航周期笔记

在周期笔记中，你可以：
- 点击顶部的导航箭头跳转到上一篇/下一篇笔记
- 在笔记底部添加导航链接

## 🎨 模板示例

### 日笔记模板

```markdown
---
date: {{date}}
tags:
  - daily
  - journal
---

# {{date}}

## 📅 今日重点

-

## ✅ 待办事项

- [ ]
- [ ]

## 📝 学习笔记

-

## 🌟 心情记录

今天的心情：😊😐😔

备注：
```

### 周笔记模板

```markdown
---
week: {{date:YYYY-[W]ww}}
tags:
  - weekly
  - review
---

# 周报 {{date:YYYY-[W]ww}}

## 🎯 本周目标

-
-

## 📊 完成情况

- [ ]
- [ ]

## 💡 本周收获

-

## 🔄 反思总结

-
```

## 💡 最佳实践

### 1. 命名规范

建议为周期性笔记设置清晰的文件夹结构：

```
your-vault/
├── daily notes/          # 日记
├── weekly notes/         # 周记
├── monthly notes/        # 月度总结
└── yearly notes/         # 年度总结
```

### 2. 模板统一

- 在 `templates/` 文件夹中创建统一的模板
- 模板中包含固定的元数据格式（YAML frontmatter）
- 预留常用的章节结构

### 3. 索引建立

为不同周期创建索引笔记，便于查找：

- `Daily Notes Index` - 按月/年汇总日记
- `Weekly Review` - 周度回顾链接
- `Monthly Review` - 月度回顾链接

### 4. 链接使用

在周期笔记中使用链接：
- 用 `[[2026-02-08]]` 引用昨天的日记
- 用 `[[Weekly Notes/2026-W06]]` 引用本周周记
- 用 `[查看详情](#section)` 链接到笔记的特定章节

### 5. 标签管理

为不同周期设置不同的标签：
- 日记：`#daily`
- 周记：`#weekly`
- 月度总结：`#monthly`
- 年度总结：`#yearly`

结合 [[Dataview]] 插件可以轻松汇总这些笔记。

## 🔗 相关插件

Periodic Notes 可以与其他插件配合使用，功能更强大：

- **[[Community Plugin: Dataview]]**：查询和汇总周期性笔记
- **[[Community Plugin: Calendar]]**：日历视图，可视化管理日记
- **[[Community Plugin: Tasks]]**：任务管理，结合日记使用
- **[[Community Plugin: Templater]]**：更强大的模板功能

## ❓ 常见问题

### Q1: 创建的笔记没有应用模板？

**A:** 检查以下几点：
1. 确认模板文件的路径是否正确
2. 检查模板文件是否存在
3. 确认插件的「模板文件位置」设置正确

### Q2: 如何修改已经创建的笔记？

**A:** 直接在笔记中编辑即可。如果需要更新模板：
1. 修改模板文件
2. 新创建的笔记会应用新模板
3. 已存在的笔记不会自动更新（需要手动修改）

### Q3: 可以同时启用多个周期类型吗？

**A:** 可以。Periodic Notes 支持同时使用日笔记、周笔记、月笔记等多种类型。

### Q4: 如何在笔记之间快速跳转？

**A:** 有几种方法：
1. 使用 Periodic Notes 提供的导航箭头
2. 手动创建链接：`[[2026-02-08]]`（前一天的日记）
3. 使用 [[Community Plugin: Dataview]] 查询所有日记并生成列表

### Q5: 如何将现有的日记迁移到 Periodic Notes？

**A:** 迁移步骤：
1. 将现有的日记文件移动到 Periodic Notes 指定的文件夹
2. 确保文件名格式与配置一致（如 `YYYY-MM-DD.md`）
3. Periodic Notes 会自动识别这些文件

## 📚 参考资料

- [Periodic Notes 官方文档](https://github.com/liamcain/obsidian-periodic-notes)
- [Obsidian 社区讨论](https://forum.obsidian.md/)
- 相关笔记：[[Community Plugin: Daily Notes]], [[Community Plugin: Calendar]]

---

**最后更新：** 2026-02-09