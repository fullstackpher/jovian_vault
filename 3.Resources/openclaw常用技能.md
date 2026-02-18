---
创建时间: 2026-02-18T08:36
更新时间: 2026-02-18T08:53
tags:
  - OpenCLAW
  - CLI工具
  - 技能安装
---

# OpenCLAW 常用技能安装指南

## 快速安装

```bash
# 一键安装所有推荐技能
npx clawhub@latest install brave-search
npx clawhub@latest install obsidian
npx clawhub@latest install markdown-formatter
npx clawhub@latest install agent-browser
npx clawhub@latest install personal-assistant
npx skills add git@github.com:softaworks/agent-toolkit.git --skill ship-learn-next
```

## 技能分类说明

### 📌 基础工具
- **`markdown-formatter`**: Markdown格式化工具，自动美化你的笔记格式
- **`obsidian`**: Obsidian集成工具，增强与Obsidian的交互能力

### 🔍 搜索与查询
- **`brave-search`**: 使用Brave搜索引擎进行智能查询和内容检索

### 🌐 浏览器自动化
- **`agent-browser`**: 浏览器代理工具，用于自动化网页操作和信息抓取

### 🤖 个人助手
- **`personal-assistant`**: 个人助理技能，提供智能助手功能

### 📚 学习工具
- **`ship-learn-next`**: 通过代理工具学习新技能（来自 softaworks/agent-toolkit）

- 

## 使用建议

1. **首次安装**：按顺序执行所有命令，确保依赖正确安装
2. **定期更新**：使用 `npx clawhub@latest update` 更新已安装的技能
3. **组合使用**：可以根据具体任务组合使用不同的技能

## 参考资源

- OpenCLAW 官方文档：[https://openclaw.dev](https://openclaw.dev)
- GitHub仓库：https://github.com/openclaw-io/openclaw