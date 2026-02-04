# GetMan 设计文档

> 极简轻量的 API 测试工具

## 项目概述

**定位**：一款极简轻量的 API 测试工具，对标 Postman 但去除臃肿功能，专注核心体验。

**技术栈**：
- 框架：Tauri 2.0（Rust 后端）
- 前端：React + TypeScript
- 存储：SQLite
- UI：暗色主题

**核心特点**：
- 安装包 < 15MB（对比 Postman 200MB+）
- 启动时间 < 1秒
- 内存占用 < 100MB
- 离线优先，无需登录

## 功能模块

### 1. 请求构建器
- HTTP 方法选择：GET / POST / PUT / PATCH / DELETE / HEAD / OPTIONS
- URL 输入框（支持环境变量插值 `{{baseUrl}}/api/users`）
- 标签页切换：Params / Headers / Body / Auth
- Body 类型：JSON / Form Data / Raw / Binary

### 2. 响应查看器
- 状态码 + 响应时间 + 大小显示
- 标签页：Body / Headers / Cookies
- JSON 自动格式化 + 语法高亮
- 支持搜索和折叠

### 3. 侧边栏
- 集合树形结构（文件夹 + 请求）
- 拖拽排序
- 右键菜单（新建/重命名/删除/复制）
- 快速搜索过滤

### 4. 环境管理
- 环境列表（开发/测试/生产）
- 变量键值对编辑
- 快速切换下拉框

### 5. 历史记录
- 按时间倒序显示
- 显示方法、URL、状态码、时间
- 点击可恢复请求

## 数据模型

### SQLite 表结构

```sql
-- 集合
CREATE TABLE collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    parent_id INTEGER,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 请求
CREATE TABLE requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    collection_id INTEGER,
    name TEXT NOT NULL,
    method TEXT DEFAULT 'GET',
    url TEXT,
    headers TEXT, -- JSON
    body TEXT,
    body_type TEXT DEFAULT 'none',
    auth_type TEXT,
    auth_data TEXT, -- JSON
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 环境
CREATE TABLE environments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    is_active INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 环境变量
CREATE TABLE variables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    environment_id INTEGER NOT NULL,
    key TEXT NOT NULL,
    value TEXT,
    enabled INTEGER DEFAULT 1
);

-- 历史记录
CREATE TABLE history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    method TEXT,
    url TEXT,
    headers TEXT,
    body TEXT,
    status_code INTEGER,
    response_headers TEXT,
    response_body TEXT,
    response_time INTEGER, -- ms
    response_size INTEGER, -- bytes
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 界面布局

```
┌──────────────────────────────────────────────────────────────────┐
│  GetMan                              [环境: 开发 ▼]   [─][□][×] │
├─────────────┬────────────────────────────────────────────────────┤
│ 📁 集合     │  [GET ▼] [https://api.example.com/users  ] [发送] │
│ ├─ 用户API  │──────────────────────────────────────────────────── │
│ │  ├─ 获取  │  [Params] [Headers] [Body] [Auth]                  │
│ │  └─ 创建  │  ┌──────────────────────────────────────────────┐  │
│ ├─ 订单API  │  │ Key          │ Value                        │  │
│ │  └─ 列表  │  │ Content-Type │ application/json             │  │
│             │  └──────────────────────────────────────────────┘  │
│ 📜 历史     │────────────────────────────────────────────────────│
│  GET /users │  响应  [200 OK] [125ms] [2.3KB]                    │
│  POST /login│  [Body] [Headers] [Cookies]                        │
│             │  ┌──────────────────────────────────────────────┐  │
│             │  │ {                                            │  │
│             │  │   "users": [                                 │  │
│             │  │     { "id": 1, "name": "张三" }              │  │
│             │  │   ]                                          │  │
│             │  │ }                                            │  │
│             │  └──────────────────────────────────────────────┘  │
└─────────────┴────────────────────────────────────────────────────┘
```

**布局说明**：
- 左侧 250px：集合树 + 历史记录（可切换标签）
- 右侧上半部分：请求构建区
- 右侧下半部分：响应展示区
- 侧边栏可折叠，支持拖拽调整宽度

## 项目结构

```
getman/
├── src/                    # React 前端
│   ├── components/         # UI 组件
│   ├── stores/             # 状态管理（Zustand）
│   ├── hooks/              # 自定义 Hooks
│   ├── utils/              # 工具函数
│   └── App.tsx
├── src-tauri/              # Rust 后端
│   ├── src/
│   │   ├── commands/       # Tauri 命令
│   │   ├── db/             # 数据库操作
│   │   └── main.rs
│   └── Cargo.toml
├── package.json
└── tauri.conf.json
```

## 实现阶段

1. **Phase 1**：项目初始化 + 基础 UI 框架
2. **Phase 2**：请求构建器 + HTTP 客户端
3. **Phase 3**：SQLite 集成 + 数据持久化
4. **Phase 4**：集合管理 + 环境变量
5. **Phase 5**：历史记录 + 响应美化
6. **Phase 6**：打包发布
