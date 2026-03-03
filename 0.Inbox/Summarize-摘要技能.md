---
tags:
  - skill
  - summarize
created: 2026-03-03
创建时间: 2026-03-03T12:44
更新时间: 2026-03-03T12:44
---

# Summarize 摘要技能

> 快速摘要 URL/文件/视频

## 技能简介

用 summarize CLI 快速提取网页、PDF、视频的内容摘要。

## 支持类型

| 类型 | 说明 |
|------|------|
| 网页 | URL 链接 |
| PDF | PDF 文档 |
| 图片 | 图片分析 |
| 音频 | 音频转文字 |
| YouTube | 视频 |

## 使用方法

直接说：
- "总结这个链接"
- "摘要这个PDF"
- "这个视频讲了什么"

## 命令行

```bash
# 网页摘要
summarize "https://example.com"

# PDF 摘要
summarize "/path/to/file.pdf"

# YouTube 视频
summarize "https://youtu.be/xxx" --youtube auto
```

## 参数

| 参数 | 说明 |
|------|------|
| --model | 指定模型 |
| --length | 长度 (short/medium/long) |
| --extract-only | 仅提取 |

## 配置

需要 API Key：
- OPENAI_API_KEY
- 或 ANTHROPIC_API_KEY
- 或 GEMINI_API_KEY

## 相关技能

- [[Agent-Reach]] - 内容采集
- [[YouTube-Watcher]] - YouTube 专用
