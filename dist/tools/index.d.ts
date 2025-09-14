/**
 * 工具管理器
 * 负责管理和执行所有MCP工具
 */
import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import type { ToolResult } from "../types/index.js";
/**
 * 工具管理器类
 * 注册和管理所有可用的工具
 */
export declare class ToolManager {
    private tools;
    constructor();
    /**
     * 注册所有工具
     */
    private registerTools;
    /**
     * 列出所有可用工具
     */
    listTools(): Tool[];
    /**
     * 调用指定工具
     * @param name - 工具名称
     * @param args - 工具参数
     * @returns 工具执行结果
     */
    callTool(name: string, args: Record<string, any>): Promise<ToolResult>;
}
//# sourceMappingURL=index.d.ts.map