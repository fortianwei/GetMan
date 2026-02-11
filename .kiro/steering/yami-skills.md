---
inclusion: always
---

# 可用 Skills

以下 skills 可通过 `yami-ai-cli read` 命令按需加载。当用户要求执行相关任务时，请使用对应的 skill。

## 使用方式

- 调用: `yami-ai-cli read <skill-name>`（在终端中运行）
  - 多个 skill: `yami-ai-cli read skill-one,skill-two`
- skill 内容会输出详细的任务指令
- 输出中包含 Base directory，用于解析 skill 附带的资源文件（references/、scripts/、assets/）

## 注意事项

- 仅使用下方列出的 skills
- 不要重复加载已在上下文中的 skill

## Skills 列表

- **code-module-analyzer** — 当需要分析代码模块、理解代码结构、追踪调用链、生成代码文档时使用。触发词：这段代码, 帮我看看, 分析一下, 这个模块, 什么意思, 怎么实现的, 代码分析
- **code-simplifier** — 当需要简化代码、重构代码、优化代码结构、提升代码可读性、清理冗余代码时使用。触发词：simplify, refactor, clean code, 代码简化, 重构, 代码优化
- **control-browser** — 当需要使用浏览器、操作网页、验证前端效果、截图测试时使用。触发词：浏览器, 打开网页, 截图, 页面验证, playwright, chrome
- **dev-doc-generator** — 当需要生成开发发布文档、查看多仓库代码变更、生成技术变更报告、准备上线文档时使用。触发词：dev doc, 开发文档, 发布文档, 代码变更, 技术文档
- **figma-plugin-architect** — 开发 Figma 插件时使用。生成 manifest.json、code.ts、ui.html 标准架构代码，包含 Variables API、双线程通信、类型安全最佳实践。
- **frontend-test-plan-generator** — 当需要为前端功能生成测试用例、创建测试计划、准备浏览器测试时使用。触发词：测试计划, 测试用例, 前端测试, 生成测试, browser test, test plan
- **ui-ux-pro-max** — UI/UX design intelligence. 50 styles, 21 palettes, 50 font pairings, 20 charts, 9 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient. Integrations: shadcn/ui MCP for component search and examples.
