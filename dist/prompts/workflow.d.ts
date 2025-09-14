/**
 * 转换工作流提示词
 * 指导整个转换工作流程
 */
import { z } from "zod";
import type { PromptResult } from "../types/index.js";
/**
 * 工作流提示词输入参数架构
 */
declare const WorkflowPromptInputSchema: z.ZodObject<{
    step: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    step?: string | undefined;
}, {
    step?: string | undefined;
}>;
/**
 * 转换工作流提示词类
 * 从convertor-workflow.md文件加载工作流指导内容
 */
export declare class WorkflowPrompt {
    readonly name = "prompt-for-convertor-workflow";
    readonly description = "\u6307\u5BFC\u6574\u4E2A\u8F6C\u6362\u5DE5\u4F5C\u6D41";
    readonly arguments: {
        step: z.ZodOptional<z.ZodString>;
    };
    private readonly workflowFilePath;
    /**
     * 生成工作流提示词
     * @param args - 提示词参数
     * @returns 提示词结果
     */
    generate(args: z.infer<typeof WorkflowPromptInputSchema>): Promise<PromptResult>;
    /**
     * 加载工作流文件内容
     * @returns 工作流文件内容
     */
    private loadWorkflowContent;
    /**
     * 根据步骤生成特定内容
     * @param workflowContent - 工作流内容
     * @param step - 当前步骤
     * @returns 生成的内容
     */
    private generateContentForStep;
}
export {};
//# sourceMappingURL=workflow.d.ts.map