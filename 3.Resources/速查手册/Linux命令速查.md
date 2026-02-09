---
创建时间: 2026-02-09T18:36
更新时间: 2026-02-09T18:40
---

# Linux 命令速查手册

## 文件操作

### 查看文件
```bash
ls              # 列出当前目录文件
ls -la          # 列出所有文件（包括隐藏文件），显示详细信息
ls -lh          # 以人类可读格式显示文件大小
ls -R           # 递归列出所有子目录
tree            # 以树形结构显示目录（需要安装tree包）
```

### 查看文件内容
```bash
cat filename    # 查看整个文件内容
less filename   # 分页查看文件（可上下滚动）
more filename   # 分页查看文件（只能向下滚动）
head -n 10 file # 查看文件前10行
tail -n 10 file # 查看文件后10行
tail -f logfile # 实时查看文件更新（常用查看日志）
```

### 编辑文件
```bash
nano filename   # 简单易用的文本编辑器
vim filename    # 强大的文本编辑器
vi filename     # vim的简化版
```

### 创建/删除文件
```bash
touch filename  # 创建空文件
rm filename     # 删除文件
rm -f filename  # 强制删除（不提示）
rm -rf dir      # 强制递归删除目录（危险命令，谨慎使用）
```

### 复制/移动文件
```bash
cp src dst      # 复制文件
cp -r src dst   # 复制目录（递归）
cp -p src dst   # 复制时保留文件属性
mv src dst      # 移动/重命名文件或目录
```

## 目录操作

### 导航
```bash
pwd             # 显示当前目录路径
cd /path        # 切换到指定目录
cd ~            # 切换到用户主目录
cd -            # 切换到上一个目录
cd ..           # 返回上一级目录
```

### 创建目录
```bash
mkdir dir       # 创建目录
mkdir -p dir1/dir2  # 递归创建多级目录
```

### 删除目录
```bash
rmdir dir       # 删除空目录
rm -r dir       # 删除目录及其内容
rm -rf dir      # 强制删除目录及其内容（不提示）
```

## 权限管理

### 查看权限
```bash
ls -la filename # 查看文件权限和属性
stat filename   # 查看详细文件信息
```

### 修改权限
```bash
chmod +x script.sh   # 添加执行权限
chmod 755 file       # 设置权限：所有者rwx，组和其他用户r-x
chmod 644 file       # 设置权限：所有者rw-，组和其他用户r--
chmod -R 755 dir     # 递归修改目录权限
```

### 权限数字对照
- `4` = 读 (r)
- `2` = 写 (w)
- `1` = 执行 (x)

### 修改所有者
```bash
chown user:group file    # 修改文件所有者和组
chown -R user:group dir  # 递归修改目录
chown user file          # 只修改所有者
```

## 搜索与查找

### 查找文件
```bash
find /path -name "filename"    # 按名称查找
find /path -type f -name "*.log"  # 查找所有.log文件
find /path -type d -name "dir*"   # 查找目录
find /path -size +100M           # 查找大于100MB的文件
find /path -mtime -7             # 查找7天内修改过的文件
find /path -perm +x              # 查找可执行文件
```

### 搜索文件内容
```bash
grep "pattern" file          # 在文件中搜索模式
grep -r "pattern" /path      # 递归搜索目录
grep -i "pattern" file       # 忽略大小写
grep -n "pattern" file       # 显示行号
grep -v "pattern" file       # 显示不匹配的行
grep -E "pattern1|pattern2" # 正则表达式，匹配多个模式
```

### 定位命令
```bash
which command    # 查找命令所在路径
whereis command  # 查找命令、源文件和手册页
```

## 系统信息

### 系统概况
```bash
uname -a         # 显示系统详细信息
uname -r         # 显示内核版本
hostname         # 显示主机名
arch             # 显示系统架构（x86_64等）
```

### CPU和内存
```bash
top             # 实时显示系统进程
htop            # 更友好的进程查看器（需要安装）
free -h         # 查看内存使用（人类可读格式）
lscpu           # 查看 CPU 信息
```

### 磁盘信息
```bash
df -h           # 查看磁盘使用情况
du -sh /path    # 查看目录大小
du -h --max-depth=1 /path  # 查看各子目录大小
fdisk -l        # 查看磁盘分区
```

## 进程管理

### 查看进程
```bash
ps aux          # 查看所有进程
ps -ef          # 查看进程树
ps aux | grep name  # 搜索特定进程
```

### 管理进程
```bash
kill PID        # 终止进程（优雅终止）
kill -9 PID     # 强制终止进程
killall name    # 按名称终止所有匹配进程
pkill pattern   # 按模式匹配终止进程
```

### 后台运行
```bash
command &       # 后台运行命令
nohup command & # 后台运行，忽略挂起信号
jobs            # 查看当前shell的后台任务
fg %1           # 将任务1调至前台
bg %1           # 将任务1调至后台
Ctrl+Z          # 暂停当前任务
Ctrl+C          # 终止当前任务
```

## 网络管理

### 查看网络
```bash
ifconfig        # 查看/配置网络接口（需要net-tools）
ip addr         # 查看网络接口（现代方式）
ip a            # ip addr的简写
```

