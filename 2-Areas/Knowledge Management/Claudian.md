---
创建时间: 2026-01-26T14:32
更新时间: 2026-01-26T18:39
tags:
  - obsidian
---
### 安装Claude Code Cli工具

前提条件：

- 安装 [Node.js 21 或更新版本环境](https://nodejs.org/en/download/)。

在命令行界面，执行以下命令安装 Claude Code。

```
npm install -g @anthropic-ai/claude-code
```

安装结束后，执行以下命令查看

```
claude --version
```

### 安装cc-switch

一键切换Claude、Codex、Gemini供应商配置

- [下载地址](https://github.com/farion1231/cc-switch/releases/tag/v3.10.2)

下载安装完启动，点开Claude选项，添加供应商，配置API-KEY


### 安装Claudian插件

- [官方地址](https://github.com/YishenTu/claudian)

1. 下载 `main.js`, `manifest.json`, 和 `styles.css` from the [最新版本](https://github.com/YishenTu/claudian/releases/latest)
2. 在obsidian库的

### 配置Claudian插件

配置环境变量

```
ANTHROPIC_API_KEY=sk-api-9MtsiOZnytU8wGTDvCgjgZq8k8bdVa8ZLveoFxe8TEnQcZSzR7HFYmnRbX0P-nIH6XXxK3vUcbeq8dxzlZegN7q_HX_K7aB71o-n-1LqlOVwq90a-KTFgdo
ANTHROPIC_BASE_URL=https://api.minimaxi.com/anthropic
ANTHROPIC_MODEL=MiniMax-M2.1
```

配置路径（必须配置）

```
D:\nodejs\node_global\node_modules\@anthropic-ai\claude-code\cli.js
```