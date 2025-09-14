/**
 * JSX语法转换提示词
 * 提供JSX文件的语法转换方案
 */
import { z } from "zod";
import type { PromptResult } from "../types/index.js";
/**
 * JSX语法提示词输入参数架构
 */
declare const JsxSyntaxPromptInputSchema: z.ZodObject<{
    filePath: z.ZodOptional<z.ZodString>;
    targetRule: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    filePath?: string | undefined;
    targetRule?: string | undefined;
}, {
    filePath?: string | undefined;
    targetRule?: string | undefined;
}>;
/**
 * JSX语法转换提示词类
 * 从jsx-syntax-convertor.md文件加载JSX转换规则
 */
export declare class JsxSyntaxPrompt {
    readonly name = "prompt-for-jsx-syntax-convertor";
    readonly description = "jsx \u6587\u4EF6\u7684\u8BED\u6CD5\u8F6C\u6362\u65B9\u6848";
    readonly arguments: {
        type: string;
        properties: {
            filePath: {
                type: string;
                description: string;
            };
            targetRule: {
                type: string;
                description: string;
            };
        };
        additionalProperties: boolean;
    };
    private readonly syntaxFilePath;
    /**
     * 生成JSX语法转换提示词
     * @param args - 提示词参数
     * @returns 提示词结果
     */
    generate(args: z.infer<typeof JsxSyntaxPromptInputSchema>): Promise<PromptResult>;
    /**
     * 加载语法转换规则文件内容
     * @returns 语法转换规则文件内容
     */
    private loadSyntaxContent;
    /**
     * 根据文件路径和规则生成特定内容
     * @param syntaxContent - 语法转换规则内容
     * @param filePath - 文件路径
     * @param targetRule - 特定规则
     * @returns 生成的内容
     */
    private generateContentForFile;
}
export {};
//# sourceMappingURL=jsx-syntax.d.ts.map