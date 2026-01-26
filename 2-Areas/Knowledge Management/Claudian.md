---
创建时间: 2026-01-26T14:32
更新时间: 2026-01-26T18:02
tags:
  - obsidian
---
### 安装

前提条件：

- 安装 [Node.js 18 或更新版本环境](https://nodejs.org/en/download/)。

- Windows 用户需安装 [Git for Windows](https://git-scm.com/download/win)。

在命令行界面，执行以下命令安装 Claude Code。

```
npm install -g @anthropic-ai/claude-code
```

安装结束后，执行以下命令查看

```
claude --version
```

### 配置

1. 在PowerShell中执行以下命令，设置环境变量。

```
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', 'ebf7f2d7-98b4-4a98-bcd4-504edc2b61dc', 'User')

[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://ark.cn-beijing.volces.com/api/coding', 'User')

[System.Environment]::SetEnvironmentVariable('ANTHROPIC_MODEL', 'ark-code-latest', 'User')
```

1. 在新的PowerShell窗口执行以下命令，检查环境变量是否生效。

```
echo $env:ANTHROPIC_AUTH_TOKEN
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_MODEL

```

### 安装Claudian插件


### 配置Claudian插件

配置环境变量

```
ANTHROPIC_API_KEY=sk-api-9MtsiOZnytU8wGTDvCgjgZq8k8bdVa8ZLveoFxe8TEnQcZSzR7HFYmnRbX0P-nIH6XXxK3vUcbeq8dxzlZegN7q_HX_K7aB71o-n-1LqlOVwq90a-KTFgdo
ANTHROPIC_BASE_URL=https://api.minimaxi.com/anthropic
ANTHROPIC_MODEL=MiniMax-M2.1
```