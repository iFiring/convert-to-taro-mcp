/**
 * 转换工作流提示词
 * 指导整个转换工作流程
 */
import { promises as fs } from "fs";
import { z } from "zod";
/**
 * 工作流提示词输入参数架构
 */
const WorkflowPromptInputSchema = z.object({
    step: z.string().optional().describe("当前执行步骤"),
});
/**
 * 转换工作流提示词类
 * 从convertor-workflow.md文件加载工作流指导内容
 */
export class WorkflowPrompt {
    constructor() {
        this.name = "prompt-for-convertor-workflow";
        this.description = "指导整个转换工作流";
        this.arguments = WorkflowPromptInputSchema.shape;
        this.workflowFilePath = "./prompts/convertor-workflow.md";
    }
    /**
     * 生成工作流提示词
     * @param args - 提示词参数
     * @returns 提示词结果
     */
    async generate(args) {
        try {
            console.error("加载转换工作流提示词...");
            // 读取工作流文件内容
            const workflowContent = await this.loadWorkflowContent();
            // 根据步骤参数生成特定内容
            const content = this.generateContentForStep(workflowContent, args.step);
            return {
                description: "指导整个转换工作流，从当前目录中 convertor-workflow.md 获取",
                content,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`生成工作流提示词失败: ${errorMessage}`);
        }
    }
    /**
     * 加载工作流文件内容
     * @returns 工作流文件内容
     */
    async loadWorkflowContent() {
        try {
            return await fs.readFile(this.workflowFilePath, "utf-8");
        }
        catch (error) {
            throw new Error(`无法读取工作流文件 ${this.workflowFilePath}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * 根据步骤生成特定内容
     * @param workflowContent - 工作流内容
     * @param step - 当前步骤
     * @returns 生成的内容
     */
    generateContentForStep(workflowContent, step) {
        let content = workflowContent;
        if (step) {
            content += `\\n\\n## 当前执行步骤\\n\\n${step}\\n\\n请按照上述工作流程继续执行下一步操作。`;
        }
        else {
            content += `\\n\\n## 执行说明\\n\\n请按照Workflow中定义的步骤顺序执行转换任务，确保每个步骤都能正确完成后再进行下一步。`;
        }
        return content;
    }
}
//# sourceMappingURL=workflow.js.map