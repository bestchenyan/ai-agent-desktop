# AI Agent Desktop (Pure)

Electron + React + TypeScript 跨平台桌面应用模板，使用 electron-vite 进行开发与构建，electron-forge 进行打包与发行，采用 pnpm monorepo 管理。

## 技术栈

- Electron 37
- React 19 + TypeScript 5
- electron-vite 4（多进程一体化开发与构建）
- electron-forge 7（打包发行，Windows Squirrel、macOS DMG）
- ESLint 9 + Prettier
- pnpm workspace（Monorepo）

## 项目目录结构

```text
ai-agent-desktop-pure/
├─ src/
│  ├─ main/           # 主进程代码（Electron 主进程）
│  ├─ preload/        # 预加载脚本（隔离上下文、桥接 API）
│  └─ renderer/       # 渲染进程（React 应用）
│     └─ src/
│        ├─ components/  # 组件（含 UI 组件）
│        ├─ styles/      # 全局样式
│        └─ utils/       # 前端工具函数
│
├─ packages/
│  └─ common/
│     └─ electron-build/  # 自定义打包辅助库（供 forge 使用）
│        ├─ src/
│        │  ├─ findUp.ts
│        │  ├─ getPackageDependencies.ts
│        │  └─ hooks/
│        │     ├─ index.ts
│        │     └─ postMake.ts
│        └─ rslib.config.ts
│
├─ scripts/
│  └─ getExternalPkgs.ts  # 解析需要外置/保留的依赖
│
├─ resources/  # 应用图标等资源
├─ static/     # DMG 背景等静态资源
├─ forge.config.ts         # electron-forge 打包配置（makers、hooks 等）
├─ electron.vite.config.ts # electron-vite 配置
├─ eslint.config.mjs       # ESLint Flat 配置
├─ pnpm-workspace.yaml     # 工作区定义
└─ package.json
```

## 快速开始

### 安装依赖

```bash
pnpm bootstrap
```

### 本地开发

```bash
# 推荐：一体化调试（主进程 / 预加载 / 渲染进程）
pnpm dev

# 备选：使用 electron-forge 启动（更贴近打包运行环境）
pnpm start
```

### 代码质量

```bash
# 代码检查并自动修复（与 CI 同步的规则）
pnpm lint

# 代码格式化
pnpm format

# 类型检查（分别检查 Node / Web 配置）
pnpm typecheck
pnpm typecheck:node
pnpm typecheck:web
```

### 构建与打包

```bash
# 清理 + 类型检查 + 构建 + 打包（生成发行产物）
pnpm build

# 仅生成打包产物（使用 forge）
pnpm make

# 清理构建目录
pnpm clean
```

构建产物示例：

- Windows：Squirrel 安装包（`out/make/squirrel.windows/x64/...`）
- macOS：DMG（`out/make/.../*.dmg`）
- 额外：根据 `forge.config.ts` 中 makers 配置，也会生成 ZIP 等格式

## IDE 与开发规范

- 推荐 VSCode，并安装扩展：ESLint、Prettier。仓库内 `.vscode/` 已提供推荐与配置。
- 若编辑器未显示 ESLint 报错，请确认：
  - VSCode 已安装并启用 `ESLint` 扩展
  - 工作区设置开启 Flat Config 兼容：`"eslint.experimental.useFlatConfig": true`
  - 文件类型已被 ESLint 校验：`eslint.validate` 包含 `javascript/typescript/react`

## 常见问题

- 依赖未被打进 asar 或需要保留在 `node_modules` 中，可在 `scripts/getExternalPkgs.ts` 与 `packages/common/electron-build` 内的逻辑中维护（`keepModules`、`getExternalPkgsDependencies` 等）。
- macOS 签名与公证请配置环境变量：`APPLE_ID`、`APPLE_PASSWORD`、`APPLE_TEAM_ID`（详见 `forge.config.ts`）。
