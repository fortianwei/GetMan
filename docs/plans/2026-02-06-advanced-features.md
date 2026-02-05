# GetMan 高级功能设计 - Phase 14-16

> 日期：2026-02-06
> 状态：✅ 已完成

## Phase 14: 测试自动化 ✅

### 14.1 Pre-request 脚本 ✅
- 请求发送前执行 JavaScript
- 可访问/修改请求参数
- 内置函数：`pm.environment.set()`, `pm.variables.get()`

### 14.2 Test 断言脚本 ✅
- 响应后执行断言
- `pm.test()` 定义测试用例
- `pm.expect()` 断言库
- 支持检查：状态码、响应体、响应时间、Headers

### 14.3 Collection Runner ✅
- 批量运行集合中所有请求
- 显示通过/失败统计
- 支持设置迭代次数
- 导出测试报告

---

## Phase 15: 请求对比 & 性能分析 ✅

### 15.1 响应对比 (Diff) ✅
- 保存响应快照
- 对比两次响应差异
- 高亮显示变化部分

### 15.2 性能瀑布图 ✅
- 总耗时显示
- 预留详细时间分析接口

---

## Phase 16: API 文档导入 ✅

### 16.1 OpenAPI/Swagger 导入 ✅
- 支持 OpenAPI 3.0 / Swagger 2.0
- 解析 endpoints 生成请求
- 自动填充参数定义
- 创建对应集合结构

### 16.2 Postman 集合导入 ✅
- 支持 Collection v2.1
- 导入请求和文件夹结构
