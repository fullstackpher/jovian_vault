---
创建时间: 2026-01-25T19:47
更新时间: 2026-01-26T18:46
tags:
  - obsidian
  - quickadd-plugin
---

# Obsidian QuickAdd 插件使用指南

## 插件概述

QuickAdd 是 Obsidian 的强力效率插件，通过**快捷命令**快速执行各种操作：
- 快速创建笔记
- 捕获文字/剪贴板内容
- 执行模板插入
- 运行宏命令
- 捕获网页内容

> 💡 核心理念：用最少步骤完成最多工作

---

## 安装与启用

1. **安装**：设置 → 第三方插件 → 关闭安全模式 → 浏览 → 搜索 "QuickAdd" → 安装
2. **启用**：启用插件
3. **配置**：点击设置页的 "QuickAdd" 或使用命令面板

---

## 核心功能

### 1. 快速创建笔记 (New Note)

**配置步骤：**
1. 点击 QuickAdd 设置 → 添加 → 选择 "New Note"
2. 设置名称（如 `Meeting Notes`）
3. 选择保存位置（如 `notes/meetings/`）
4. 设置文件格式（日期格式、文件名模板）
5. 勾选 "Add to QuickAdd" 添加到菜单

**模板变量：**
```
{{title}}        # 用户输入的标题
{{date}}         # 当前日期 (2026-01-26)
{{time}}         # 当前时间 (14:30)
{{folder}}       # 指定文件夹
{{filename}}     # 完整文件名
```

### 2. 捕获内容 (Capture)

**类型选择：**
- **Append to note**：追加到现有笔记
- **Replace note content**：替换笔记内容
- **New note**：创建新笔记捕获

**使用场景：**
1. 快速记下想法
2. 捕获剪贴板内容
3. 记录临时笔记

### 3. 模板输入 (Template)

**配置步骤：**
1. 设置 → 插件选项 → QuickAdd → Templates
2. 添加模板文件夹路径
3. 在 QuickAdd 设置中选择 "Template" 类型
4. 选择模板文件
5. 运行时选择文件位置和名称

**模板增强语法：**
```javascript
// 基础变量
{{title}}        // 笔记标题
{{date}}         // YYYY-MM-DD
{{datetime}}     // 完整日期时间
{{time}}         // HH:mm

// 格式转换
{{date:YYYY-MM}}        // 月份
{{date:dddd}}           // 星期几
{{title:capitalize}}    // 首字母大写
{{title:uppercase}}     // 全部大写
{{title:lowercase}}     // 全部小写

// 条件逻辑
{{#if "条件"}} 内容 {{/if}}

// 交互输入
{{VALUE:输入提示|默认值}}
{{CHOICE:选择提示|选项1,选项2,选项3}}
```

### 4.宏命令 (Macros)

将多个操作组合成单个命令：

**创建宏：**
1. 添加 → 选择 "Macros"
2. 添加多个操作步骤
3. 设置执行顺序
4. 保存并添加到 QuickAdd

**示例宏序列：**
```
1. New Note → 创建每日笔记
2. Template → 插入每日模板
3. Open Note → 打开新笔记
```

### 5. 网页捕获 (Web Capture)

需要配合浏览器扩展使用：

**配置：**
1. 安装 Obsidian Web Clipper 浏览器扩展
2. 在 QuickAdd 设置中配置捕获目标
3. 设置默认模板

**使用：**
1. 在浏览器中选中内容
2. 点击扩展图标
3. 选择 QuickAdd 动作
4. 内容自动保存到笔记

---

## 常用配置示例

### 示例 1：快速每日笔记

```
名称：Daily Note
类型：Template
模板：templates/daily.md
位置：daily/
文件名格式：{{date:YYYY-MM-DD}}
```

**模板文件 `templates/daily.md`：**
```markdown
---
创建时间: {{date}} {{time}}
tags:
  - daily
---

# {{date:YYYY年M月D日}}

## 今日待办
- [ ]

## 今日总结

## 灵感/想法

```

### 示例 2：快速会议笔记

```
名称：Meeting
类型：New Note
位置：notes/meetings/
文件名格式：Meeting_{{date:YYYYMMDD}}_{{VALUE:会议主题}}
模板：templates/meeting.md
```

### 示例 3：快速捕捉想法

```
名称：Quick Capture
类型：Capture
目标笔记：inbox.md
追加位置：文件末尾
```

---

## 高级技巧

### 1. 快捷键设置

