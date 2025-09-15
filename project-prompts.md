# 需求描述

开发一个基于 Node.js + Typescript 的MCP服务。

# MCP描述

- 项目名称为convert-to-taro-mcp，负责将微信小程序代码转换为Taro框架的代码。
- 项目包含 6 个 tools，其中 convertor-workflow 负责指导整个工作流；ast-convertor 负责对小程序代码进行预处理；scan-files 负责扫描预处理后的文件；jsx-syntax-convertor负责处理转换后的jsx文件；js-syntax-convertor 负责处理转换后的js文件；scss-syntax-convertor负责处理转换后的js文件。

# 具体功能

- tools: convertor-workflow
    - 描述：开始小程序转Taro的工作流
    - 功能：从当前目录中 prompts/convertor-workflow.md 读取工作流。

- tools: ast-convertor
    - 描述：对小程序代码进行预处理
    - 功能：执行命令`pnpx tarojs-cli-convertor`，该命令会将小程序代码用Babel转换后，放进taroConvert文件夹中。

- tools: scan-files
    - 描述：扫描taroConvert文件夹下的文件结构
    - 功能：扫描taroConvert文件夹下的 \*.jsx，\*.js，\*.scss 文件，其中\*.config.js，app.\*.\* 可跳过，将扫描出来的文件，按照类型jsx，js，scss分类，放进 scanned-files.json 文件里。

- tools: jsx-syntax-convertor
    - 描述：jsx 文件的语法转换方案
    - 功能：方案从当前目录中 prompts/jsx-syntax-convertor.md 读取。

- tools: scss-syntax-convertor
    - 描述：scss 文件的语法转换方案
    - 功能：方案从当前目录中 prompts/scss-syntax-convertor.md 读取。

# MCP 开发规范

- 采用 modelcontextprotocol 的 typescript-sdk
- 采用 stdio 协议，可用于npx命令
- 采用 pnpm 包管理器