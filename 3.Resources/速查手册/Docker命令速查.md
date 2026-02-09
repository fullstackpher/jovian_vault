---
创建时间: 2026-02-09T18:36
更新时间: 2026-02-09T18:44
---

# Docker 命令速查手册

## 基础命令

### 版本信息
```bash
docker --version          # 查看Docker版本
docker version            # 查看详细版本信息
docker info               # 查看Docker系统信息
```

### 帮助
```bash
docker --help              # 查看帮助信息
docker <command> --help    # 查看具体命令帮助
```

## 镜像操作

### 查找镜像
```bash
docker search <image>      # 搜索镜像
docker search --limit 5 nginx  # 限制搜索结果数量
```

### 拉取镜像
```bash
docker pull <image>               # 拉取最新版本镜像
docker pull nginx:1.21            # 拉取指定版本镜像
docker pull registry.cn-hangzhou.aliyuncs.com/library/nginx  # 从阿里云拉取
```

### 查看镜像
```bash
docker images             # 列出所有镜像
docker images -a          # 列出所有镜像（包括中间层）
docker images -q          # 只显示镜像ID
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"  # 格式化输出
```

### 构建镜像
```bash
docker build -t <name>:<tag> .      # 构建镜像（当前目录）
docker build -t myapp:v1 .          # 构建并打标签
docker build -f Dockerfile.prod .   # 使用指定的Dockerfile
docker build --no-cache .           # 不使用缓存构建
docker build --build-arg APP_ENV=prod .  # 传递构建参数
```

### 删除镜像
```bash
docker rmi <image>                  # 删除镜像
docker rmi <image-id>               # 通过ID删除
docker rmi nginx:1.21               # 删除指定版本
docker rmi -f <image>               # 强制删除
docker rmi $(docker images -q)      # 删除所有镜像（危险）
docker image prune                  # 删除未使用的镜像
docker image prune -a               # 删除所有未使用的镜像
```

### 导出/导入镜像
```bash
docker save -o image.tar <image>   # 导出镜像为tar文件
docker load -i image.tar             # 从tar文件导入镜像
docker export <container> > file.tar  # 导出容器为tar文件
docker import file.tar <image>      # 从tar文件导入镜像
```

### 查看镜像详细信息
```bash
docker inspect <image>              # 查看镜像详细信息
docker history <image>              # 查看镜像构建历史
```

## 容器操作

### 运行容器
```bash
docker run <image>                           # 运行容器
docker run -d <image>                        # 后台运行
docker run --name mycontainer <image>        # 指定容器名称
docker run -p 8080:80 <image>                # 端口映射（主机:容器）
docker run -p 80:80 -p 443:443 <image>       # 映射多个端口
docker run -v /host/path:/container/path <image>  # 挂载卷
docker run -v volume-name:/container/path <image>  # 使用命名卷
docker run -e KEY=value <image>              # 设置环境变量
docker run -e KEY=value -e KEY2=value2 <image>  # 设置多个环境变量
docker run --env-file .env <image>           # 从文件读取环境变量
docker run --restart always <image>          # 设置重启策略
docker run --restart unless-stopped <image> # 除非手动停止否则自动重启
docker run --network mynetwork <image>       # 指定网络
docker run --rm <image>                      # 容器退出后自动删除
docker run -it <image> /bin/bash             # 交互式运行
```

### 查看容器
```bash
docker ps                     # 查看运行中的容器
docker ps -a                   # 查看所有容器（包括停止的）
docker ps -q                   # 只显示容器ID
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"  # 格式化输出
docker ps --filter "status=exited"  # 按状态过滤
docker ps --filter "name=mycontainer"  # 按名称过滤
```

### 容器管理
```bash
docker start <container>      # 启动容器
docker stop <container>       # 停止容器
docker restart <container>    # 重启容器
docker pause <container>      # 暂停容器
docker unpause <container>    # 恢复暂停的容器
docker kill <container>       # 强制停止容器
docker rm <container>         # 删除容器
docker rm -f <container>      # 强制删除运行中的容器
docker rm $(docker ps -aq)    # 删除所有容器（危险）
docker container prune        # 删除所有停止的容器
```

### 容器交互
```bash
docker exec -it <container> /bin/bash  # 进入容器终端
docker attach <container>              # 附加到容器
docker exec <container> ls /app        # 在容器中执行命令
docker cp local_file <container>:/path  # 复制文件到容器
docker cp <container>:/path local_file  # 从容器复制文件
```

