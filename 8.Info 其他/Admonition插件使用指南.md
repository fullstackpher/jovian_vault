---
创建时间: 2026-01-31
更新时间: 2026-01-31T14:40
---

# 📦 Admonition 插件使用指南

> Admonition 插件让你在 Obsidian 中创建美观的提示框、警告框和自定义引用块。

---

## 📝 基本语法

使用 `!!!` 和 `???` 语法创建提示框：

```markdown
	```ad-note 
	"标题"
	    内容...
	    
	```
```


---

## 🎨 内置类型

|     类型     | 用途     | 示例          |
| :--------: | :----- | :---------- |
|   `note`   | 笔记/备注  | ad-note     |
| `abstract` | 摘要/总结  | ad-abstract |
|   `info`   | 信息提示   | ad-info     |
|   `tip`    | 技巧/提示  | ad-tip      |
| `success`  | 成功/完成  | ad-success  |
| `question` | 问题/疑问  | ad-question |
| `warning`  | 警告     | ad-warning  |
| `failure`  | 失败/错误  | ad-failure  |
|  `danger`  | 危险/⚠️  | ad-danger   |
|   `bug`    | Bug/问题 | ad-bug      |
| `example`  | 示例     | ad-example  |
|  `quote`   | 引用     | ad-quote    |

---

## 📋 使用示例

### 基础用法

```ad-note 
这是一个简单的提示框
```

### 指定标题

- title: 指定标题

```ad-info
title: 这是带有标题的提示框    
```

### 指定颜色

- color：指定颜色，必须RGB风格

```ad-warning
color: 200, 200, 200
必须遵守RGB风格
```

### 指定icon

- icon：指定icon，来自`FontAwesome` 或 `RPGAwesome`

```ad-tip
icon: campground
使用 emoji 作为图标
```

### 多种类型

```ad-warning
这是一个警告框，用于提醒重要信息
```


```ad-danger
这是一个危险警告
```

---

## 🔽 可折叠提示框

- 使用 `collapse: open` 创建可折叠的提示框：

```ad-note
title: 点击展开查看更多
collapse: open
这段内容默认是折叠的
只有点击标题才会展开
```

---

## 📦 嵌入内容

- 提示框内可以嵌入各种 Markdown 内容：

### 嵌入列表

```ad-done
## 待办事项
- [ ] 任务一
- [ ] 任务二
- [ ] 任务三
```

### 嵌入代码

```ad-tip
## 嵌入代码
    
    `console.log('Hello, Admonition!');`
    
```

### 嵌入表格

```ad-info
## 嵌入表格
	

|   项目  |   说明  |
| --- | --- |
|    项目A | 这是一个项目说明    |

```

---

## 🎭 自定义样式

### 无标题

```ad-info
没有标题的提示框
```



### 嵌套使用

```markdown
!!! note "外层提示"
    这是外层内容

    !!! tip "内层提示"
        这是内层内容
```

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

```ad-note
"关键概念"
**定义**：这是某个重要概念的定义
- 特点一
- 特点二
```

### 2. 学习笔记

```ad-tip
"学习技巧"
1. 先理解原理
2. 再动手实践
3. 最后总结复盘
```

### 3. 项目文档

```ad-warning
"环境要求"
- Node.js 16+
- npm 8+
- Obsidian 1.0+
```

### 4. 问题记录

```ad-bug
"已知问题"
- 当前版本在某些情况下会出现渲染问题
- 解决方案：重启 Obsidian
```

### 5. 代码注释

```ad-example
"使用示例"
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
