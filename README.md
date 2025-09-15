# Convert-to-Taro MCP

一个基于 Model Context Protocol (MCP) 的服务，用于将微信小程序代码转换为 Taro 框架代码。

## 功能特性

这个 MCP 服务提供了 5 个工具来帮助完成小程序到 Taro 的转换工作流：

### 1. convertor-workflow
- **描述**：开始小程序转Taro的工作流
- **功能**：从 `prompts/convertor-workflow.md` 读取完整的工作流程指导

### 2. ast-convertor
- **描述**：对小程序代码进行预处理
- **功能**：执行 `pnpx tarojs-cli-convertor` 命令，将小程序代码用 Babel 转换后放入 `taroConvert` 文件夹
- **参数**：
  - `sourcePath` (可选): 源代码路径，默认为当前目录
  - `outputPath` (可选): 输出路径，默认为 taroConvert

### 3. scan-files
- **描述**：扫描 taroConvert 文件夹下的文件结构
- **功能**：扫描 `*.jsx`、`*.js`、`*.scss` 文件（跳过 `*.config.js` 和 `app.*.*` 文件），JS文件合并到JSX分类中，生成 `scanned-files.json`
- **参数**：
  - `sourcePath` (可选): 项目根目录路径，默认为当前工作目录

### 4. jsx-syntax-convertor
- **描述**：JSX 文件的语法转换方案
- **功能**：解析 `scanned-files.json` 中的jsx文件列表，动态填入转换规则模板，返回完整的转换指导
- **参数**：
  - `sourcePath` (可选): 项目根目录路径，默认为当前工作目录

### 5. scss-syntax-convertor
- **描述**：SCSS 文件的语法转换方案
- **功能**：解析 `scanned-files.json` 中的scss文件列表，动态填入转换规则模板，返回完整的转换指导
- **参数**：
  - `sourcePath` (可选): 项目根目录路径，默认为当前工作目录

## 安装和使用

### 前置要求
- Node.js >= 18
- pnpm 包管理器

### 安装依赖
```bash
pnpm install
```

### 构建项目
```bash
pnpm run build
```

### 作为 MCP 服务运行
```json
{
  "mcpServers": {
    "convert-to-taro": {
      "command": "npx",
      "args": ["convert-to-taro-mcp"]
    }
  }
}
```

# 或者通过 npx 运行
```bash
# 构建后运行
npx convert-to-taro-mcp
```

## 工作流程

1. **开始工作流**: 使用 `convertor-workflow` 获取完整的转换指导
2. **预处理代码**: 使用 `ast-convertor` 对小程序代码进行初步转换
3. **扫描文件**: 使用 `scan-files` 扫描转换后的文件结构并生成 `scanned-files.json`
4. **语法转换**: 分别使用 `jsx-syntax-convertor`、`scss-syntax-convertor` 获取动态的转换规则（包含具体文件列表）
5. **逐步转换**: 根据转换规则逐一处理 `scanned-files.json` 中的文件
6. **完成转换**: 所有文件处理完成后输出转换报告

## 项目结构

```
convert-to-taro-mcp/
├── src/
│   ├── tools/           # 各个工具的实现
│   ├── types.ts         # 类型定义
│   └── index.ts         # MCP 服务器主文件
├── prompts/             # 工作流和转换规则文档
├── package.json
├── tsconfig.json
└── README.md
```

## 技术栈

- **运行时**: Node.js + TypeScript
- **协议**: Model Context Protocol (MCP)
- **通信**: stdio 协议
- **包管理**: pnpm

