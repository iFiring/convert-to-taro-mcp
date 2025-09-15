#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';

import { convertorWorkflow } from './tools/convertor-workflow.js';
import { astConvertor, type AstConvertorOptions } from './tools/ast-convertor.js';
import { scanFiles } from './tools/scan-files.js';
import { jsxSyntaxConvertor } from './tools/jsx-syntax-convertor.js';
import { scssSyntaxConvertor } from './tools/scss-syntax-convertor.js';

// 定义工具列表
const tools: Tool[] = [
  {
    name: 'convertor-workflow',
    description: '开始小程序转Taro的工作流',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    }
  },
  {
    name: 'ast-convertor',
    description: '对小程序代码进行预处理',
    inputSchema: {
      type: 'object',
      properties: {
        sourcePath: {
          type: 'string',
          description: '源代码路径，默认为当前目录'
        },
        outputPath: {
          type: 'string',
          description: '输出路径，默认为 taroConvert'
        }
      },
      additionalProperties: false
    }
  },
  {
    name: 'scan-files',
    description: '扫描taroConvert文件夹下的文件结构',
    inputSchema: {
      type: 'object',
      properties: {
        sourcePath: {
          type: 'string',
          description: '项目根目录路径，默认为当前工作目录'
        }
      },
      additionalProperties: false
    }
  },
  {
    name: 'jsx-syntax-convertor',
    description: 'jsx 文件的语法转换方案',
    inputSchema: {
      type: 'object',
      properties: {
        sourcePath: {
          type: 'string',
          description: '项目根目录路径，默认为当前工作目录'
        }
      },
      additionalProperties: false
    }
  },
  {
    name: 'scss-syntax-convertor',
    description: 'scss 文件的语法转换方案',
    inputSchema: {
      type: 'object',
      properties: {
        sourcePath: {
          type: 'string',
          description: '项目根目录路径，默认为当前工作目录'
        }
      },
      additionalProperties: false
    }
  }
];

// 创建服务器实例
const server = new Server(
  {
    name: 'convert-to-taro-mcp',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// 注册工具列表处理器
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools
  };
});

// 注册工具调用处理器
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'convertor-workflow': {
        const result = await convertorWorkflow();
        return {
          content: [
            {
              type: 'text',
              text: result.success
                ? `工作流程:\n\n${result.workflow}`
                : `错误: ${result.error}`
            }
          ]
        };
      }

      case 'ast-convertor': {
        const options: AstConvertorOptions = {
          sourcePath: args?.sourcePath as string,
          outputPath: args?.outputPath as string
        };
        const result = await astConvertor(options);
        return {
          content: [
            {
              type: 'text',
              text: result.success
                ? `${result.message}\n输出路径: ${result.outputPath || 'taroConvert'}`
                : `错误: ${result.error}`
            }
          ]
        };
      }

      case 'scan-files': {
        const options = {
          sourcePath: args?.sourcePath as string
        };
        const result = await scanFiles(options);
        if (result.success) {
          const { jsx, scss } = result.scannedFiles;
          const summary = `扫描完成!\n\n找到的文件:\n- JSX文件(包含JS): ${jsx.length}个\n- SCSS文件: ${scss.length}个\n\n已生成 scanned-files.json 文件`;
          return {
            content: [
              {
                type: 'text',
                text: summary
              }
            ]
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `错误: ${result.error}`
              }
            ]
          };
        }
      }

      case 'jsx-syntax-convertor': {
        const options = {
          sourcePath: args?.sourcePath as string
        };
        const result = await jsxSyntaxConvertor(options);
        return {
          content: [
            {
              type: 'text',
              text: result.success 
                ? `JSX语法转换方案:\n\n${result.content}`
                : `错误: ${result.error}`
            }
          ]
        };
      }

      case 'scss-syntax-convertor': {
        const options = {
          sourcePath: args?.sourcePath as string
        };
        const result = await scssSyntaxConvertor(options);
        return {
          content: [
            {
              type: 'text',
              text: result.success 
                ? `SCSS语法方案:\n\n${result.content}`
                : `错误: ${result.error}`
            }
          ]
        };
      }

      default:
        throw new Error(`未知的工具: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `执行工具 ${name} 时发生错误: ${error instanceof Error ? error.message : String(error)}`
        }
      ],
      isError: true
    };
  }
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Convert-to-Taro MCP 服务器已启动');
}

main().catch((error) => {
  console.error('启动服务器失败:', error);
  process.exit(1);
});

export { server };
