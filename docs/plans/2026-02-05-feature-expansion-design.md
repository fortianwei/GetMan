# GetMan 功能扩展设计文档

> 日期：2026-02-05
> 状态：规划中

## 概述

基于已完成的 Phase 1-6 基础功能，本文档规划 GetMan 的功能扩展路线图，目标是打造一个功能完整、体验优秀的 API 测试工具。

---

## Phase 7: 核心效率增强

**目标**：提升日常使用效率，减少重复操作

| 功能 | 优先级 | 复杂度 | 说明 |
|------|:------:|:------:|------|
| 全局快捷键 | P0 | 低 | Ctrl+Enter 发送、Ctrl+S 保存、Ctrl+N 新建、Ctrl+L 聚焦 URL、Ctrl+W 关闭标签 |
| 多标签页 | P0 | 中 | 同时打开多个请求，标签可拖拽排序、关闭、固定 |
| cURL 导入 | P0 | 低 | 粘贴 cURL 命令自动解析为请求 |
| cURL 导出 | P0 | 低 | 一键复制当前请求为 cURL 命令 |
| URL 历史补全 | P1 | 低 | 输入 URL 时显示历史记录建议 |
| 请求耗时可视化 | P1 | 中 | 时间线展示 DNS 解析/TCP 连接/TLS 握手/等待响应/下载 |

### 快捷键清单

```
Ctrl + Enter    发送请求
Ctrl + S        保存请求
Ctrl + N        新建请求
Ctrl + T        新建标签页
Ctrl + W        关闭当前标签
Ctrl + Tab      切换下一个标签
Ctrl + Shift+Tab 切换上一个标签
Ctrl + L        聚焦 URL 输入框
Ctrl + /        显示快捷键帮助
Ctrl + ,        打开设置
Ctrl + E        切换环境
F11             全屏响应查看
Esc             取消请求/关闭弹窗
```

---

## Phase 8: 数据互通

**目标**：方便数据迁移、备份、分享和代码集成

| 功能 | 优先级 | 复杂度 | 说明 |
|------|:------:|:------:|------|
| Postman 集合导入 | P0 | 中 | 支持 Postman Collection v2.1 JSON 格式 |
| 集合导出 JSON | P0 | 低 | 导出为 GetMan 原生 JSON 格式 |
| 代码生成 | P0 | 中 | 生成 Python/JavaScript/Go/Java/Rust/cURL/PHP 代码 |
| 变量替换预览 | P1 | 低 | 发送前预览 `{{variable}}` 替换后的实际值 |
| 导出为 OpenAPI | P2 | 高 | 从集合生成 OpenAPI 3.0 规范 |

### 代码生成模板

支持语言：
- Python (requests)
- JavaScript (fetch / axios)
- Go (net/http)
- Java (HttpClient / OkHttp)
- Rust (reqwest)
- PHP (cURL)
- cURL 命令行

---

## Phase 9: 测试自动化

**目标**：支持 API 自动化测试场景

| 功能 | 优先级 | 复杂度 | 说明 |
|------|:------:|:------:|------|
| Pre-request 脚本 | P0 | 高 | 请求前执行 JavaScript，可设置变量、生成签名 |
| Test 断言脚本 | P0 | 高 | 响应后执行断言，检查状态码、响应体、响应时间 |
| Collection Runner | P0 | 中 | 批量运行集合中所有请求，显示通过/失败统计 |
| 环境变量动态设置 | P1 | 中 | 脚本中 `pm.environment.set()` 设置变量 |
| 请求链/工作流 | P1 | 高 | 串联多个请求，前一个响应作为后一个输入 |
| 测试报告导出 | P2 | 中 | 导出 HTML/JSON 格式测试报告 |

### 脚本 API 设计

