# === 阶段 1：构建阶段 ===
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# === 阶段 2：生产运行阶段 ===
FROM nginx:alpine

# 1. 复制 React 静态文件
COPY --from=builder /app/dist /usr/share/nginx/html

# 2. 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 3. 创建证书目录，并将本地的证书复制到容器中
RUN mkdir -p /etc/nginx/ssl
COPY *.pem /etc/nginx/ssl/

# 修改暴露端口为 8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]