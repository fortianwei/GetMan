# GetMan - 文档审查笔记

## 一致性检查

### ✅ 通过
- 前后端数据模型字段一致 (Collection, Request, Environment, Variable, HistoryItem, HttpResponse)
- Tauri Commands 与前端 Store 方法一一对应
- 数据库 schema 与 Rust 结构体字段匹配
- CollectionRunner 类型定义已统一，从 store.ts 导入

### ⚠️ 发现的不一致（已修复）

1. **~~CollectionRunner 类型重复定义~~** ✅ 已修复
   - 移除了 CollectionRunner 中独立的 `Request` 和 `Collection` 接口定义
   - 改为从 `store.ts` 导入统一类型
   - 移除了引用不存在字段 (`pre_script`, `test_script`) 的脚本执行逻辑
   - 修复了调用不存在的 `get_requests_by_collection` 命令，改为 `get_requests`

### ⚠️ 仍存在的不一致

1. **设计文档 vs 实际实现 - 数据库 schema 差异**
   - 设计文档中 `requests` 表包含 `auth_type`, `auth_data`, `updated_at` 字段
   - 实际 `init_tables` 中未包含这些字段
   - 设计文档中 `history` 表包含 `headers`, `body`, `response_headers`, `response_body`, `response_size` 字段
   - 实际 `init_tables` 中 history 表更精简，仅保存 method, url, status_code, response_time

## 完整性检查

### 缺失或不足的区域

1. **认证模块** - 设计文档提到 Auth 标签页，但实际代码中未实现 auth_type/auth_data
2. **CollectionRunner 脚本支持** - 已移除无效的脚本逻辑，待 Request 模型扩展后重新实现
3. **错误处理** - 后端 Commands 使用 `Result<T, String>` 简单返回错误字符串，缺少统一错误类型

### 建议改进

1. 更新设计文档以反映实际实现状态，或补充缺失功能
2. 若需 CollectionRunner 支持脚本，需先在 Request 模型和数据库中添加 pre_script/test_script 字段
3. 添加统一的错误处理策略
