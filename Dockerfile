# 用于构建一个基于 Node.js 的前端应用程序的 Docker 镜像。

# 用于指定基础镜像。它基于名为"node"的官方Docker镜像，
# 并使用了18版本的Node.js，以及一个基于Debian Buster的slim操作系统版本。
FROM node:18-buster-slim

RUN npm install -g http-server

# 将Docker容器内的工作目录切换到/src。之后的所有命令将在这个目录下执行。
WORKDIR /src

# 将当前Dockerfile所在目录中的所有文件和文件夹复制到容器的/src目录下。
# 这个步骤将你的前端应用程序代码复制到了容器内，以便进行后续操作。
COPY . .

RUN npm install

RUN npm run build

# 指定容器将要监听的端口号
EXPOSE 80

# 定义了容器启动时要执行的命令
# 容器将会使用http-server来启动一个HTTP服务器，从名为"dist"的目录中提供静态文件
CMD [ "http-server", "dist" ]

