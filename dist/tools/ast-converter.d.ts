/**
 * AST转换工具
 * 执行 pnpx tarojs-cli-convertor 命令将小程序代码转换为Taro代码
 */
import { z } from "zod";
import type { ToolResult } from "../types/index.js";
/**
 * AST转换工具输入参数架构
 */
declare const AstConverterInputSchema: z.ZodObject<{
    sourcePath: z.ZodOptional<z.ZodString>;
    outputPath: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sourcePath?: string | undefined;
    outputPath?: string | undefined;
}, {
    sourcePath?: string | undefined;
    outputPath?: string | undefined;
}>;
/**
 * AST转换工具类
 * 使用Babel进行AST转换，将小程序代码转换为Taro代码
 */
export declare class AstConverterTool {
    readonly name = "tool-for-ast-convertor";
    readonly description = "\u5C06\u5C0F\u7A0B\u5E8F\u4EE3\u7801\u7528 Babel \u8F6C\u6362\u540E\uFF0C\u653E\u8FDBtaroConvert\u6587\u4EF6\u5939\u4E2D";
    readonly inputSchema: {
        type: string;
        properties: {
            sourcePath: {
                type: string;
                description: string;
            };
            outputPath: {
                type: string;
                description: string;
            };
        };
        additionalProperties: boolean;
    };
    /**
     * 执行AST转换工具
     * @param args - 工具参数
     * @returns 执行结果
     */
    execute(args: z.infer<typeof AstConverterInputSchema>): Promise<ToolResult>;
    /**
     * 执行Taro转换命令
     * @returns 命令执行结果
     */
    private runTaroConverter;
}
export {};
//# sourceMappingURL=ast-converter.d.ts.map