---
tags:
  - skill
  - video
  - downloader
created: 2026-03-03
创建时间: 2026-03-03T12:54
更新时间: 2026-03-03T12:54
---

# Universal-Video-Downloader 通用视频下载技能

> 下载各种平台视频

## 技能简介

通用视频下载工具，支持多种平台。

## 支持平台

| 平台 | 状态 |
|------|------|
| YouTube | ✅ |
| B站 | ✅ |
| 小红书 | ✅ |
| Twitter | ✅ |
|抖音 | ✅ |
| 更多 | 🔄 |

## 功能

- 🎬 视频下载
- 🎵 音频提取
- 🖼️ 缩略图
- 📝 元数据

## 安装

依赖 yt-dlp：
```bash
pip install yt-dlp
```

## 使用方法

直接说：
- "下载这个视频"
- "提取这个视频的音频"

## 常用命令

```bash
# 下载视频
yt-dlp "URL"

# 仅音频
yt-dlp -x "URL"

# 指定格式
yt-dlp -f best "URL"
```

## 相关技能

- [[YouTube-Watcher]] - YouTube 专用
- [[Agent-Reach]] - 内容采集
- [[Video-Frames]] - 视频帧提取
