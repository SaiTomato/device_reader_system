# Device Reader（设备读卡系统 / デバイスリーダー）

PC 设备管理前端。通过 Google 登录，连接 Google Apps Script（GAS）后端，支持 QR 扫码、设备登记与借出记录等功能。

---

## English

### Overview

Web frontend for managing company PCs. Users sign in with Google; admins can register PCs, edit records, and view history. All users can scan QR codes to open PC details.

### Features


| Feature                   | Admin | User |
| ------------------------- | ----- | ---- |
| Google login              | ✓     | ✓    |
| QR scan → PC detail       | ✓     | ✓    |
| PC list / register / edit | ✓     | —    |
| Loan document (print)     | ✓     | —    |
| Operation history         | ✓     | —    |
| QR code display           | ✓     | ✓    |


### Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · React Query · React Router · Google OAuth

Backend API: Google Apps Script (`VITE_GAS_API_URL`)

### Quick start

**Requirements:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Start dev server
npm run dev
```


| Variable                | Description                |
| ----------------------- | -------------------------- |
| `VITE_GAS_API_URL`      | GAS Web App deployment URL |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID     |


**Other commands**

```bash
npm run dev:host   # Dev server (LAN accessible)
npm run build      # Production build → dist/
npm run preview    # Preview production build
npm run lint       # ESLint
```

### Project structure

```
src/
├── pages/       # Route pages (login, PC list, QR scan, etc.)
├── components/  # Reusable UI components
├── services/    # API calls (pc, history, employee, master)
├── routes/      # Router & auth guards
├── context/     # Auth state
└── types/       # TypeScript types & DTOs
```

---

## 中文

### 项目简介

公司 PC 设备管理 Web 前端。使用 Google 账号登录，后端对接 Google Apps Script（GAS）。普通用户可扫码查看设备；管理员可登记、编辑设备并查看操作历史。

### 功能一览


| 功能              | 管理员 | 普通用户 |
| --------------- | --- | ---- |
| Google 登录       | ✓   | ✓    |
| QR 扫码 → 设备详情    | ✓   | ✓    |
| PC 列表 / 登记 / 编辑 | ✓   | —    |
| 借出单据（打印）        | ✓   | —    |
| 操作历史            | ✓   | —    |
| QR 码展示          | ✓   | ✓    |


### 技术栈

React 19 · TypeScript · Vite · Tailwind CSS · React Query · React Router · Google OAuth

后端 API：Google Apps Script（通过 `VITE_GAS_API_URL` 配置）

### 快速开始

**环境要求：** Node.js 18+

```bash
# 1. 安装依赖
npm install

# 2. 复制环境变量并填写
cp .env.example .env

# 3. 启动开发服务器
npm run dev
```


| 变量                      | 说明                  |
| ----------------------- | ------------------- |
| `VITE_GAS_API_URL`      | GAS Web App 部署地址    |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 客户端 ID |


**其他命令**

```bash
npm run dev:host   # 开发服务器（局域网可访问）
npm run build      # 生产构建，输出至 dist/
npm run preview    # 预览生产构建
npm run lint       # 代码检查
```

### 目录结构

```
src/
├── pages/       # 页面（登录、PC 列表、扫码等）
├── components/  # 可复用 UI 组件
├── services/    # API 调用（pc、history、employee、master）
├── routes/      # 路由与权限守卫
├── context/     # 登录状态
└── types/       # TypeScript 类型与 DTO
```

---

## 日本語

### 概要

社内 PC 管理用 Web フロントエンド。Google アカウントでログインし、Google Apps Script（GAS）をバックエンド API として利用します。一般ユーザーは QR 読取で PC 詳細を確認でき、管理者は PC の登録・編集・履歴確認ができます。

### 機能一覧


| 機能              | 管理者 | 一般  |
| --------------- | --- | --- |
| Google ログイン     | ✓   | ✓   |
| QR 読取 → PC 詳細   | ✓   | ✓   |
| PC 一覧 / 登録 / 編集 | ✓   | —   |
| 貸出書類（印刷）        | ✓   | —   |
| 操作履歴            | ✓   | —   |
| QR コード表示        | ✓   | ✓   |


### 技術スタック

React 19 · TypeScript · Vite · Tailwind CSS · React Query · React Router · Google OAuth

バックエンド API：Google Apps Script（`VITE_GAS_API_URL` で設定）

### セットアップ

**必要環境：** Node.js 18 以上

```bash
# 1. 依存関係をインストール
npm install

# 2. 環境変数ファイルをコピーして値を設定
cp .env.example .env

# 3. 開発サーバーを起動
npm run dev
```


| 変数                      | 説明                     |
| ----------------------- | ---------------------- |
| `VITE_GAS_API_URL`      | GAS Web App のデプロイ URL  |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth クライアント ID |


**その他のコマンド**

```bash
npm run dev:host   # 開発サーバー（LAN からアクセス可）
npm run build      # 本番ビルド → dist/
npm run preview    # 本番ビルドのプレビュー
npm run lint       # ESLint
```

### ディレクトリ構成

```
src/
├── pages/       # ページ（ログイン、PC 一覧、QR 読取など）
├── components/  # 共通 UI コンポーネント
├── services/    # API 呼び出し（pc、history、employee、master）
├── routes/      # ルーティングと認可ガード
├── context/     # 認証状態
└── types/       # TypeScript 型定義・DTO
```

