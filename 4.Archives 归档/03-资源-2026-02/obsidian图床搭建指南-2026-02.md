---
创建时间: 2026-01-15T19:48
更新时间: 2026-02-02T22:07
tags:
  - image-auto-upload
  - picgo
  - 图床
  - "#obsidian/plugin"
---

# Obsidian 图床搭建指南（PicGo + Image Auto Upload）

## 方案概述

本方案采用 **PicGo + Image Auto Upload Plugin** 的组合，是 Obsidian 社区中最成熟、兼容性最好的图床解决方案。

**工作流程：**
```
截图/粘贴图片 → Obsidian Image Auto Upload → PicGo 服务器 → 腾讯云COS → 返回URL
```

**优势：**
- 配置统一：图床配置在 PicGo 中管理，多个应用共享
- 稳定可靠：PicGo 历经多年迭代，稳定性好
- 扩展性强：PicGo 支持众多图床和插件
- 调试方便：PicGo 提供可视化上传界面和日志

---

## 第一步：安装 PicGo

### 下载地址
- **官网**：https://picgo.github.io/
- **GitHub**：https://github.com/Molunerfinn/PicGo/releases
- **Windows**：下载 `.exe` 安装包
- **macOS**：下载 `.dmg` 或通过 Homebrew: `brew install --cask picgo`
- **Linux**：下载 `.AppImage` 或通过 Snap: `snap install picgo`

### 安装完成后
1. 启动 PicGo
2. 首次运行会提示设置存储位置（可默认）
3. 确保 PicGo 在系统托盘中运行

---

## 第二步：配置 PicGo

### 2.1 腾讯云COS 配置（推荐）

#### 创建腾讯云 COS 存储桶
1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/)
2. 进入 **对象存储 COS**
3. 点击 **创建存储桶**
4. 配置如下：
   - **名称**：`your-bucket-name-1234567890`（全局唯一）
   - **地域**：**上海**（或选择你所在地区，速度更快）
   - **访问权限**：**公有读私有写**
   - **CDN 加速**：建议开启
5. 点击确定创建

