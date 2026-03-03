---
tags:
  - skill
  - youtube
  - video
created: 2026-03-03
创建时间: 2026-03-03T12:54
更新时间: 2026-03-03T12:54
---

# YouTube-Watcher YouTube监控技能

> 获取 YouTube 视频 Transcript

## 技能简介

获取 YouTube 视频的文字稿，用于摘要、问答、内容提取。

## 功能

- 📹 获取视频 Transcript
- 💬 获取字幕
- 📝 内容摘要
- ❓ 问答

## 安装

需要 yt-dlp：
```bash
pip install yt-dlp
# 或
brew install yt-dlp
```

## 使用方法

直接说：
- "获取这个 YouTube 视频的字幕"
- "总结这个 YouTube 视频"
- "这个视频讲了什么"

## 命令行

```bash
python get_transcript.py "https://www.youtube.com/watch?v=VIDEO_ID"
```

## 使用场景

- 视频内容提取
- 学习笔记
- 内容策划
- 竞品分析

## 相关技能

- [[Summarize]] - 内容摘要
- [[Agent-Reach]] - 全网采集
- [[Faster-Whisper-GPU]] - 视频转录
