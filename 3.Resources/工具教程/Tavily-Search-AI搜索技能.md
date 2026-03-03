---
tags:
  - skill
  - tavily
  - search
created: 2026-03-03
创建时间: 2026-03-03T12:42
更新时间: 2026-03-03T23:59
---

# Tavily-Search AI搜索技能

> AI优化的网页搜索

## 技能简介

Tavily 是专为 AI 设计的搜索引擎，返回简洁、相关的内容。

## 使用方法

直接说：
- "搜索 xxx"
- "帮我查一下 xxx"

## 命令行用法

```bash
# 基础搜索
node scripts/search.mjs "关键词"

# 指定数量
node scripts/search.mjs "关键词" -n 10

# 深度搜索
node scripts/search.mjs "关键词" --deep

# 新闻搜索
node scripts/search.mjs "关键词" --topic news
```

## 参数说明

| 参数 | 说明 |
|------|------|
| -n | 结果数量 (默认5, 最大20) |
| --deep | 深度搜索，更全面 |
| --topic | 话题 (general/news) |
| --days | 新闻时间范围(天数) |

## 配置

需要环境变量：
- TAVILY_API_KEY

## 相关技能

- [[Brave-Search]] - Brave 搜索
- [[Agent-Reach]] - 全网内容采集


---
相关链接: [[3.Resources]]
