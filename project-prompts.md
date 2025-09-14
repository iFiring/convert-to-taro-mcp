# 需求描述

开发一个基于 Node.js + Typescript 的MCP服务。

# MCP描述

- 项目名称为convert-to-taro-mcp，负责将微信小程序代码转换为Taro框架的代码。
- 具体流程是：先用Babel生成AST抽象语法树，替换其中包名，API，标签名和标签属性，将小程序代码转换成Taro代码，放进项目目录的taroConvert中，该功能可以执行现成的npx命令`pnpx tarojs-cli-convertor`，无需重复开发；将代码转换之后，打开taroConvert文件夹，扫描文件夹下的 \*.jsx，\*.js，\*.scss 文件；等文件扫描完之后，对这些文件中一些 AST 无法转换的语法进行语义化转换，修复兼容问题；代码全都转换完成后，结束服务。
- 包含 tools ，prompts 和resource。其中tools需要运行npx命令，对本地代码用npx命令来转换；resource要对转换后的taroConvert文件夹进行扫描；prompts需要按照规则，对扫描的文件内容进行语法转换，直至转换完成。

# 具体功能

- prompts: prompt-for-convertor-workflow
    - 描述：指导整个转换工作流。
    - 功能：核心提示词，对整个流程进行指导，从当前目录中 convertor-workflow.md 获取。

- tools: tool-for-ast-convertor
    - 描述：将小程序代码用 Babel 转换后，放进taroConvert文件夹中。
    - 功能：执行命令`pnpx tarojs-cli-convertor`，该命令会将小程序代码用Babel的AST转换后，放进taroConvert文件夹中。

- resources: resource-for-scan-files
    - 描述：扫描taroConvert文件夹下的文件结构。
    - 功能：扫描taroConvert文件夹下的 \*.jsx，\*.js，\*.scss 文件，其中\*.config.js，app.\*.\* 可跳过，将扫描出来的文件，按照类型jsx，js，scss分类，放进 scanned-files.md 文件里，结构从当前目录中 prompts/scanned-files.md 获取。

- prompts: prompt-for-jsx-syntax-convertor
    - 描述：jsx 文件的语法转换方案。
    - 功能：方案从当前目录中 prompts/jsx-syntax-convertor.md 获取。

- prompts: prompt-for-js-syntax-convertor
    - 描述：js 文件的语法转换方案。
    - 功能：方案从当前目录中 prompts/js-syntax-convertor.md 获取。

- prompts: prompt-for-scss-syntax-convertor
    - 描述：scss 文件的语法转换方案。
    - 功能：方案从当前目录中 prompts/scss-syntax-convertor.md 获取。

# MCP 开发规范

- 采用 modelcontextprotocol 的 typescript-sdk
- 采用 stdio 协议，可用于npx命令
- 采用 pnpm 包管理器