# GetMan - 文档索引

> 本文件是 AI 助手理解 GetMan 项目的主要入口。通过本索引可快速定位所需信息。

## 如何使用本文档

1. **先读本文件** - 了解项目全貌和文档结构
2. **按需深入** - 根据具体问题查阅对应文档
3. **交叉参考** - 相关文档之间有引用关系

## 项目简介

GetMan 是一款极简轻量的 API 测试桌面应用，使用 Tauri 2.0 (Rust) + React 19 + TypeScript 构建。对标 Postman 但专注核心体验，安装包 < 15MB，启动 < 1秒。

## 文档目录

| 文件 | 内容 | 适用场景 |
|------|------|---------|
| [codebase_info.md](codebase_info.md) | 项目标识、技术栈、规模、开发命令 | 了解项目基本信息 |
| [architecture.md](architecture.md) | 系统架构、通信机制、状态管理、目录结构 | 理解整体设计和模块关系 |
| [components.md](components.md) | 15 个 UI 组件 + 5 个工具模块的详细说明 | 修改或新增前端功能 |
| [data_models.md](data_models.md) | 前后端数据模型对照、ER 图、SQLite schema | 数据相关开发 |
| [interfaces.md](interfaces.md) | 18 个 Tauri Commands 接口详情 | 前后端通信开发 |
| [workflows.md](workflows.md) | 5 个核心工作流程图 | 理解业务逻辑 |
| [dependencies.md](dependencies.md) | 前后端依赖清单和用途 | 依赖管理和升级 |
| [review_notes.md](review_notes.md) | 一致性/完整性审查结果 | 了解已知问题和改进方向 |

## 快速问答指南

| 问题类型 | 查阅文档 |
|---------|---------|
| "这个项目是做什么的？" | 本文件 + codebase_info.md |
| "怎么添加新的 API 接口？" | interfaces.md + architecture.md |
| "数据库表结构是什么？" | data_models.md |
| "前端组件怎么组织的？" | components.md |
| "请求发送的完整流程？" | workflows.md |
| "用了哪些第三方库？" | dependencies.md |
| "有哪些已知问题？" | review_notes.md |

## 关键架构决策

- **前后端分离**: React 负责 UI，Rust 负责数据和网络
- **IPC 通信**: 通过 Tauri Commands (`invoke()`) 桥接
- **三层状态**: 主 Store (Tauri IPC) + Settings (localStorage) + Tabs (localStorage)
- **零 UI 库**: 所有组件手写，保持极简
