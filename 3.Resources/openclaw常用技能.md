---
创建时间: 2026-02-18T08:36
更新时间: 2026-02-18T08:58
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
npx clawhub@latest install summarize
npx clawhub@latest install diagram-generator
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

### 📚 学习与生产工具

#### 📖 内容处理
- **`summarize`**: 文本摘要工具，快速提炼长文本的核心内容

#### 🎨 可视化生成
- **`diagram-generator`**: 图表生成器，自动创建流程图、思维导图等可视化内容

#### 🚀 技能学习
- **`ship-learn-next`**: 通过代理工具学习新技能（来自 softaworks/agent-toolkit）

## 使用建议

### 📋 安装检查
```bash
# 检查已安装的技能
npx clawhub@latest list
```

### 🔄 维护操作
1. **首次安装**：按顺序执行所有命令，确保依赖正确安装
2. **定期更新**：使用 `npx clawhub@latest update` 更新已安装的技能
3. **组合使用**：可以根据具体任务组合使用不同的技能

### 💡 最佳实践
- 先安装基础工具（obsidian、markdown-formatter），再安装高级功能
- 浏览器自动化技能建议在需要网络操作时再安装
- 定期检查技能更新，保持功能最新

## 参考资源

- OpenCLAW 官方文档：[https://openclaw.dev](https://openclaw.dev)
- GitHub仓库：https://github.com/openclaw-io/openclaw
- 技能市场：https://openclaw.dev/skills

## 常见问题 (FAQ)

### ❓ 安装失败怎么办？
- 检查网络连接
- 确保 Node.js 版本 >= 16.0.0
- 清除缓存后重试：`npx clawhub@latest clean`

### ❓ 如何卸载技能？
```bash
npx clawhub@latest uninstall <skill-name>
```

### ❓ 可以离线使用吗？
基础工具可以离线使用，需要联网下载的技能（如搜索、浏览器自动化）需要网络连接

## 📊 技能快速参考表

| 技能名称 | 分类 | 主要功能 | 系统要求 |
|---------|------|---------|---------|
| `markdown-formatter` | 基础工具 | 格式化Markdown | 低 |
| `obsidian` | 基础工具 | Obsidian集成 | 低 |
| `brave-search` | 搜索查询 | Brave搜索引擎 | 中 |
| `agent-browser` | 浏览器自动化 | 网页操作 | 高 |
| `personal-assistant` | 个人助手 | 智能助手 | 低 |
| `ship-learn-next` | 学习工具 | 技能学习 | 中 |
| `summarize` | 内容处理 | 文本摘要 | 低 |
| `diagram-generator` | 可视化 | 图表生成 | 中 |

---