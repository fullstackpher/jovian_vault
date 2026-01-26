---
创建时间: 2026-01-26T14:32
更新时间: 2026-01-26T14:35
tags:
  - obsidian
---
### 安装



### 配置

1. 在PowerShell中执行以下命令，设置环境变量。

```shell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', '0fbea595-7e51-47c8-a674-7f53df9f55bb', 'User')

[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://ark.cn-beijing.volces.com/api/coding', 'User')

[System.Environment]::SetEnvironmentVariable('ANTHROPIC_MODEL', 'ark-code-latest', 'User')
```

1. 在新的PowerShell窗口执行以下命令，检查环境变量是否生效。

```shell
echo $env:ANTHROPIC_AUTH_TOKEN

echo $env:ANTHROPIC_BASE_URL

echo $env:ANTHROPIC_MODEL
```