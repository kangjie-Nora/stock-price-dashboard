# 快速部署指南

## 📋 前置要求

- Node.js 和 npm（如果还没有，请先安装：https://nodejs.org/）

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地测试

```bash
npm run dev
```

访问 http://localhost:5173

### 3. 部署到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Stock Price Dashboard"

# 添加远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 4. 部署到 Vercel（最简单）

1. 访问 https://vercel.com/ 并用 GitHub 登录
2. 点击 "Import Project"
3. 选择您的 GitHub 仓库
4. 点击 "Deploy"
5. 等待 1-2 分钟完成部署

完成！🎉

## 📝 完整说明

详细的安装和部署步骤请查看：**安装和部署指南.md**

