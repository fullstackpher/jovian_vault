---
创建时间: 2026-02-09T18:36
更新时间: 2026-02-09T18:43
---

# Git 命令速查手册

## 基础配置

### 初始化
```bash
git init                  # 初始化仓库
git clone <url>           # 克隆远程仓库
git clone <url> <dir>     # 克隆到指定目录
```

### 用户配置
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.editor vim
git config --list         # 查看所有配置
git config user.name      # 查看特定配置
```

### 忽略文件
```bash
# .gitignore 文件示例
node_modules/
*.log
.env
.DS_Store
build/
dist/
```

## 查看状态

### 基本查看
```bash
git status                # 查看工作区状态
git status -s             # 简洁输出
git status -b             # 显示分支信息
```

### 查看差异
```bash
git diff                  # 查看工作区与暂存区的差异
git diff --staged         # 查看暂存区与上一次提交的差异
git diff HEAD             # 查看工作区与上一次提交的差异
git diff branch1 branch2  # 比较两个分支的差异
git diff --name-only      # 只显示改变的文件名
```

### 查看历史
```bash
git log                   # 查看提交历史
git log --oneline         # 单行显示
git log --graph           # 图形化显示
git log --oneline -10     # 显示最近10条
git log --author="name"   # 按作者筛选
git log --since="1 week ago"  # 查看一周内的提交
git show                  # 查看最新提交详情
git show <commit-hash>   # 查看指定提交
git show <commit>:<file> # 查看指定提交的文件内容
```

## 文件操作

### 添加到暂存区
```bash
git add file.txt          # 添加单个文件
git add .                 # 添加所有文件
git add *.js              # 添加所有js文件
git add -A                # 添加所有修改（包括删除）
git add -u                # 只添加已跟踪文件的修改
```

### 提交
```bash
git commit -m "message"   # 提交并添加消息
git commit -am "message"   # 添加已跟踪文件并提交
git commit --amend        # 修改最后一次提交
git commit --amend -m "new message"  # 修改最后一次提交消息
```

### 撤销操作
```bash
git restore file.txt      # 恢复工作区文件到暂存区状态
git restore --staged file.txt  # 取消暂存
git reset HEAD file.txt   # 取消暂存（同上）
git reset --soft HEAD~1   # 撤销最后一次提交，保留更改
git reset --mixed HEAD~1  # 撤销最后一次提交，取消暂存
git reset --hard HEAD~1   # 撤销最后一次提交，丢弃更改
git checkout -- file.txt  # 恢复文件到上次提交（旧命令）
git checkout HEAD~1 file.txt  # 恢复文件到上上次提交
```

### 删除文件
```bash
git rm file.txt           # 删除文件并加入暂存区
git rm --cached file.txt  # 只从Git中删除，保留本地文件
```

## 分支管理

### 查看分支
```bash
git branch                # 查看本地分支
git branch -r             # 查看远程分支
git branch -a             # 查看所有分支
git branch -v             # 查看分支及其最新提交
```

### 创建/删除分支
```bash
git branch <branch-name>      # 创建分支
git branch -d <branch-name>   # 删除分支（已合并）
git branch -D <branch-name>   # 强制删除分支
git checkout -b <branch-name> # 创建并切换分支
```

### 切换分支
```bash
git checkout <branch-name>    # 切换分支
git switch <branch-name>     # 切换分支（新命令）
git switch -c <branch-name>  # 创建并切换分支
git switch -                 # 切换到上一个分支
```

### 重命名分支
```bash
git branch -m <old-name> <new-name>  # 重命名分支
git branch -m <new-name>             # 重命名当前分支
```

### 合并分支
```bash
git merge <branch-name>     # 合并分支到当前分支
git merge --no-ff <branch>  # 不使用快进合并，保留历史
git merge --abort           # 取消合并
```

### 变基
```bash
git rebase <branch-name>    # 变基到指定分支
git rebase -i HEAD~3        # 交互式变基最近3次提交
git rebase --continue       # 继续变基
git rebase --abort          # 取消变基
```

## 远程仓库

### 查看远程
```bash
git remote -v              # 查看远程仓库
git remote show origin     # 查看远程仓库详情
```

### 添加/删除远程
```bash
git remote add origin <url>   # 添加远程仓库
git remote remove origin      # 删除远程仓库
git remote rename origin upstream  # 重命名远程仓库
```

### 获取/拉取
```bash
git fetch                 # 获取远程更新但不合并
git fetch origin          # 获取指定远程仓库
git pull                  # 拉取并合并
git pull --rebase          # 拉取并变基
git pull origin main      # 拉取远程main分支
```

### 推送
```bash
git push                  # 推送到当前分支
git push origin main      # 推送到远程main分支
git push -u origin main   # 推送并设置上游分支
git push --all            # 推送所有分支
git push --delete origin <branch>  # 删除远程分支
```

### 比较本地与远程
```bash
git log origin/main..HEAD          # 查看本地未推送的提交
git log HEAD..origin/main          # 查看远程未拉取的提交
```

## 暂存工作

### 暂存当前工作
```bash
git stash                 # 暂存当前工作
git stash save "message"  # 暂存并添加描述
git stash -u              # 暂存包括未跟踪文件
```

### 查看暂存列表
```bash
git stash list            # 查看暂存列表
```

### 应用暂存
```bash
git stash apply           # 应用暂存但不删除
git stash pop             # 应用暂存并删除
git stash apply stash@{0} # 应用指定暂存
git stash drop            # 删除最新暂存
git stash drop stash@{0}  # 删除指定暂存
git stash clear           # 清空所有暂存
```

## 标签管理

### 创建标签
```bash
git tag v1.0.0                    # 创建轻量标签
git tag -a v1.0.0 -m "message"   # 创建附注标签
git tag -a v1.0.0 <commit-hash>  # 为指定提交创建标签
```

### 查看标签
```bash
git tag                          # 列出所有标签
git show v1.0.0                  # 查看标签详情
git tag -n                       # 列出标签及描述
```

### 删除标签
```bash
git tag -d v1.0.0                # 删除本地标签
git push origin --delete v1.0.0 # 删除远程标签
```

### 推送标签
```bash
git push origin v1.0.0           # 推送单个标签
git push origin --tags           # 推送所有标签
```

## 变更历史

### 查看文件历史
```bash
git log -p file.txt       # 查看文件修改历史
git log --follow file.txt # 查看文件历史（包括重命名）
git blame file.txt        # 查看每一行的修改者
```

### 查找提交
```bash
git log --grep="keyword"  # 按提交消息搜索
git log --all --grep="keyword"  # 在所有分支中搜索
git log -S "text"         # 按文件内容变化搜索
git log --author="name"   # 按作者搜索
```

### 查找引入bug的提交
```bash
git bisect start          # 开始二分查找
git bisect bad            # 标记当前提交为有问题
git bisect good <commit>  # 标记某个提交为正常
git bisect reset          # 重置二分查找
```

## 子模块

### 添加子模块
```bash
git submodule add <url>   # 添加子模块
git submodule add <url> <path>  # 添加子模块到指定路径
```

### 克隆带子模块的仓库
```bash
git clone --recursive <url>  # 克隆包含子模块的仓库
```

### 更新子模块
```bash
git submodule init         # 初始化子模块
git submodule update        # 更新子模块
git submodule update --remote  # 更新到远程最新版本
git submodule foreach git pull  # 更新所有子模块
```

## 常用工作流程

### 标准提交流程
```bash
git pull --rebase          # 拉取最新代码
git add .                  # 添加更改
git commit -m "message"    # 提交
git push                   # 推送
```

### 修复错误提交
```bash
git reset --soft HEAD~1     # 撤销最后提交
git add .                  # 重新添加
git commit -m "correct message"  # 重新提交
git push --force           # 强制推送（谨慎使用）
```

### 分支开发流程
```bash
git checkout -b feature/new-feature  # 创建功能分支
# ... 进行开发 ...
git add .
git commit -m "add new feature"
git checkout main          # 切回主分支
git pull                   # 更新主分支
git merge feature/new-feature  # 合并功能分支
git push                   # 推送
git branch -d feature/new-feature  # 删除功能分支
```

### 从stash恢复特定文件
```bash
git stash show -p stash@{0} > changes.patch  # 导出暂存为patch
git apply changes.patch                   # 应用patch
```

## 压缩历史

### 压缩多个提交为一个
```bash
git rebase -i HEAD~3      # 交互式变基最近3次提交
# 在编辑器中将后两个提交的pick改为squash或s
# 保存并编辑提交消息
```

### 压缩整个分支历史
```bash
git checkout main
git merge --squash feature-branch  # 压缩合并
git commit -m "feature summary"     # 一次性提交
```

## 解决冲突

### 查看冲突
```bash
git status                # 查看冲突文件
git diff                 # 查看具体冲突
```

### 解决冲突
```bash
# 编辑冲突文件，解决冲突标记 <<<<<<< >>>>>>>
git add <resolved-file>  # 标记为已解决
git commit                # 完成合并
```

### 使用工具解决
```bash
git mergetool             # 使用配置的合并工具
```

## 清理

### 清理未跟踪文件
```bash
git clean                 # 删除未跟踪文件
git clean -f              # 强制删除
git clean -fd             # 删除未跟踪文件和目录
git clean -n              # 预览将要删除的文件
```

### 清理远程分支
```bash
git remote prune origin   # 清理远程已删除的分支
git fetch -p              # fetch并自动清理
```

## 高级技巧

### 查看某次提交引入了什么
```bash
git show <commit>         # 查看提交详情
git show <commit>:file    # 查看提交时的文件
```

### 查找特定内容在哪个提交
```bash
git log -S "search text" --all
```

### 查看某个文件的演变
```bash
git log -p --follow file.txt
```

### 保存工作区的临时状态
```bash
git stash push -m "work in progress" file1 file2  # 只暂存特定文件
```

### 撤销文件的特定行
```bash
git checkout -p file.txt  # 交互式选择要撤销的块
```

### 查看Git配置
```bash
git config --list --show-origin  # 查看配置及其来源
```

## 常见问题

### 撤销已推送的提交
```bash
git revert <commit>       # 创建新提交撤销旧提交（推荐）
git reset --hard <commit> && git push --force  # 危险操作
```

### 提交时忘记添加文件
```bash
git commit -m "initial"
git add forgotten_file
git commit --amend --no-edit  # 修改上一次提交
```

### 查看暂存区与工作区的差异
```bash
git diff HEAD
```

### 查看远程仓库的默认分支
```bash
git symbolic-ref refs/remotes/origin/HEAD
```
