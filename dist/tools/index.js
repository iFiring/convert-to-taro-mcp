/**
 * 工具管理器
 * 负责管理和执行所有MCP工具
 */
import { AstConverterTool } from "./ast-converter.js";
/**
 * 工具管理器类
 * 注册和管理所有可用的工具
 */
export class ToolManager {
    constructor() {
        this.tools = new Map();
        this.registerTools();
    }
    /**
     * 注册所有工具
     */
    registerTools() {
        const astConverter = new AstConverterTool();
        this.tools.set("tool-for-ast-convertor", astConverter);
    }
    /**
     * 列出所有可用工具
     */
    listTools() {
        return Array.from(this.tools.values()).map((tool) => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
        }));
    }
    /**
     * 调用指定工具
     * @param name - 工具名称
     * @param args - 工具参数
     * @returns 工具执行结果
     */
    async callTool(name, args) {
        const tool = this.tools.get(name);
        if (!tool) {
            throw new Error(`工具未找到: ${name}`);
        }
        try {
            return await tool.execute(args);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                success: false,
                message: `工具执行失败: ${errorMessage}`,
                error: errorMessage,
            };
        }
    }
}
//# sourceMappingURL=index.js.map