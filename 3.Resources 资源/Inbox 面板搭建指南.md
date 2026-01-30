---
title: Obsidian Inbox 面板搭建指南
category: Obsidian/工作流
created: 2026-01-30
tags:
  - obsidian
  - inbox
  - workflow
  - quick-capture
  - dataview
---

# Obsidian Inbox 面板搭建指南

## 什么是 Inbox？

Inbox（收件箱）是快速捕获想法、任务、笔记的中转站。核心原则：**捕获一切，定期清空**。

```
想法/任务 → Inbox（临时存储）→ 整理/分类 → 移至目标位置
```

## 方案一：快速捕获型 Inbox

### 1. 创建 Inbox 文件夹

在 vault 根目录创建：
```
📁 00.inbox/
   └── daily/
       └── 快速捕获的笔记放在这里
```

### 2. 使用 QuickAdd 插件快速捕获

安装 QuickAdd 插件，配置宏：

**Macro: 快速添加到 Inbox**
```
1. Prompt: 输入想法
2. Append to file: 00.inbox/daily/临时想法.md
3. Template: 捕获模板
```

### 3. 创建捕获模板

```markdown
---
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
source: quick-capture
tags:
---

<% tp.prompt("输入想法:") %>

## 下一步行动
- [ ] 评估并整理
```

### 4. 添加快捷键

在 Obsidian 设置 → 快捷键中设置：
- `Ctrl/Cmd + Shift + A` → 快速添加想法

---

## 方案二：Dataview 查询面板（推荐）

创建一个 Dashboard 页面，显示 Inbox 中未整理的笔记：

```dataviewjs
dv.list(
  dv.pages('"00.inbox"')
    .sort(p => p.file.cday, 'desc')
    .where(p => !p.is_processed)
    .map(p => `[[${p.file.name}|${p.file.name}]] - ${p.file.day?.split('T')[0] || '无日期'}`)
)
```

### Inbox 笔记模板

```yaml
---
created: 2026-01-30
status: inbox    # inbox | processing | processed
priority: medium
tags:
  - inbox
---

# <% tp.file.title %>

## 捕获内容

在这里输入想法...

## 整理建议

- [ ] 这属于哪个领域？
- [ ] 下一步行动是什么？
- [ ] 需要设置截止日期吗？

## 整理记录

整理时间：____________
移至位置：____________
```

### 高级 Dataview 查询

```dataview
TABLE status, priority, file.cday AS "创建日期"
FROM "00.inbox"
WHERE status != "processed"
SORT file.cday DESC
```

---

## 方案三：Meta Bind 表单面板

在 Dashboard 中嵌入交互式捕获表单：

```markdown
---
inbox_title:
inbox_tags:
inbox_priority: medium
inbox_type: idea
---

# 📥 快速捕获

标题：%%bind:text[inbox_title]()%%
类型：%%bind:select[inbox_type](想法|任务|项目|问题)%%
优先级：%%bind:select[inbox_priority](高|中|低)%%
标签：%%bind:text[inbox_tags]()%%

%%bind:textarea[inbox_content](在这里输入内容...)%%

%%bind:toggle[save_to_inbox](保存到 Inbox)%%
```

---

## 方案四：Buttons 面板

安装 **Buttons** 插件，创建操作按钮：

```markdown
## 📥 Inbox 快速操作

---

### 💡 添加想法

```button
name 添加想法
type command
action QuickAdd: 捕获想法
color blue
```

---

### 📝 添加任务

```button
name 添加任务
type command
action QuickAdd: 捕获任务
color red
```

---

### 🔄 整理今日 Inbox

```button
name 整理 Inbox
type command
action Templater: 打开 Inbox 整理模板
color green
```

---

### 📊 查看 Inbox 状态

```button
name Inbox 统计
type command
action Dataview: Inbox 查询
color yellow
```

```

---

## 方案五：完整 Inbox Dashboard（推荐）

创建一个综合的 Inbox 面板：

```markdown
---
title: Inbox 面板
---

# 📥 Inbox 收件箱

## 快速捕获

> 💡 **提示**: 使用 `Ctrl+Shift+A` 快速添加想法

### 今日捕获

```dataview
TABLE file.link AS "笔记", created AS "时间"
FROM "00.inbox"
WHERE file.cday = date(today)
SORT file.cday DESC
LIMIT 10
```

### 待整理笔记

```dataview
TABLE priority, tags
FROM "00.inbox"
WHERE status = "inbox"
SORT priority DESC, file.cday DESC
```

### 统计

```dataview
TABLE length(rows) AS "总数"
FROM "00.inbox"
WHERE status = "inbox"
GROUP BY status
```

---

## 操作按钮

| 操作 | 说明 |
|------|------|
| 🔍 查看全部 Inbox | 打开 Inbox 文件夹 |
| 📝 整理 Inbox | 运行整理流程 |
| 🏷️ 批量标签 | 批量添加标签 |
| 📦 导出 Inbox | 导出为备份 |

```

---

## 我的 Inbox 工作流

```
1. 随时捕获
   ↓
2. 每日回顾（早晨）
   ↓
3. 快速处理（5分钟内）
   - 删除 ❌
   - 归档 📁
   - 执行 ✅
   - 委托 👤
   - 推迟 ⏰
   ↓
4. 移出 Inbox
```

## 推荐插件组合

| 插件 | 用途 |
|------|------|
| **QuickAdd** | 快速捕获（必需） |
| **Templater** | 高级模板 |
| **Dataview** | 查询和统计 |
| **Buttons** | 操作按钮 |
| **Meta Bind** | 交互表单 |
| **Folder Note** | 文件夹说明 |
| **File Recovery** | 防止误删 |

## 文件夹结构建议

```
00.inbox/                    # 收件箱
├── daily/                   # 每日快速捕获
│   └── inbox-2026-01-30.md
├── ideas.md                 # 想法收集
├── tasks.md                 # 任务收集
└── inbox-template.md        # 捕获模板

10.projects/                 # 项目（清空 Inbox 后移入）
20.areas/                    # 领域
30.resources/                # 资源
40.archive/                  # 归档
```

## 常见问题

### Q: Inbox 里东西太多怎么办？
A: 说明整理频率太低。建议每日至少整理一次 Inbox。

### Q: 如何避免无限堆积？
A: 遵循"两分钟原则"：如果处理时间少于两分钟，立即处理。

### Q: 可以在移动端使用吗？
A: 可以！通过移动端快捷方式或 Templater 脚本快速捕获。

## 快速启动清单

- [ ] 创建 `00.inbox` 文件夹
- [ ] 安装 QuickAdd 插件
- [ ] 配置快速捕获模板
- [ ] 设置快捷键
- [ ] 创建 Dataview 查询面板
- [ ] 设置每日回顾提醒

---

## 相关资源

- [[3.Resources 资源/Meta Bind 插件使用指南]]
- [[3.Resources 资源/QuickAdd 插件使用指南]]
- [[3.Resources 资源/Dataview 使用指南]]
