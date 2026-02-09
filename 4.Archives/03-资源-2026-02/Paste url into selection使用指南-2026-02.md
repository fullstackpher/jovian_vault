---
创建时间: 2026-01-25T19:28
更新时间: 2026-02-09T16:19
tags:
  - obsidian/plugin
---

### 插件简介

将复制的链接直接粘贴到选中的文本上，自动生成链接格式 `[选中文本](url)`。

### 使用方式

1. **复制链接**：从浏览器或其他应用复制 URL
2. **选中文本**：在笔记中用鼠标选中要作为链接文本的内容
3. **粘贴**：按 `Ctrl + V` (Windows/Linux) 或 `Cmd + V` (Mac)

> 📌 无需先粘贴再调整，插件会自动用选中的文本作为链接文字

### 使用场景

- **网页内容引用**：浏览网页时复制地址 → 选中笔记中的关键词 → 一键生成链接
- **文献引用**：选中标题 → 粘贴 DOI/文献链接
- **快速标注**：为已有文字快速添加超链接

### 效果示例

```markdown
# 粘贴前（选中"Obsidian"）
Obsidian

# 粘贴链接 https://obsidian.md 后
[Obsidian](https://obsidian.md)
```

### 注意事项

- 仅支持内部 Wiki 链接和外部 URL
- 选中内容不能包含换行符
- 多次粘贴会覆盖已有链接

### 参考资料

- [GitHub 官方仓库](https://github.com/denolehov/obsidian-url-into-selection)
- [Obsidian 插件市场](obsidian://plugins)