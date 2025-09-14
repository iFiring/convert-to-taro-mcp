/**
 * 提示词管理器
 * 负责管理和提供MCP提示词
 */
import type { Prompt } from "@modelcontextprotocol/sdk/types.js";
import type { PromptResult } from "../types/index.js";
/**
 * 提示词管理器类
 * 注册和管理所有可用的提示词
 */
export declare class PromptManager {
    private prompts;
    constructor();
    /**
     * 注册所有提示词
     */
    private registerPrompts;
    /**
     * 列出所有可用提示词
     */
    listPrompts(): Prompt[];
    /**
     * 获取指定提示词
     * @param name - 提示词名称
     * @param args - 提示词参数
     * @returns 提示词内容
     */
    getPrompt(name: string, args: Record<string, any>): Promise<PromptResult>;
}
//# sourceMappingURL=index.d.ts.map