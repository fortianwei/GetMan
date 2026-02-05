# GetMan 实现计划

## Phase 1: 项目初始化 + 基础 UI 框架 ✅

### 1.1 Tauri 项目初始化
- [x] 使用 `pnpm create tauri-app` 创建项目
- [x] 配置 React + TypeScript 模板
- [x] 安装依赖：zustand, @tauri-apps/api

### 1.2 基础 UI 框架
- [x] 创建全局暗色主题样式
- [x] 实现三栏布局组件（侧边栏 / 请求区 / 响应区）
- [x] 侧边栏可折叠 + 拖拽调整宽度

### 1.3 基础组件
- [x] 按钮、输入框、下拉选择等基础组件
- [x] Tab 标签页组件
- [x] 树形列表组件骨架

---

## Phase 2: 请求构建器 + HTTP 客户端 ✅

### 2.1 请求构建器 UI
- [x] HTTP 方法下拉选择（GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS）
- [x] URL 输入框
- [x] 发送按钮

### 2.2 请求参数标签页
- [x] Params 标签页（Query 参数键值对编辑）
- [x] Headers 标签页（请求头键值对编辑）
- [x] Body 标签页（JSON/Form Data/Raw/Binary 切换）
- [x] Auth 标签页（Basic/Bearer Token）

### 2.3 Rust HTTP 客户端
- [x] 使用 reqwest 实现 HTTP 请求
- [x] Tauri command: `send_request`
- [x] 支持超时设置、重定向处理

---

## Phase 3: 响应查看器 + SQLite 集成 ✅

### 3.1 响应查看器 UI
- [x] 状态码 + 响应时间 + 大小显示
- [x] Body 标签页（JSON 格式化 + 语法高亮）
- [x] Headers 标签页
- [x] Cookies 标签页

### 3.2 SQLite 数据库
- [x] 集成 rusqlite
- [x] 创建数据库表（collections, requests, environments, variables, history）
- [x] 数据库初始化命令

---

## Phase 4: 集合管理 + 环境变量 ✅

### 4.1 集合管理
- [x] 集合树形展示
- [x] 新建/重命名/删除集合
- [x] 新建/重命名/删除请求
- [x] 拖拽排序
- [x] 右键菜单

### 4.2 环境变量
- [x] 环境列表管理（新建/编辑/删除）
- [x] 变量键值对编辑
- [x] 环境切换下拉框
- [x] URL 变量插值 `{{variable}}`

---

## Phase 5: 历史记录 + 响应美化 ✅

### 5.1 历史记录
- [x] 历史记录列表（按时间倒序）
- [x] 显示方法、URL、状态码、时间
- [x] 点击恢复请求
- [x] 清空历史

### 5.2 响应美化
- [x] JSON 折叠/展开（基础格式化）
- [x] 搜索功能
- [x] 复制响应

---

## Phase 6: 打包发布

### 6.1 优化
- [x] 启动性能优化
- [x] 包体积优化（debug: ~18MB）
- [x] 内存占用优化（~63MB）

### 6.2 打包
- [ ] Windows 安装包（.msi）
- [ ] macOS 安装包（.dmg）
- [ ] Linux 安装包（.AppImage/.deb）

---

## Phase 7: 核心效率增强 ✅

### 7.1 快捷键
- [x] Ctrl+Enter 发送请求
- [x] Ctrl+S 保存请求
- [x] Ctrl+N/T 新建标签
- [x] Ctrl+W 关闭标签
- [x] Ctrl+L 聚焦 URL
- [x] Ctrl+, 打开设置
- [x] Ctrl+/ 快捷键帮助
- [x] Esc 关闭弹窗

### 7.2 多标签页
- [x] 同时打开多个请求
- [x] 标签切换
- [x] 关闭标签
- [x] 标签状态持久化

### 7.3 cURL 支持
- [x] cURL 导入（解析 cURL 命令）
- [x] cURL 导出（复制为 cURL）

---

## Phase 8: 数据互通 ✅

### 8.1 代码生成
- [x] JavaScript (fetch)
- [x] JavaScript (axios)
- [x] Python (requests)
- [x] Go (net/http)
- [x] Rust (reqwest)
- [x] Java (HttpClient)
- [x] PHP (cURL)
- [x] cURL 命令

---

## Phase 9: 测试自动化

- [ ] Pre-request 脚本
- [ ] Test 断言脚本
- [ ] Collection Runner

---

## Phase 10: 协议扩展 ✅

### 10.1 WebSocket
- [x] 连接/断开
- [x] 发送/接收消息
- [x] 消息历史
- [x] 清空消息

---

## Phase 11: 界面体验 ✅

### 11.1 主题
- [x] 暗色主题
- [x] 亮色主题
- [x] 跟随系统

### 11.2 响应查看
- [x] Pretty 格式化视图
- [x] Raw 原始视图
- [x] Tree 树形视图（可折叠）

### 11.3 设置
- [x] 字体大小
- [x] 超时设置
- [x] 重定向设置
- [x] SSL 验证设置
- [x] 代理设置

---

## Phase 12: 内置工具箱 ✅

- [x] JWT 解析
- [x] Base64 编解码
- [x] URL 编解码
- [x] 时间戳转换
- [x] UUID 生成
- [x] JSON 格式化/压缩
- [x] Hash 计算 (SHA-256/SHA-1/SHA-512)

---

## Phase 13: 高级网络

- [x] 代理设置 (HTTP/SOCKS5)
- [x] SSL 证书验证开关
- [x] 超时配置
- [ ] Mock Server

---

## 技术要点

| 模块 | 技术选型 |
|------|----------|
| 框架 | Tauri 2.0 |
| 前端 | React 18 + TypeScript |
| 状态管理 | Zustand |
| HTTP 客户端 | reqwest (Rust) |
| 数据库 | SQLite (rusqlite) |
| 样式 | CSS Variables + 暗色主题 |
| 代码编辑器 | Monaco Editor 或 CodeMirror |

## 目标指标

- 安装包 < 15MB
- 启动时间 < 1秒
- 内存占用 < 100MB
