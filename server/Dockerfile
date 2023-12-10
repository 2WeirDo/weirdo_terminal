# 使用官方 Node.js 轻量级镜像
# https://hub.docker.com/_/node
FROM node:16-slim

# 定义工作目录, 即/usr/src/app。所有后续命令将在这个目录下执行。
WORKDIR /usr/src/app

# 将本地代码复制到工作目录内
COPY ./ ./

RUN npm install

# 安装 pm2
RUN npm install pm2 -g

# 启动服务
# 使用pm2-runtime命令来启动你的Node.js应用程序，而不是直接运行npm start。
# 使用pm2-runtime可以更好地管理Node.js应用程序的生命周期，包括进程监视和自动重启。
CMD pm2-runtime 'npm start'
