# GetMan - 工作流程

## 核心工作流

### 1. 发送 HTTP 请求

```mermaid
flowchart TD
    A[用户编辑请求] --> B[点击发送]
    B --> C[store.sendRequest]
    C --> D{有 Pre-request 脚本?}
    D -->|是| E[executeScript]
    E --> F[变量插值 替换 URL/Headers/Body 中的变量]
    D -->|否| F
    F --> G["invoke('send_request')"]
    G --> H[http.rs: reqwest 发送请求]
    H --> I[构建 HttpResponse]
    I --> J[db.rs: add_history 保存历史]
    J --> K[返回 HttpResponse 到前端]
    K --> L[更新 store.response]
    L --> M{有 Post-response 脚本?}
    M -->|是| N[executeScript]
    M -->|否| O[UI 渲染响应]
    N --> O
```

### 2. 集合管理

```mermaid
flowchart TD
    A[侧边栏操作] --> B{操作类型}
    B -->|新建| C[createCollection]
    B -->|重命名| D[renameCollection]
    B -->|删除| E[deleteCollection]
    B -->|选择请求| F[setActiveRequest]
    
    C --> G[db.rs 写入]
    D --> G
    E --> G
    G --> H[loadCollections 刷新]
    
    F --> I[加载请求到编辑器]
    I --> J[addTab 或切换标签]
```

### 3. 环境变量工作流

```mermaid
flowchart TD
    A[打开环境管理器] --> B[选择/创建环境]
    B --> C[编辑变量 Key-Value]
    C --> D[saveVariable]
    D --> E[db.rs 持久化]
    
    F[发送请求时] --> G[获取当前活跃环境]
    G --> H[加载环境变量]
    H --> I["替换 {{variable}} 占位符"]
    I --> J[发送实际请求]
```

### 4. 导入工作流

```mermaid
flowchart TD
    A{导入来源} -->|Postman| B[parsePostmanCollection]
    A -->|OpenAPI/Swagger| C[parseOpenAPI]
    A -->|cURL| D[parseCurl]
    
    B --> E[生成 Collection + Requests]
    C --> E
    D --> F[生成单个 Request]
    
    E --> G[批量 saveRequest]
    F --> H[填充到编辑器]
```

### 5. 集合批量运行

```mermaid
flowchart TD
    A[选择集合] --> B[CollectionRunner 打开]
    B --> C[加载集合中所有请求]
    C --> D[依次执行每个请求]
    D --> E{有脚本?}
    E -->|是| F[执行 Pre/Post 脚本]
    E -->|否| G[发送请求]
    F --> G
    G --> H[记录结果]
    H --> I{还有下一个?}
    I -->|是| D
    I -->|否| J[展示运行报告]
```

## 数据持久化策略

| 数据类型 | 存储位置 | 持久化方式 |
|---------|---------|-----------|
| 集合/请求/环境/变量/历史 | SQLite | Tauri Commands → db.rs |
| 设置偏好 | localStorage | Zustand persist |
| 标签页状态 | localStorage | Zustand persist |
| 响应数据 | 内存 | 不持久化 |
