---
tags:
  - skill
  - obsidian
created: 2026-03-03
创建时间: 2026-03-03T12:53
更新时间: 2026-03-03T12:53
---

# Obsidian 基础技能

> 通过 obsidian-cli 操作

## 技能简介

使用 obsidian-cli 命令行工具操作 Obsidian 仓库。

## 功能

- 搜索笔记
- 创建笔记
- 移动/重命名
- 删除笔记

## 环境要求

```bash
# macOS/Linux
brew install yakitrak/yakitrak/obsidian-cli

# 设置默认仓库
obsidian-cli set-default "vault-name"
```

## 常用命令

```bash
# 搜索
obsidian-cli search "query"
obsidian-cli search-content "query"

# 创建
obsidian-cli create "Folder/Note" --content "xxx"

# 移动
obsidian-cli move "old/path" "new/path"

# 删除
obsidian-cli delete "path/note"
```

## 优势

- 自动更新 Wikilinks
- 跨平台支持
- 简单易用

## 相关技能

- [[Obsidian-Direct]] - 直接操作（推荐 Windows）
- [[mh-Obsidian]] - MantouHub 版本


---
相关链接: [[3.Resources]]