1. QuickAdd 设置 → Keyboard Shortcuts
2. 为常用操作设置快捷键
3. 推荐：
   - `Ctrl + Q` → 打开 QuickAdd 菜单
   - `Ctrl + Shift + Q` → 快速捕捉

### 2. 多选单选配置

在 QuickAdd 中可以设置：
- **Multi-Select**：允许一次选择多个操作
- **User Prompt**：运行时显示提示

### 3. 结合 Templater 使用

QuickAdd + Templater = 超级组合：
```javascript
// 在模板中使用 Templater 函数
<% tp.date.now("YYYY-MM-DD") %>
<% tp.file.title %>
<% tp.web.fetch() %>
```

### 4. 脚本扩展

支持 JavaScript 脚本：
```javascript
// script.js
module.exports = {
    params: (params) => {
        return params;
    },
    run: async (params) => {
        // 自定义逻辑
        return "结果内容";
    }
}
```

### 5. 工作区管理

- 为不同场景创建不同配置
- 使用名称前缀分类：`Work/`, `Personal/`, `Study/`

---

## 命令面板使用

QuickAdd 添加的命令可在命令面板中使用：

1. `Ctrl/Cmd + P` 打开命令面板
2. 搜索 "QuickAdd"
3. 选择对应操作

**常用命令：**
- `QuickAdd: Open Menu` → 打开主菜单
- `QuickAdd: Run "配置名称"` → 直接运行指定配置
- `QuickAdd: Capture to "笔记名"` → 快速捕获

---

## 实用工作流

### 工作流 1：每日例程启动

```
宏名称：Morning Routine

步骤：
1. Template → 打开每日笔记模板
2. New Note → 创建今日日志
3. Open Note → 打开日志
```

### 工作流 2：读书笔记

```
名称：Book Note
类型：Template
模板：templates/book.md

模板内容：
```markdown
---
书名: {{VALUE:书名}}
作者: {{VALUE:作者}}
阅读日期: {{date}}
标签: books
rating: {{CHOICE:评分|⭐,⭐⭐,⭐⭐⭐,⭐⭐⭐⭐,⭐⭐⭐⭐⭐}}
---

# {{VALUE:书名}}

## 基本信息
- 作者：{{VALUE:作者}}
- 出版社：{{VALUE:出版社}}
- 阅读日期：{{date}}

## 评分
{{CHOICE:⭐|⭐,⭐⭐,⭐⭐⭐,⭐⭐⭐⭐,⭐⭐⭐⭐⭐}}

## 核心观点

## 精彩摘录

## 读后感

```
```

### 工作流 3：项目管理

```
名称：New Task
类型：Template
模板：templates/task.md

模板内容：
```markdown
---
创建时间: {{date}} {{time}}
tags:
  - task
  - {{CHOICE:项目|Project A,Project B,Personal}}
status: todo
priority: {{CHOICE:优先级|🔴 高,🟡 中,🟢 低}}
due-date:
---

# {{VALUE:任务标题}}

## 任务描述

## 完成标准

## 分解步骤

- [ ]

## 相关笔记
```

---

## 快捷键速查

| 操作 | 默认快捷键 | 自定义建议 |
|------|-----------|-----------|
| 打开 QuickAdd 菜单 | 无 | Ctrl + Q |
| 快速捕捉想法 | 无 | Ctrl + Shift + Q |
| 运行指定配置 | 无 | 根据需要设置 |

---

## 常见问题

### Q1: 模板变量不生效？
确保使用正确的语法 `{{变量名}}`，并在 QuickAdd 设置中启用模板解析。

### Q2: 如何修改已创建的配置？
QuickAdd 设置 → 点击配置名称 → 修改设置 → 保存

### Q3: 能否导出/导入配置？
设置 → QuickAdd → Export/Import 按钮

### Q4: 与 Templater 冲突？
在 QuickAdd 设置中关闭内置模板解析，使用 Templater 处理模板

### Q5: 怎么删除配置？
QuickAdd 设置 → 点击配置名称 → Delete 按钮

---

## 相关插件组合

- **Templater**：高级模板语法
- **Dataview**：元数据索引
- **Kanban**：任务看板
- **Obsidian Shell Commands**：命令行集成
- **Web Clipper**：网页捕获

---

## 参考资源

- [QuickAdd 官方文档](https://quickadd.obsidian.guide/)
- [Obsidian 论坛 - QuickAdd 讨论](https://forum.obsidian.md/tag/quickadd)
- [YouTube 教程](https://www.youtube.com/results?search_query=obsidian+quickadd)
