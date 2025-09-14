#!/usr/bin/env node
/**
 * Convert to Taro MCP Server
 * 将微信小程序代码转换为Taro框架的MCP服务
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ErrorCode, ListPromptsRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, McpError, GetPromptRequestSchema, ReadResourceRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { ToolManager } from "./tools/index.js";
import { ResourceManager } from "./resources/index.js";
import { PromptManager } from "./prompts/index.js";
/**
 * MCP服务器类
 * 负责处理工具调用、资源访问和提示词管理
 */
class ConvertToTaroMcpServer {
    constructor() {
        this.server = new Server({
            name: "convert-to-taro-mcp",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
                resources: {},
                prompts: {},
            },
        });
        this.toolManager = new ToolManager();
        this.resourceManager = new ResourceManager();
        this.promptManager = new PromptManager();
        this.setupToolHandlers();
        this.setupResourceHandlers();
        this.setupPromptHandlers();
    }
    /**
     * 设置工具处理器
     */
    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: this.toolManager.listTools(),
            };
        });
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                const result = await this.toolManager.callTool(request.params.name, request.params.arguments || {});
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                throw new McpError(ErrorCode.InternalError, `工具执行失败: ${errorMessage}`);
            }
        });
    }
    /**
     * 设置资源处理器
     */
    setupResourceHandlers() {
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
            return {
                resources: this.resourceManager.listResources(),
            };
        });
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            try {
                const content = await this.resourceManager.readResource(request.params.uri);
                return {
                    contents: [
                        {
                            uri: request.params.uri,
                            mimeType: "text/plain",
                            text: content,
                        },
                    ],
                };
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                throw new McpError(ErrorCode.InternalError, `资源读取失败: ${errorMessage}`);
            }
        });
    }
    /**
     * 设置提示词处理器
     */
    setupPromptHandlers() {
        this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
            return {
                prompts: this.promptManager.listPrompts(),
            };
        });
        this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
            try {
                const prompt = await this.promptManager.getPrompt(request.params.name, request.params.arguments || {});
                return {
                    description: prompt.description,
                    messages: [
                        {
                            role: "user",
                            content: {
                                type: "text",
                                text: prompt.content,
                            },
                        },
                    ],
                };
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                throw new McpError(ErrorCode.InternalError, `提示词获取失败: ${errorMessage}`);
            }
        });
    }
    /**
     * 启动服务器
     */
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error("Convert to Taro MCP server running on stdio");
    }
}
/**
 * 主函数
 * 启动MCP服务器
 */
async function main() {
    const server = new ConvertToTaroMcpServer();
    await server.run();
}
// 如果直接运行此文件，则启动服务器
main().catch((error) => {
    console.error("服务器启动失败:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map