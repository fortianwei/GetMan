# GetMan 项目指南

## 项目概述

GetMan 是一款极简轻量的 API 测试桌面应用，对标 Postman 但专注核心体验，去除臃肿功能。

## 技术栈

- **桌面框架**: Tauri 2.0（Rust 后端）
- **前端**: React 19 + TypeScript + Vite 7
- **状态管理**: Zustand
- **数据库**: SQLite（通过 rusqlite）
- **HTTP 客户端**: reqwest（Rust 端）
- **UI**: 暗色主题，自定义 CSS

## 项目结构

```
src/                    # React 前端
├── components/         # UI 组件
├── stores/             # Zustand 状态管理
├── hooks/              # 自定义 React Hooks
├── utils/              # 工具函数
├── styles/             # 全局样式
├── App.tsx             # 主应用组件
├── store.ts            # 主 store
└── main.tsx            # 入口

src-tauri/src/          # Rust 后端
├── main.rs             # Tauri 入口
├── lib.rs              # 库入口，注册 commands
├── db.rs               # SQLite 数据库操作
└── http.rs             # HTTP 请求处理
```

## 开发规范

### 前端（TypeScript/React）
- 使用函数组件 + Hooks
- 状态管理统一使用 Zustand
- 组件文件使用 PascalCase 命名（如 `BodyEditor.tsx`）
- 工具函数放在 `src/utils/`
- 样式使用 CSS 文件，与组件同名放在同目录
- 严格模式：`strict: true`，不允许未使用的变量和参数

### 后端（Rust）
- Tauri Commands 作为前后端通信桥梁
- 数据库操作封装在 `db.rs`
- HTTP 请求逻辑封装在 `http.rs`
- 使用 serde 进行序列化/反序列化
- 数据库文件存储在用户数据目录

### 通用
- 代码注释使用中文
- Git 提交信息使用中文，格式：`类型: 描述`（如 `feat: 添加环境变量管理`）
- 保持极简原则，不引入不必要的依赖

## 常用命令

- 开发模式: `node_modules\.bin\tauri dev`
- 构建: `node_modules\.bin\tauri build`
- 仅前端开发: `npm run dev`（端口 1420）

## 核心功能模块

1. **请求构建器** - HTTP 方法、URL、Headers、Body、Auth
2. **响应查看器** - 状态码、JSON 格式化、语法高亮
3. **集合管理** - 树形结构、拖拽排序
4. **环境变量** - 多环境切换、变量插值 `{{variable}}`
5. **历史记录** - 自动保存、快速恢复

## 设计文档

#[[file:docs/plans/2026-02-04-getman-design.md]]
