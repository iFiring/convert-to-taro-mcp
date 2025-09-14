/**
 * 提示词管理器
 * 负责管理和提供MCP提示词
 */

import type { Prompt } from "@modelcontextprotocol/sdk/types.js";
import { WorkflowPrompt } from "./workflow.js";
import { JsxSyntaxPrompt } from "./jsx-syntax.js";
import { JsSyntaxPrompt } from "./js-syntax.js";
import { ScssSyntaxPrompt } from "./scss-syntax.js";
import type { PromptResult } from "../types/index.js";

/**
 * 提示词管理器类
 * 注册和管理所有可用的提示词
 */
export class PromptManager {
  private prompts: Map<string, any> = new Map();

  constructor() {
    this.registerPrompts();
  }

  /**
   * 注册所有提示词
   */
  private registerPrompts(): void {
    const workflowPrompt = new WorkflowPrompt();
    const jsxSyntaxPrompt = new JsxSyntaxPrompt();
    const jsSyntaxPrompt = new JsSyntaxPrompt();
    const scssSyntaxPrompt = new ScssSyntaxPrompt();

    this.prompts.set("prompt-for-convertor-workflow", workflowPrompt);
    this.prompts.set("prompt-for-jsx-syntax-convertor", jsxSyntaxPrompt);
    this.prompts.set("prompt-for-js-syntax-convertor", jsSyntaxPrompt);
    this.prompts.set("prompt-for-scss-syntax-convertor", scssSyntaxPrompt);
  }

  /**
   * 列出所有可用提示词
   */
  listPrompts(): Prompt[] {
    return Array.from(this.prompts.values()).map((prompt) => ({
      name: prompt.name,
      description: prompt.description,
      arguments: prompt.arguments,
    }));
  }

  /**
   * 获取指定提示词
   * @param name - 提示词名称
   * @param args - 提示词参数
   * @returns 提示词内容
   */
  async getPrompt(name: string, args: Record<string, any>): Promise<PromptResult> {
    const prompt = this.prompts.get(name);
    if (!prompt) {
      throw new Error(`提示词未找到: ${name}`);
    }

    try {
      return await prompt.generate(args);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`生成提示词失败: ${errorMessage}`);
    }
  }
}
