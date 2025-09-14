/**
 * 类型定义文件
 * 定义项目中使用的所有TypeScript类型和Zod架构
 */

import { z } from "zod";

/**
 * 工具执行结果架构
 */
export const ToolResultSchema = z.object({
  success: z.boolean().describe("工具执行是否成功"),
  message: z.string().describe("执行结果消息"),
  data: z.any().optional().describe("执行结果数据"),
  error: z.string().optional().describe("错误信息"),
});

/**
 * 工具执行结果类型
 */
export type ToolResult = z.infer<typeof ToolResultSchema>;

/**
 * 文件扫描结果架构
 */
export const FileInfoSchema = z.object({
  path: z.string().describe("文件路径"),
  type: z.enum(["jsx", "js", "scss"]).describe("文件类型"),
  converted: z.boolean().default(false).describe("是否已转换"),
});

/**
 * 文件扫描结果类型
 */
export type FileInfo = z.infer<typeof FileInfoSchema>;

/**
 * 扫描文件夹结果架构
 */
export const ScanResultSchema = z.object({
  jsx: z.array(FileInfoSchema).describe("JSX文件列表"),
  js: z.array(FileInfoSchema).describe("JS文件列表"),
  scss: z.array(FileInfoSchema).describe("SCSS文件列表"),
});

/**
 * 扫描文件夹结果类型
 */
export type ScanResult = z.infer<typeof ScanResultSchema>;

/**
 * 提示词结果架构
 */
export const PromptResultSchema = z.object({
  description: z.string().describe("提示词描述"),
  content: z.string().describe("提示词内容"),
});

/**
 * 提示词结果类型
 */
export type PromptResult = z.infer<typeof PromptResultSchema>;
