---
tags:
  - skill
  - video
  - whisper
created: 2026-03-03
创建时间: 2026-03-03T12:42
更新时间: 2026-03-03T23:58
---

# Faster-Whisper-GPU 视频转录技能

> 本地GPU加速语音转文字

## 技能简介

使用 Faster Whisper 进行本地 GPU 加速的视频/音频转录，保护隐私。

## 功能特点

- 🏠 **本地运行** - 数据不离开你的电脑
- ⚡ **GPU加速** - NVIDIA CUDA 加速
- 🔒 **隐私安全** - 无需上传到第三方

## 使用场景

- 视频字幕提取
- 会议录音转文字
- 播客转录

## 环境要求

- Python 3.x
- CUDA (NVIDIA GPU)
- faster-whisper 包

## 命令行用法

```bash
# 转录视频
python faster_whisper_gpu.py video.mp4

# 指定模型
python faster_whisper_gpu.py video.mp4 --model large

# 输出格式
python faster_whisper_gpu.py video.mp4 --output_format srt
```

## 模型选择

| 模型 | 大小 | 速度 | 精度 |
|------|------|------|------|
| tiny | 39M | 最快 | 较低 |
| base | 74M | 快 | 中 |
| small | 244M | 中 | 中 |
| medium | 769M | 较慢 | 高 |
| large | 1550M | 慢 | 最高 |

## 相关技能

- [[YouTube-Watcher]] - YouTube Transcript
- [[Video-Frames]] - 视频帧提取
- [[Universal-Video-Downloader]] - 视频下载


---
相关链接: [[3.Resources]]
