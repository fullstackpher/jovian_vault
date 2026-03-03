---
tags:
  - skill
  - feishu
  - doc
created: 2026-03-03
创建时间: 2026-03-03T12:42
更新时间: 2026-03-03T12:42
---

# Feishu-Doc 飞书文档技能

> 读取/创建/编辑飞书文档

## 技能简介

Feishu-Doc 支持读取和创建飞书文档、Wiki、表格、多维表格。

## 核心功能

| 功能 | 说明 |
|------|------|
| Read | 获取 Docs、Sheets、Bitable、Wiki 内容 |
| Create | 创建空白文档 |
| Write | 用 Markdown 覆盖文档内容 |
| Append | 追加 Markdown 到文档末尾 |
| Blocks | 操作特定块 |

## 重要提示

### 创建文档时
✅ 必须一次性写入内容，不能让用户看到空白文档

### 长文档处理
✅ 使用 Append 分段写入
❌ 不要一次 Write 整个长文档

## 使用方法

### 创建文档

直接说：
- "创建一个飞书文档，标题是xxx"
- "创建文档，内容是xxx"

### 读取文档

- 发送飞书文档链接给我
- 我会自动提取内容

## 相关技能

- [[Feishu-Messaging]] - 飞书消息
- [[Feishu-Bridge]] - 飞书桥接
- [[Feishu-Bitable]] - 飞书多维表格

## 配置

需要飞书应用权限：
- im:message
- im:chat


---
相关链接: [[3.Resources]]