```javascript
// Pre-request 脚本示例
pm.environment.set("timestamp", Date.now());
pm.environment.set("signature", CryptoJS.MD5(pm.request.body).toString());

// Test 脚本示例
pm.test("Status is 200", () => {
  pm.response.to.have.status(200);
});

pm.test("Response has user id", () => {
  const json = pm.response.json();
  pm.expect(json.id).to.be.a('number');
});

pm.test("Response time < 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

---

## Phase 10: 协议扩展

**目标**：支持现代 API 协议

| 功能 | 优先级 | 复杂度 | 说明 |
|------|:------:|:------:|------|
| WebSocket | P0 | 中 | 建立连接、发送/接收消息、消息历史、断开连接 |
| SSE 支持 | P1 | 低 | Server-Sent Events 流式响应实时显示 |
| GraphQL | P1 | 高 | 查询编辑器、变量面板、Schema 浏览器 |
| gRPC | P2 | 高 | 加载 .proto 文件、调用 Unary/Stream 方法 |

### WebSocket 界面设计

```
┌─────────────────────────────────────────────────────┐
│ [WS] [wss://echo.websocket.org] [Connect/Disconnect]│
├─────────────────────────────────────────────────────┤
│ Messages                                    [Clear] │
│ ┌─────────────────────────────────────────────────┐ │
│ │ ← {"type":"welcome","id":123}        10:30:01  │ │
│ │ → {"action":"ping"}                  10:30:05  │ │
│ │ ← {"action":"pong"}                  10:30:05  │ │
│ └─────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ [Message input...                        ] [Send]   │
└─────────────────────────────────────────────────────┘
```

---

## Phase 11: 界面体验

**目标**：提升视觉体验和易用性

| 功能 | 优先级 | 复杂度 | 说明 |
|------|:------:|:------:|------|
| 亮色/暗色主题 | P0 | 低 | 手动切换 + 跟随系统 |
| JSON 树形视图 | P0 | 中 | 可折叠/展开的树形 JSON 浏览器 |
| 图片/PDF 预览 | P1 | 低 | 响应为图片/PDF 时直接预览 |
| 全屏响应查看 | P1 | 低 | F11 全屏查看大响应体 |
| 响应对比 | P1 | 中 | Diff 对比两次请求的响应差异 |
| 布局记忆 | P1 | 低 | 记住面板大小、侧边栏宽度 |
| 字体大小调节 | P2 | 低 | 编辑器字体大小设置 |
| 自定义主题色 | P2 | 低 | 个性化强调色 |
| 语法高亮增强 | P2 | 中 | XML/HTML/YAML 格式高亮 |

---

## Phase 12: 内置工具箱

**目标**：常用开发工具一站式集成

| 功能 | 优先级 | 复杂度 | 说明 |
|------|:------:|:------:|------|
| JWT 解析 | P0 | 低 | 解析 JWT Token，显示 Header/Payload/过期时间 |
| Base64 编解码 | P0 | 低 | 文本/文件 Base64 编解码 |
| URL 编解码 | P0 | 低 | URL encode/decode |
| 时间戳转换 | P0 | 低 | Unix 时间戳 ↔ 可读日期 |
| UUID 生成 | P1 | 低 | 生成 UUID v4 |
| JSON 格式化 | P1 | 低 | 美化/压缩 JSON |
| Hash 计算 | P2 | 低 | MD5/SHA1/SHA256/SHA512 |
| 正则测试 | P2 | 低 | 正则表达式测试工具 |
| 颜色转换 | P2 | 低 | HEX/RGB/HSL 互转 |

### 工具箱界面

通过侧边栏或顶部菜单 `Tools` 访问，每个工具独立标签页。

---

## Phase 13: 高级网络

**目标**：支持复杂网络环境和高级场景

| 功能 | 优先级 | 复杂度 | 说明 |
|------|:------:|:------:|------|
| 代理设置 | P0 | 中 | HTTP/HTTPS/SOCKS5 代理，支持认证 |
| SSL 证书管理 | P1 | 中 | 自定义 CA 证书、客户端证书、忽略证书验证 |
| 请求超时设置 | P1 | 低 | 全局/单请求超时配置 |
| 重定向控制 | P1 | 低 | 是否跟随重定向、最大重定向次数 |
| Mock Server | P2 | 高 | 本地启动 Mock 服务，返回预设响应 |
| API 文档生成 | P2 | 中 | 从集合生成 Markdown/HTML 文档 |

---

## 实现优先级总览

```
高优先级 (P0) - 核心功能，尽快实现
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 7:  快捷键、多标签页、cURL 导入导出
Phase 8:  Postman 导入、代码生成
Phase 11: 主题切换、JSON 树形视图
Phase 12: JWT 解析、Base64、URL 编解码、时间戳

中优先级 (P1) - 重要功能，按需实现
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 7:  URL 补全、耗时可视化
Phase 9:  脚本支持、Collection Runner
Phase 10: WebSocket、SSE
Phase 11: 图片预览、响应对比、布局记忆
Phase 13: 代理设置、SSL 证书

低优先级 (P2) - 锦上添花，有余力实现
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 8:  OpenAPI 导出
Phase 9:  测试报告
Phase 10: GraphQL、gRPC
Phase 11: 自定义主题、语法高亮
Phase 12: Hash、正则测试
Phase 13: Mock Server、文档生成
```

---

## 技术考量

### 脚本执行沙箱
- 使用 `quickjs-rs` 或 `boa` 在 Rust 中嵌入 JS 引擎
- 提供受限 API（pm 对象），禁止文件/网络访问

### WebSocket 实现
- Rust 端使用 `tokio-tungstenite`
- 前端通过 Tauri 事件接收消息

### 代码生成
- 前端模板引擎生成
- 支持复制到剪贴板

### 数据迁移
- Postman Collection v2.1 JSON 解析
- 字段映射转换

---

## 下一步

1. 确认优先级无误后，从 Phase 7 开始实现
2. 每个 Phase 完成后更新 `implementation-plan.md`
3. 重大功能变更需更新本设计文档
