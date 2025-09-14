# Convert to Taro MCP 服务

将微信小程序代码转换为Taro框架的MCP服务。

## 功能概述

这个MCP服务提供了完整的微信小程序到Taro框架的转换流程，包括：

1. **AST转换工具** - 执行`pnpx tarojs-cli-convertor`命令进行初步转换
2. **文件扫描资源** - 扫描转换后的文件结构并生成待处理文件列表
3. **语法转换提示词** - 提供JSX、JS、SCSS文件的语法转换指导

## 安装和使用

### 1. 安装依赖

```bash
pnpm install
```

### 2. 构建项目

```bash
pnpm run build
```

### 3. 作为MCP服务使用

在你的MCP客户端配置中添加：

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

或者直接使用：

```bash
npx convert-to-taro-mcp
```

## MCP组件

### 工具 (Tools)

#### `tool-for-ast-convertor`
- **描述**: 将小程序代码用Babel转换后，放进taroConvert文件夹中
- **功能**: 执行`pnpx tarojs-cli-convertor`命令
- **参数**: 
  - `sourcePath` (可选): 源代码路径，默认为当前目录
  - `outputPath` (可选): 输出路径，默认为taroConvert

### 资源 (Resources)

#### `resource-for-scan-files`
- **描述**: 扫描taroConvert文件夹下的文件结构
- **功能**: 扫描*.jsx、*.js、*.scss文件并生成scanned-files.md
- **URI**: `resource://scan-files`

### 提示词 (Prompts)

#### `prompt-for-convertor-workflow`
- **描述**: 指导整个转换工作流
- **来源**: `prompts/convertor-workflow.md`

#### `prompt-for-jsx-syntax-convertor`
- **描述**: JSX文件的语法转换方案
- **来源**: `prompts/jsx-syntax-convertor.md`

#### `prompt-for-js-syntax-convertor`
- **描述**: JS文件的语法转换方案
- **来源**: `prompts/js-syntax-convertor.md`

#### `prompt-for-scss-syntax-convertor`
- **描述**: SCSS文件的语法转换方案
- **来源**: `prompts/scss-syntax-convertor.md`

## 转换流程

1. **初始化转换**: 使用`tool-for-ast-convertor`执行Babel AST转换
2. **扫描文件**: 使用`resource-for-scan-files`扫描转换后的文件
3. **语法转换**: 根据生成的文件列表，使用对应的语法转换提示词进行手动转换
4. **完成验证**: 确保所有文件转换完成并通过语法检查

## 项目结构

```
src/
├── index.ts              # MCP服务入口
├── types/                # 类型定义
├── tools/                # 工具实现
│   ├── index.ts         # 工具管理器
│   └── ast-converter.ts # AST转换工具
├── resources/            # 资源实现
│   ├── index.ts         # 资源管理器
│   └── file-scanner.ts  # 文件扫描资源
└── prompts/              # 提示词实现
    ├── index.ts         # 提示词管理器
    ├── workflow.ts      # 工作流提示词
    ├── jsx-syntax.ts    # JSX语法转换提示词
    ├── js-syntax.ts     # JS语法转换提示词
    └── scss-syntax.ts   # SCSS语法转换提示词
```

## 开发

### 开发模式

```bash
pnpm run dev
```

### 构建

```bash
pnpm run build
```

## 技术栈

- TypeScript
- Node.js
- Model Context Protocol SDK
- Zod (数据验证)
- Lodash (工具函数)
- Glob (文件匹配)

## 许可证

MIT
