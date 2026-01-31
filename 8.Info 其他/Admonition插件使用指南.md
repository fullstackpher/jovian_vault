---
创建时间: 2026-01-31
更新时间: 2026-01-31T13:26
---

# 📦 Admonition 插件使用指南

> Admonition 插件让你在 Obsidian 中创建美观的提示框、警告框和自定义引用块。

---

## 📝 基本语法

使用 `!!!` 和 `???` 语法创建提示框：

```markdown
!!! note "标题"
    内容...
```

```markdown
??? note "标题"
    内容...
    可折叠内容
```

---

## 🎨 内置类型

| 类型 | 用途 | 示例 |
|:---:|:---|:---|
| `note` | 笔记/备注 | !!! note |
| `abstract` | 摘要/总结 | !!! abstract |
| `info` | 信息提示 | !!! info |
| `tip` | 技巧/提示 | !!! tip |
| `success` | 成功/完成 | !!! success |
| `question` | 问题/疑问 | !!! question |
| `warning` | 警告 | !!! warning |
| `failure` | 失败/错误 | !!! failure |
| `danger` | 危险/⚠️ | !!! danger |
| `bug` | Bug/问题 | !!! bug |
| `example` | 示例 | !!! example |
| `quote` | 引用 | !!! quote |

---

## 📋 使用示例

### 基础用法

```markdown
!!! note
    这是一个简单的提示框
```

!!! note
    这是一个简单的提示框

### 带标题

```markdown
!!! tip "💡 实用技巧"
    这是带有标题的提示框
```

!!! tip "💡 实用技巧"
    这是带有标题的提示框

### 多种类型

```markdown
!!! warning "⚠️ 注意事项"
    这是一个警告框，用于提醒重要信息
```

!!! warning "⚠️ 注意事项"
    这是一个警告框，用于提醒重要信息

```markdown
!!! danger "🚫 禁止操作"
    这是一个危险警告
```

!!! danger "🚫 禁止操作"
    这是一个危险警告

---

## 🔽 可折叠提示框

使用 `???` 替代 `!!!` 创建可折叠的提示框：

```markdown
??? note "点击展开查看更多"
    这段内容默认是折叠的
    只有点击标题才会展开
```

??? note "点击展开查看更多"
    这段内容默认是折叠的
    只有点击标题才会展开

### 默认展开

```markdown
???+ note "默认展开"
    这个提示框默认就是展开状态
    使用 ???+ 而不是 ???
```

???+ note "默认展开"
    这个提示框默认就是展开状态
    使用 ???+ 而不是 ???

---

## 🖼️ 图标自定义

在标题中可以添加 emoji 或使用 Admonition 设置中的图标：

```markdown
!!! tip "💡"
    使用 emoji 作为图标
```

!!! tip "💡"
    使用 emoji 作为图标

---

## 📦 嵌入内容

提示框内可以嵌入各种 Markdown 内容：

### 嵌入列表

```markdown
!!! note "待办事项"
    - [ ] 任务一
    - [ ] 任务二
    - [ ] 任务三
```

!!! note "待办事项"
    - [ ] 任务一
    - [ ] 任务二
    - [ ] 任务三

### 嵌入代码

```markdown
!!! tip "代码技巧"
    ```javascript
    console.log('Hello, Admonition!');
    ```
```

!!! tip "代码技巧"
    ```javascript
    console.log('Hello, Admonition!');
    ```

### 嵌入表格

```markdown
!!! info "数据统计"
    | 项目 | 数值 |
    |:---:|:---:|
    | A | 100 |
    | B | 200 |
```

!!! info "数据统计"
    | 项目 | 数值 |
    |:---:|:---:|
    | A | 100 |
    | B | 200 |

---

## 🎭 自定义样式

### 无标题

```markdown
!!! info ""
    没有标题的提示框
```

!!! info ""
    没有标题的提示框

### 嵌套使用

```markdown
!!! note "外层提示"
    这是外层内容

    !!! tip "内层提示"
        这是内层内容
```

!!! note "外层提示"
    这是外层内容

    !!! tip "内层提示"
        这是内层内容

---

## ⚙️ 配置选项

在 Obsidian 设置中配置 Admonition 插件：

1. **启用/禁用类型**：选择需要显示的提示类型
2. **自定义颜色**：为每种类型设置自定义颜色
3. **自定义图标**：为每种类型设置图标
4. **动画效果**：开启/关闭折叠动画

---

## 💡 实际应用场景

### 1. 知识整理

```markdown
!!! note "关键概念"
    **定义**：这是某个重要概念的定义
    - 特点一
    - 特点二
```

### 2. 学习笔记

```markdown
!!! tip "学习技巧"
    1. 先理解原理
    2. 再动手实践
    3. 最后总结复盘
```

### 3. 项目文档

```markdown
!!! warning "环境要求"
    - Node.js 16+
    - npm 8+
    - Obsidian 1.0+
```

### 4. 问题记录

```markdown
!!! bug "已知问题"
    当前版本在某些情况下会出现渲染问题
    解决方案：重启 Obsidian
```

### 5. 代码注释

```markdown
!!! example "使用示例"
    ```python
    def hello():
        print("Hello, World!")
    ```
```

---

## 🔗 相关资源

- 插件仓库：[Github](https://github.com/obsidianmd/obsidian-admonition)
- 官方文档：[Obsidian Admonition](https://obsidian.md/plugins?id=admonition)

---

> 💡 **提示**：使用提示框可以让笔记更加结构化和易读，建议在以下场景使用：概念解释、注意事项、代码示例、总结归纳等。