### 查看容器日志
```bash
docker logs <container>                # 查看容器日志
docker logs -f <container>             # 实时查看日志
docker logs --tail 100 <container>     # 查看最后100行
docker logs --since 1h <container>     # 查看最近1小时的日志
docker logs -t <container>             # 显示时间戳
```

### 查看容器信息
```bash
docker inspect <container>             # 查看容器详细信息
docker inspect -f '{{.State.Running}}' <container>  # 获取特定信息
docker inspect --format='{{.NetworkSettings.IPAddress}}' <container>  # 获取IP地址
docker top <container>                 # 查看容器进程
docker stats <container>               # 查看容器资源使用
docker stats                           # 查看所有容器实时统计
```

### 容器资源限制
```bash
docker run --cpus="1.5" <image>        # 限制CPU使用
docker run --memory="512m" <image>     # 限制内存
docker run --memory-swap="1g" <image>  # 限制交换空间
docker run --memory-reservation="256m" <image>  # 软限制内存
```

## 卷管理

### 创建/删除卷
```bash
docker volume create myvolume          # 创建命名卷
docker volume ls                       # 列出所有卷
docker volume inspect myvolume        # 查看卷详情
docker volume rm myvolume             # 删除卷
docker volume prune                   # 删除未使用的卷
```

### 使用卷
```bash
docker run -v myvolume:/data <image>           # 使用命名卷
docker run -v /path/on/host:/path/in/container <image>  # 使用绑定挂载
docker run --mount source=myvolume,target=/data <image>   # --mount语法
docker run --mount type=bind,source=/host/path,target=/container/path <image>
```

## 网络管理

### 查看网络
```bash
docker network ls              # 列出所有网络
docker network inspect <network>  # 查看网络详情
```

### 创建网络
```bash
docker network create mynetwork              # 创建网络
docker network create --driver bridge mynet   # 指定驱动
docker network create --subnet=172.18.0.0/16 mynet  # 指定子网
```

### 连接容器到网络
```bash
docker network connect mynetwork container1  # 连接容器到网络
docker network disconnect mynetwork container1  # 断开连接
```

### 删除网络
```bash
docker network rm mynetwork     # 删除网络
docker network prune            # 删除未使用的网络
```

## Docker Compose

### 基本操作
```bash
docker-compose up                    # 启动服务
docker-compose up -d                 # 后台启动
docker-compose down                 # 停止并删除容器
docker-compose down -v               # 停止并删除容器和卷
docker-compose start <service>       # 启动指定服务
docker-compose stop <service>        # 停止指定服务
docker-compose restart <service>     # 重启服务
docker-compose ps                    # 查看服务状态
docker-compose logs <service>        # 查看服务日志
docker-compose logs -f <service>     # 实时查看日志
```

### 构建相关
```bash
docker-compose build                # 构建服务
docker-compose build --no-cache      # 不使用缓存构建
docker-compose up --build            # 构建并启动
```

### 其他操作
```bash
docker-compose exec <service> <command>      # 在服务中执行命令
docker-compose exec -it web bash              # 进入服务终端
docker-compose pull                            # 拉取服务镜像
docker-compose rm                              # 删除停止的容器
docker-compose config                          # 验证并查看配置
docker-compose top                             # 查看运行进程
```

## Dockerfile 指令

### 基本指令
```dockerfile
FROM <image>               # 基础镜像
FROM node:18-alpine

RUN <command>              # 执行命令
RUN apt-get update && apt-get install -y curl

CMD ["executable","param"]  # 容器启动时执行的命令（可被docker run覆盖）
CMD ["npm", "start"]

ENTRYPOINT ["executable"]  # 容器入口点（不被覆盖）
ENTRYPOINT ["node", "server.js"]

COPY <src> <dest>          # 复制文件到容器
COPY . /app

ADD <src> <dest>           # 类似COPY，但支持URL和解压tar文件
ADD https://example.com/file.tar.gz /tmp/

WORKDIR <path>             # 设置工作目录
WORKDIR /app

ENV <key>=<value>          # 设置环境变量
ENV NODE_ENV=production
ENV PATH=/app:$PATH

EXPOSE <port>              # 声明暴露端口
EXPOSE 3000
EXPOSE 80 443

VOLUME ["/path"]           # 创建挂载点
VOLUME ["/var/lib/mysql"]
```

