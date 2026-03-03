---
tags:
  - skill
  - video
  - frames
created: 2026-03-03
创建时间: 2026-03-03T12:54
更新时间: 2026-03-04T00:00
---

# Video-Frames 视频帧提取技能

> 用 ffmpeg 提取视频帧

## 技能简介

使用 ffmpeg 从视频中提取单帧或创建缩略图。

## 功能

- 🎞️ 提取单帧
- 🖼️ 生成缩略图
- ⏱️ 指定时间戳
- 🎬 视频片段

## 安装

需要 ffmpeg：
```bash
# macOS
brew install ffmpeg

# Windows
choco install ffmpeg
```

## 使用方法

直接说：
- "提取这个视频的第10秒画面"
- "生成视频缩略图"

## 命令行

```bash
# 提取第一帧
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 output.jpg

# 指定时间戳
ffmpeg -i video.mp4 -ss 00:01:30 -vframes 1 frame.jpg
```

## 使用场景

- 视频预览图
- 关键帧提取
- 视频分析

## 相关技能

- [[Faster-Whisper-GPU]] - 视频转录
- [[Universal-Video-Downloader]] - 视频下载


---
相关链接: [[3.Resources]]
