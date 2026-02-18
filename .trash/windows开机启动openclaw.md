---
创建时间: 2026-02-18T11:53
更新时间: 2026-02-18T12:01
tags:
  - 教程
---
### pm2管理进程

```shell
pm2 start node --name openclaw-cn --D:\nodejs\node_global\node_modules\openclaw-cn\dist\index.js gateway
```

### 验证启动成功

```shell
pm2 status
# 应该显示 online
```

### 保存 PM2 进程列表
```shell
pm2 save
```

#### **测试服务是否正常**：  

浏览器访问 `http://127.0.0.1:18789/`

### 创建 Windows 计划任务实现开机自启

以**管理员身份**打开 PowerShell，执行以下命令（**请将 `你的OpenClaw项目路径` 替换为真实路径，如果 openclaw-cn 是全局安装，可以不设置 WorkingDirectory，但为了保险建议写上**）：

```powershell
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-WindowStyle Hidden -Command ""pm2 resurrect""" 

$Trigger = New-ScheduledTaskTrigger -AtLogOn
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -Hidden

Register-ScheduledTask -TaskName "OpenClaw-CN-Gateway" -Action $Action -Trigger $Trigger -Settings $Settings -Force
```

**说明**：

- `AtLogOn` 触发器：用户登录时启动，适合需要用户环境变量的场景。你也可以改用 `AtStartup`（系统启动时），但可能缺少用户环境变量，导致 pm2 命令找不到。
    
- 如果 `pm2` 命令不在系统 PATH 中，你可以将 `-Argument` 中的 `pm2 resurrect` 替换为 `C:\Users\你的用户名\AppData\Roaming\npm\pm2.cmd resurrect`（即 pm2.cmd 的绝对路径）。
    

---

### 测试并完成

- 手动启动计划任务测试：

powershell

```powershell
Start-ScheduledTask -TaskName "OpenClaw-CN-Gateway"
```

- 查看 PM2 进程是否已恢复：`pm2 status`
    
- 重启电脑，验证 openclaw-cn 是否自动在后台运行（可通过浏览器访问 `http://127.0.0.1:18789/` 确认）。