#### 获取 API 密钥
1. 访问 [API 密钥管理](https://console.cloud.tencent.com/cam/capi)
2. 点击 **创建密钥**（如果还没有）
3. 记录以下信息：
   - `SecretId`
   - `SecretKey`

#### 在 PicGo 中配置
1. 打开 PicGo → **图床设置** → **腾讯云COS**
2. 填写配置：
   ```
   SecretId: [请填写您的腾讯云SecretId] 
   SecretKey: nOlwvjMtNlx1tY0FI8mFZigbQ276vYiw
   APPID: 1257905003
   存储桶名称: jovian-1257905003
   存储区域: ap-shanghai
   存储路径: picture/
   ```
   - 存储桶名称格式：`your-bucket-name-1234567890`（不带 `.cos.` 后缀）
   - 存储区域格式：`ap-shanghai`（如上海）
   - ⚠️COS版本：**必须设置为v5**

3. 点击 **确定** 保存

#### 开启 PicGo 服务器
1. PicGo → **设置** → **Server 设置**
2. 勾选 **允许上传后回调**
3. 端口号默认：`36677`
4. 点击 **确认**

#### 自定义 URL 格式（可选）
1. PicGo → **设置** → **自定义链接**
2. 选择 URL 格式为 `https://${domain}/${path}`
3. 或使用默认格式

#### PicGo配置手册

- [配置手册 \| PicGo 文档](https://docs.picgo.app/zh/gui/guide/config)

---

### 2.2 其他图床配置

#### 阿里云 OSS
1. PicGo → **图床设置** → **阿里云OSS**
2. 配置：
   ```
   AccessKey ID: LTAIxxxxxxxxxxxx
   AccessKey Secret: xxxxxxxxxxxxxxxxxx
   存储空间名称: your-bucket-name
   存储区域: oss-cn-shanghai
   ```
3. 存储空间名称格式：`your-bucket-name`（不带 `.aliyuncs.com`）

#### SM.MS（免费图床）
1. 注册 https://sm.ms/
2. 获取 API Token
3. PicGo → **图床设置** → **SM.MS**
4. 填写 Token 即可

#### GitHub 图床
1. 创建 GitHub Repository
2. 生成 Personal Access Token（Repo 权限）
3. PicGo → **图床设置** → **GitHub**
4. 配置：
   ```
   仓库名: username/repo-name
   Token: ghp_xxxxxxxxxxxx
   存储路径: images/
   ```

---

## 第三步：安装 Obsidian Image Auto Upload 插件

### 安装步骤
1. 打开 Obsidian 设置
2. 进入 **社区插件** → **浏览**
3. 搜索 **"Image Auto Upload"**
4. 点击 **安装** → **启用**

### 配置插件
1. Obsidian → **设置** → **Image Auto Upload**
2. **选择图床**：选择 **PicGo (GUI)** 或 **PicGo (CLI)**
3. **PicGo Server 地址**：`http://127.0.0.1:36677`
4. **上传超时时间**：建议设置为 30 秒
5. 高级设置（可选）：
   - `autoUpload`：自动上传开关
   - `showStatus`：显示上传状态
   - `localSettingFiles`：排除的文件列表

### 验证连接
1. 保持 PicGo 在后台运行
2. 复制一张图片到 Obsidian 笔记中
3. 如果配置正确，图片会自动上传并替换为远程链接

---

## 第四步：完整使用流程

### 方式一：粘贴上传
1. 截图或复制图片（`Ctrl + C`）
2. 在 Obsidian 笔记中粘贴（`Ctrl + V`）
3. 插件自动上传并替换为 URL

### 方式二：拖拽上传
1. 将图片文件拖入 Obsidian 笔记
2. 自动触发上传

### 方式三：手动上传
1. 右键点击图片 → **Upload Image**
2. 或使用命令面板：`Image Auto Upload: Upload`

### 方式四：批量上传已有图片
1. 打开包含本地图片的笔记
2. 命令面板运行：`Image Auto Upload: Upload All Images`
3. 批量上传所有本地图片

---

## 常见问题排查

### Q1: 上传失败，提示 "连接 PicGo 失败"
**解决方法：**
1. 确保 PicGo 已启动（在系统托盘中）
2. 检查 PicGo Server 是否开启
3. 检查端口是否正确（默认 36677）
4. 关闭防火墙或添加端口例外
5. 重启 PicGo 和 Obsidian

### Q2: 提示 "upload failed"
**排查步骤：**
1. 打开 PicGo 的 **日志**（PicGo → 日志）
2. 查看详细错误信息
3. 常见原因：
   - API 密钥错误
   - 存储桶名称格式不对
   - 存储区域不存在
   - 权限不足（确认存储桶为"公有读"）

### Q3: URL 返回格式不对
**解决方法：**
1. PicGo → **设置** → **自定义链接**
2. 根据需求选择格式
3. 或在 Obsidian 插件设置中调整 URL 前缀

### Q4: 上传速度慢
**优化建议：**
1. 选择最近的存储区域
2. 开启 CDN 加速
3. 压缩图片后再上传（PicGo 有图片压缩插件）

### Q5: 如何查看已上传的图片
1. PicGo → **相册** → **已上传**
2. 可查看历史记录和 URL

---

## 最佳实践

### 存储结构建议
```
attachments/
├── picture/        # 文章配图
├── avatar/         # 头像
└── screenshot/     # 截图
```

### PicGo 插件推荐
- **picgo-plugin-compress**：图片压缩
- **picgo-plugin-rename**：上传前重命名
- **picgo-plugin-github-plus**：增强 GitHub 图床

### 监控使用量
- 腾讯云 COS：每月免费 50GB 存储 + 10GB 流量
- 超额按量付费，建议设置费用警报

### 定期维护
- 导出 PicGo 配置备份
- 清理无效的 URL 链接
- 监控云存储费用

---

## 相关插件
- [[Pasted Image Naming]] - 自动命名粘贴的图片
- [[Local REST API]] - 远程管理图片
- [[Image Converter]] - 图片格式转换
- [[QuickAdd]] - 快速添加图片并自动上传

---

## 参考资源
- [PicGo 官方文档](https://picgo.github.io/)
- [PicGo GitHub](https://github.com/Molunerfinn/PicGo)
- [Image Auto Upload Plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin)
- [腾讯云 COS 文档](https://cloud.tencent.com/document/product/436)
- [阿里云 OSS 文档](https://help.aliyun.com/document_detail/32008.html)
- [【第63课】简简单单，来个图床。\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV19aXTYUE2q?vd_source=934db03c050de52de1bcb559703865cb)

---

## 使用示例

![示例图片](https://jovian-1257905003.cos.ap-shanghai.myqcloud.com/picture/summer.png)
