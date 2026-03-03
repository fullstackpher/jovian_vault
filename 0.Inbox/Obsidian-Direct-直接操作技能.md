---
tags:
  - skill
  - obsidian
created: 2026-03-03
创建时间: 2026-03-03T12:42
更新时间: 2026-03-03T12:42
---

# Obsidian-Direct 直接操作技能

> 直接读取/搜索你的 Obsidian 仓库

## 技能简介

Obsidian-Direct 可以直接操作你的 Obsidian 仓库，无需额外依赖。

## 你的仓库

**位置**: E:\obsidian\jovian_vault

## 环境要求

1. **Python**: 已通过 uv 管理
2. **ripgrep**: 已安装 (C:\Users\ALIENWARE\AppData\Local\Programs\rg.exe)

## 使用方法

直接对我说：
- "搜一下 AI 相关的笔记"
- "看看 1.Projects 里有什么"
- "给我读一下 xxx 笔记"
- "在 0.Inbox 创建一条笔记"

## 命令行用法

```bash
# 搜索笔记
uv run python obsidian_search.py "E:/obsidian/jovian_vault" "关键词" --limit 10

# 列出笔记
uv run python obsidian_cli.py --json list

# 读取笔记
uv run python obsidian_cli.py --json read "笔记名称"
```

## 仓库结构 (PARA)

- 0.Inbox - 收集箱
- 1.Projects - 项目
- 2.Areas - 领域
- 3.Resources - 资源
- 4.Archives - 归档
- 7.Daily - 每日笔记

## 相关技能

- [[Obsidian基础]] - obsidian-cli 版本
- [[mh-Obsidian]] - MantouHub 版本
