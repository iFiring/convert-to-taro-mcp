/**
 * SCSS语法转换提示词
 * 提供SCSS文件的语法转换方案
 */

import { promises as fs } from "fs";
import { z } from "zod";
import type { PromptResult } from "../types/index.js";

/**
 * SCSS语法提示词输入参数架构
 */
const ScssSyntaxPromptInputSchema = z.object({
  filePath: z.string().optional().describe("要转换的SCSS文件路径"),
  targetRule: z.string().optional().describe("特定的转换规则"),
});

/**
 * SCSS语法转换提示词类
 * 从scss-syntax-convertor.md文件加载SCSS转换规则
 */
export class ScssSyntaxPrompt {
  public readonly name = "prompt-for-scss-syntax-convertor";
  public readonly description = "scss 文件的语法转换方案";
  public readonly arguments = ScssSyntaxPromptInputSchema.shape;

  private readonly syntaxFilePath = "./prompts/scss-syntax-convertor.md";

  /**
   * 生成SCSS语法转换提示词
   * @param args - 提示词参数
   * @returns 提示词结果
   */
  async generate(args: z.infer<typeof ScssSyntaxPromptInputSchema>): Promise<PromptResult> {
    try {
      console.error("加载SCSS语法转换提示词...");

      // 读取语法转换规则文件内容
      const syntaxContent = await this.loadSyntaxContent();

      // 根据参数生成特定内容
      const content = this.generateContentForFile(syntaxContent, args.filePath, args.targetRule);

      return {
        description: "scss 文件的语法转换方案",
        content,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`生成SCSS语法转换提示词失败: ${errorMessage}`);
    }
  }

  /**
   * 加载语法转换规则文件内容
   * @returns 语法转换规则文件内容
   */
  private async loadSyntaxContent(): Promise<string> {
    try {
      return await fs.readFile(this.syntaxFilePath, "utf-8");
    } catch (error) {
      throw new Error(`无法读取SCSS语法转换规则文件 ${this.syntaxFilePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 根据文件路径和规则生成特定内容
   * @param syntaxContent - 语法转换规则内容
   * @param filePath - 文件路径
   * @param targetRule - 特定规则
   * @returns 生成的内容
   */
  private generateContentForFile(syntaxContent: string, filePath?: string, targetRule?: string): string {
    let content = syntaxContent;

    if (filePath) {
      content += `\\n\\n## 当前处理文件\\n\\n文件路径: ${filePath}\\n\\n请按照上述转换规则对该SCSS文件进行语法转换。`;
    }

    if (targetRule) {
      content += `\\n\\n## 重点关注规则\\n\\n${targetRule}\\n\\n请特别注意应用此规则到当前文件中。`;
    }

    content += `\\n\\n## 转换要求\\n\\n1. 严格按照上述转换规则进行修改\\n2. 确保转换后的代码语法正确\\n3. 保持原有的样式效果不变\\n4. 转换完成后标记文件状态为已转换 ✅`;

    return content;
  }
}
