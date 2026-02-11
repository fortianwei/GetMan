# AGENTS

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: `npx openskills read <skill-name>` (run in your shell)
  - For multiple: `npx openskills read skill-one,skill-two`
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>brainstorming</name>
<description>"You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation."</description>
<location>global</location>
</skill>

<skill>
<name>dispatching-parallel-agents</name>
<description>Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies</description>
<location>global</location>
</skill>

<skill>
<name>executing-plans</name>
<description>Use when you have a written implementation plan to execute in a separate session with review checkpoints</description>
<location>global</location>
</skill>

<skill>
<name>frontend-design</name>
<description>Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.</description>
<location>global</location>
</skill>

<skill>
<name>test-driven-development</name>
<description>Use when implementing any feature or bugfix, before writing implementation code</description>
<location>global</location>
</skill>

<skill>
<name>using-superpowers</name>
<description>Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions</description>
<location>global</location>
</skill>

<skill>
<name>webapp-testing</name>
<description>Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.</description>
<location>global</location>
</skill>

<skill>
<name>writing-plans</name>
<description>Use when you have a spec or requirements for a multi-step task, before touching code</description>
<location>global</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>

## 项目概述

GetMan 是一款极简轻量的 API 测试桌面应用，对标 Postman 但专注核心体验，去除臃肿功能。

- **技术栈**: Tauri 2.0 (Rust) + React 19 + TypeScript + Vite 7 + Zustand + SQLite
- **规模**: 3,817 行代码，32 个核心文件，84 个函数
- **特点**: 安装包 < 15MB，启动 < 1秒，离线优先

## 架构

```
前端 (React + TypeScript)          后端 (Rust)
┌─────────────────────┐           ┌──────────────────┐
│ App.tsx (主组件)     │  invoke() │ lib.rs (Commands) │
│ store.ts (状态)      │ ◄──────► │ http.rs (HTTP)    │
│ 15 个 UI 组件        │           │ db.rs (SQLite)    │
│ 5 个工具模块         │           └──────────────────┘
└─────────────────────┘
```

通信方式: 前端通过 `@tauri-apps/api` 的 `invoke()` 调用后端 18 个 Tauri Commands。

## 项目结构

```
src/                        # React 前端
├── main.tsx                # 应用入口
├── App.tsx                 # 主应用组件 (683 行，最复杂)
├── App.css                 # 主样式
├── store.ts                # Zustand 主状态 (251 行)
├── stores/
│   ├── settings.ts         # 设置状态 (localStorage 持久化)
│   └── tabs.ts             # 标签页状态 (localStorage 持久化)
├── components/             # UI 组件
│   ├── BodyEditor.tsx      # 请求体编辑 (JSON/Form/Raw/Binary)
│   ├── KeyValueEditor.tsx  # 通用键值对编辑器
│   ├── ScriptEditor.tsx    # Pre/Post 脚本编辑
│   ├── JsonTreeView.tsx    # JSON 树形展示
│   ├── TimingChart.tsx     # 请求时序图
│   ├── DiffViewer.tsx      # 响应差异对比
│   ├── EnvironmentManager.tsx  # 环境变量管理
│   ├── CollectionRunner.tsx    # 集合批量运行
│   ├── ToolsPanel.tsx      # 开发工具面板
│   ├── WebSocketPanel.tsx  # WebSocket 测试
│   ├── ImportApiModal.tsx  # 导入 Postman/OpenAPI
│   ├── ImportCurlModal.tsx # 导入 cURL
│   ├── CodeGenModal.tsx    # 代码生成
│   ├── SettingsModal.tsx   # 应用设置
│   └── Icons.tsx           # SVG 图标集合
├── utils/
│   ├── codegen.ts          # 代码生成 (10 种格式)
│   ├── scripting.ts        # 脚本执行引擎
│   ├── openapi.ts          # OpenAPI/Postman 解析
│   ├── tools.ts            # 11 个实用工具
│   └── diff.ts             # 差异算法
└── styles/
    └── components.css      # 组件样式

src-tauri/src/              # Rust 后端
├── main.rs                 # Tauri 入口
├── lib.rs                  # 18 个 Commands + 7 个数据模型 (187 行)
├── db.rs                   # SQLite 操作，20 个方法 (260 行)
└── http.rs                 # HTTP 请求处理 (57 行)
```

## 数据模型

核心模型: `Collection`, `Request`, `Environment`, `Variable`, `HistoryItem`, `HttpResponse`
前端独有: `Tab` (标签页), `Settings` (设置)

数据库: SQLite，5 张表 (collections, requests, environments, variables, history)

## 开发规范

### 前端
- 函数组件 + Hooks，状态管理统一 Zustand
- 组件 PascalCase 命名，工具函数放 `src/utils/`
- 样式用 CSS 文件，与组件同名同目录
- `strict: true`，不允许未使用变量

### 后端
- Tauri Commands 作为前后端桥梁
- 数据库操作封装在 `db.rs`，HTTP 逻辑在 `http.rs`
- serde 序列化，数据库文件存用户数据目录

### 通用
- 代码注释中文
- Git 提交中文，格式: `类型: 描述`
- 保持极简，不引入不必要依赖

## 常用命令

| 命令 | 说明 |
|------|------|
| `node_modules\.bin\tauri dev` | 开发模式 |
| `node_modules\.bin\tauri build` | 构建 |
| `npm run dev` | 仅前端开发 (端口 1420) |

## 详细文档

完整文档位于 `.agents/summary/` 目录:
- `index.md` - 文档索引和使用指南
- `architecture.md` - 系统架构和设计模式
- `components.md` - 组件和工具模块详情
- `data_models.md` - 数据模型和 ER 图
- `interfaces.md` - Tauri Commands 接口详情
- `workflows.md` - 核心工作流程图
- `dependencies.md` - 依赖清单
- `review_notes.md` - 审查笔记和已知问题

## 设计文档

- `docs/plans/2026-02-04-getman-design.md` - 原始设计文档
- `docs/plans/2026-02-05-feature-expansion-design.md` - 功能扩展设计
- `docs/plans/2026-02-06-advanced-features.md` - 高级功能计划
