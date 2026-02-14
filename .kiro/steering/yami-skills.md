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

- **agent-browser** — Browser automation CLI for AI agents. Use when the user needs to interact with websites, including navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, or automating any browser task. Triggers include requests to "open a website", "fill out a form", "click a button", "take a screenshot", "scrape data from a page", "test this web app", "login to a site", "automate browser actions", or any task requiring programmatic web interaction.
- **brainstorming** — You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation.
- **code-branch-diff** — 当需要对比分支代码差异、查看代码变更、分析提交记录、生成 diff 报告时使用。触发词：diff, 代码对比, 分支差异, git diff, 代码变更
- **code-module-analyzer** — 当需要分析代码模块、理解代码结构、追踪调用链、生成代码文档时使用。触发词：这段代码, 帮我看看, 分析一下, 这个模块, 什么意思, 怎么实现的, 代码分析
- **code-simplifier** — 当需要简化代码、重构代码、优化代码结构、提升代码可读性、清理冗余代码时使用。触发词：simplify, refactor, clean code, 代码简化, 重构, 代码优化
- **control-browser** — 当需要使用浏览器、操作网页、验证前端效果、截图测试时使用。触发词：浏览器, 打开网页, 截图, 页面验证, playwright, chrome
- **deep-research-agent** — 当需要进行深度研究、生成研究报告、文献调研、信息综合、系统性分析某个主题时使用。触发词：research, 深度研究, 报告生成, 研究项目, 文献调研
- **dev-doc-generator** — 当需要生成开发发布文档、查看多仓库代码变更、生成技术变更报告、准备上线文档时使用。触发词：dev doc, 开发文档, 发布文档, 代码变更, 技术文档
- **doc-coauthoring** — Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, decision docs, or similar structured content. This workflow helps users efficiently transfer context, refine content through iteration, and verify the doc works for readers. Trigger when user mentions writing docs, creating proposals, drafting specs, or similar documentation tasks.
- **figma-plugin-architect** — 开发 Figma 插件时使用。生成 manifest.json、code.ts、ui.html 标准架构代码，包含 Variables API、双线程通信、类型安全最佳实践。
- **find-skills** — Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
- **fix-eslint** — Automatically fix ESLint errors by modifying code to comply with linting rules. For small codebases (≤20 errors), fixes directly. For larger codebases (>20 errors), spawns parallel agents per directory for efficient processing. Never disables rules or adds ignore comments.
- **frontend-design** — Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
- **github_kb** — 克隆 GitHub AI 仓库到本地知识库(~/github)，分析项目架构和技术栈，根据用户 AI 产品想法匹配仓库并提供技术选型和实现方案建议
- **playwright-cli** — Automates browser interactions for web testing, form filling, screenshots, and data extraction. Use when the user needs to navigate websites, interact with web pages, fill forms, take screenshots, test web applications, or extract information from web pages.
- **pptx** — Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includes: creating slide decks, pitch decks, or presentations; reading, parsing, or extracting text from any .pptx file (even if the extracted content will be used elsewhere, like in an email or summary); editing, modifying, or updating existing presentations; combining or splitting slide files; working with templates, layouts, speaker notes, or comments. Trigger whenever the user mentions \"deck,\" \"slides,\" \"presentation,\" or references a .pptx filename, regardless of what they plan to do with the content afterward. If a .pptx file needs to be opened, created, or touched, use this skill.
- **pr-create** — 当需要创建 PR、推送分支、提交代码到远程仓库时使用。触发词：pr, pull request, 创建pr, push pr, git push, 提交代码
- **pr-publish** — 当需要生成发布邮件、填写上线通知、查看 PR 合并记录、扫描 GitHub 仓库已合并 PR 时使用。触发词：发布邮件, 上线通知, PR合并, release, 发布TAG, 回滚TAG, Google Sheets 模板, gh pr list
- **ui-ux-pro-max** — UI/UX design intelligence. 50 styles, 21 palettes, 50 font pairings, 20 charts, 9 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient. Integrations: shadcn/ui MCP for component search and examples.