### 网络连接
```bash
netstat -tuln   # 查看监听端口
netstat -anp    # 查看所有连接
ss -tuln        # 现代替代netstat
lsof -i :port   # 查看占用指定端口的进程
```

### 网络测试
```bash
ping host       # 测试网络连通性
ping -c 4 host  # 只ping 4次
traceroute host # 跟踪路由
nslookup domain # DNS查询
dig domain      # 更强大的DNS查询
curl url        # 下载/请求URL
wget url        # 下载文件
```

### 防火墙
```bash
iptables -L     # 查看iptables规则
ufw status      # Ubuntu防火墙状态
ufw allow port  # 允许端口
ufw deny port   # 拒绝端口
```

## 压缩与解压

### tar（最常用）
```bash
tar -czvf archive.tar.gz /path  # 压缩
tar -xzvf archive.tar.gz         # 解压
tar -xzvf archive.tar.gz -C /target  # 解压到指定目录
tar -tzvf archive.tar.gz         # 查看压缩包内容（不解压）
```
- `c` = create（创建）
- `x` = extract（提取）
- `z` = gzip（使用gzip压缩）
- `v` = verbose（显示过程）
- `f` = file（指定文件名）

### zip/unzip
```bash
zip -r archive.zip /path   # 压缩目录
unzip archive.zip          # 解压
unzip -l archive.zip       # 查看内容
```

### gzip
```bash
gzip file       # 压缩文件（删除原文件）
gzip -d file.gz # 解压
gunzip file.gz  # 解压
gzip -c file > file.gz  # 压缩但保留原文件
```

## 用户管理

### 用户操作
```bash
whoami          # 显示当前用户名
id              # 显示用户ID和组信息
who             # 显示登录用户
w               # 显示登录用户和活动
```

### 切换用户
```bash
su - user       # 切换到user用户（并加载环境变量）
sudo command    # 以root权限执行命令
```

## 环境变量

### 查看/设置
```bash
echo $PATH      # 查看环境变量
export VAR=value  # 设置环境变量
env             # 显示所有环境变量
printenv        # 显示所有环境变量
```

### 持久化配置
```bash
# 添加到 ~/.bashrc 或 ~/.bash_profile
export PATH=$PATH:/new/path
```

## SSH连接

### 基本连接
```bash
ssh user@host               # 连接远程主机
ssh -p port user@host       # 指定端口
ssh -i key.pem user@host    # 使用密钥认证
```

### 密钥管理
```bash
ssh-keygen -t rsa -b 4096   # 生成SSH密钥
ssh-copy-id user@host       # 复制公钥到远程主机
cat ~/.ssh/id_rsa.pub       # 查看公钥
```

## 日志查看

### 系统日志
```bash
journalctl                  # 查看systemd日志
journalctl -u service       # 查看特定服务日志
journalctl -f               # 实时查看日志
journalctl --since "1 hour ago"  # 查看最近1小时的日志
```

### 应用日志
```bash
/var/log/syslog             # 系统日志
/var/log/auth.log           # 认证日志
/var/log/nginx/             # Nginx日志目录
```

## 包管理

### Debian/Ubuntu (apt)
```bash
apt update                  # 更新包列表
apt upgrade                 # 升级所有包
apt install package         # 安装包
apt remove package          # 删除包
apt search keyword          # 搜索包
apt show package            # 显示包信息
apt-cache depends package   # 查看依赖
```

### CentOS/RHEL (yum/dnf)
```bash
yum install package         # 安装包
yum remove package          # 删除包
yum update                  # 更新所有包
yum search keyword          # 搜索包
```

## 其他实用命令

### 管道和重定向
```bash
command | command2          # 管道，将前一个命令的输出作为后一个命令的输入
command > file              # 输出重定向到文件（覆盖）
command >> file             # 输出追加到文件
command < file              # 从文件读取输入
```

### 历史命令
```bash
history                     # 查看命令历史
!n                          # 执行历史中第n条命令
!!                          # 执行上一条命令
Ctrl+R                      # 搜索历史命令
```

### 别名
```bash
alias ll='ls -la'           # 创建别名
unalias ll                  # 删除别名
```

### 后台服务
```bash
systemctl start service    # 启动服务
systemctl stop service     # 停止服务
systemctl restart service  # 重启服务
systemctl status service   # 查看服务状态
systemctl enable service   # 开机自启
systemctl disable service  # 取消开机自启
```

## 常用快捷键

- `Ctrl+A` - 光标移到行首
- `Ctrl+E` - 光标移到行尾
- `Ctrl+U` - 删除光标到行首
- `Ctrl+K` - 删除光标到行尾
- `Ctrl+W` - 删除光标前一个单词
- `Ctrl+L` - 清屏（相当于clear）
- `Ctrl+C` - 中断当前命令
- `Ctrl+Z` - 挂起当前命令
- `Ctrl+D` - 退出当前shell

## 性能分析

```bash
top                         # 实时进程和资源使用
htop                        # 交互式进程查看器
iostat                      # I/O统计
vmstat                      # 虚拟内存统计
sar                         # 系统活动报告
```