### 多阶段构建
```dockerfile
# 构建阶段
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 优化技巧
```dockerfile
# 合并RUN指令减少镜像层数
RUN apt-get update && \
    apt-get install -y curl vim && \
    rm -rf /var/lib/apt/lists/*

# 使用多阶段构建减小最终镜像
# 优先使用alpine基础镜像
# .dockerignore排除不需要的文件
```

## 清理操作

### 系统清理
```bash
docker system df              # 查看磁盘使用情况
docker system prune           # 清理未使用的对象
docker system prune -a        # 清理所有未使用的对象（包括镜像）
docker system prune -f         # 不提示确认
docker system prune --volumes  # 清理包括卷在内的所有未使用对象
```

### 各类清理
```bash
docker container prune         # 删除停止的容器
docker image prune             # 删除未使用的镜像
docker image prune -a          # 删除所有未使用的镜像
docker volume prune            # 删除未使用的卷
docker network prune           # 删除未使用的网络
```

## 故障排查

### 查看详细信息
```bash
docker inspect <container>         # 检查容器配置
docker logs <container>            # 查看容器日志
docker logs --tail 100 <container>  # 查看最近日志
docker exec <container> <command>  # 在容器中执行命令
```

### 检查资源使用
```bash
docker stats                       # 实时查看资源使用
docker stats --no-stream           # 非实时查看
docker top <container>             # 查看容器进程
```

### 网络问题排查
```bash
docker network inspect bridge      # 检查网络配置
docker exec <container> ping host  # 测试网络连接
docker exec <container> ip addr     # 查看容器IP
```

### 清理并重新构建
```bash
docker-compose down -v              # 清理所有
docker system prune -a              # 清理系统
docker-compose up --build           # 重新构建启动
```

## 常用示例

### 运行Nginx
```bash
docker run -d -p 80:80 --name nginx-server nginx
docker run -d -p 80:80 -v $(pwd)/html:/usr/share/nginx/html nginx
```

### 运行MySQL
```bash
docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=mydb \
  -p 3306:3306 \
  -v mysql-data:/var/lib/mysql \
  mysql:8.0
```

### 运行Redis
```bash
docker run -d -p 6379:6379 --name redis redis:alpine
docker run -d -p 6379:6379 -v redis-data:/data redis:alpine redis-server --appendonly yes
```

### 运行PostgreSQL
```bash
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -v pg-data:/var/lib/postgresql/data \
  postgres:14
```

### 运行Node.js应用
```bash
docker run -d -p 3000:3000 --name nodeapp node:18-alpine npm start
docker run -it -p 3000:3000 -v $(pwd):/app -w /app node:18 npm run dev
```

### 运行Python应用
```bash
docker run -d -p 5000:5000 --name pythonapp python:3.11 python app.py
docker run -it -v $(pwd):/app -w /app python:3.11 pip install -r requirements.txt
```

## 安全相关

### 扫描镜像漏洞
```bash
docker scan <image>            # 扫描镜像（需要登录Docker Hub）
```

### 以非root用户运行
```dockerfile
# Dockerfile示例
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chown -R node:node /app
USER node
CMD ["npm", "start"]
```

### 限制容器权限
```bash
docker run --read-only <image>              # 只读文件系统
docker run --user 1000:1000 <image>         # 指定用户
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE <image>  # 删除所有能力，只添加需要的
docker run --security-opt no-new-privileges <image>  # 禁止获取新权限
```

## 实用技巧

### 批量操作
```bash
# 停止所有容器
docker stop $(docker ps -q)

# 删除所有停止的容器
docker rm $(docker ps -a -q)

# 删除所有未使用的镜像
docker rmi $(docker images -q -f dangling=true)

# 进入所有运行中的容器（调试用）
for container in $(docker ps -q); do echo "=== $container ==="; docker exec $container hostname; done
```

### 查看容器IP
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container>
```

### 查看容器端口映射
```bash
docker port <container>
```

### 保存和加载容器状态
```bash
docker commit <container> <new-image>    # 将容器保存为新镜像
docker export <container> > container.tar  # 导出容器
docker import container.tar <image>      # 导入容器
```

### 清理exited状态的容器
```bash
docker rm $(docker ps -q -f status=exited)
```

### 查看镜像的各层大小
```bash
docker history --human --format "table {{.CreatedBy}}\t{{.Size}}" <image>
```
