/**
 * 类型定义文件
 * 定义项目中使用的所有TypeScript类型和Zod架构
 */
import { z } from "zod";
/**
 * 工具执行结果架构
 */
export declare const ToolResultSchema: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    data: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    message: string;
    data?: any;
    error?: string | undefined;
}, {
    success: boolean;
    message: string;
    data?: any;
    error?: string | undefined;
}>;
/**
 * 工具执行结果类型
 */
export type ToolResult = z.infer<typeof ToolResultSchema>;
/**
 * 文件扫描结果架构
 */
export declare const FileInfoSchema: z.ZodObject<{
    path: z.ZodString;
    type: z.ZodEnum<["jsx", "js", "scss"]>;
    converted: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: "jsx" | "js" | "scss";
    converted: boolean;
}, {
    path: string;
    type: "jsx" | "js" | "scss";
    converted?: boolean | undefined;
}>;
/**
 * 文件扫描结果类型
 */
export type FileInfo = z.infer<typeof FileInfoSchema>;
/**
 * 扫描文件夹结果架构
 */
export declare const ScanResultSchema: z.ZodObject<{
    jsx: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        type: z.ZodEnum<["jsx", "js", "scss"]>;
        converted: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "jsx" | "js" | "scss";
        converted: boolean;
    }, {
        path: string;
        type: "jsx" | "js" | "scss";
        converted?: boolean | undefined;
    }>, "many">;
    js: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        type: z.ZodEnum<["jsx", "js", "scss"]>;
        converted: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "jsx" | "js" | "scss";
        converted: boolean;
    }, {
        path: string;
        type: "jsx" | "js" | "scss";
        converted?: boolean | undefined;
    }>, "many">;
    scss: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        type: z.ZodEnum<["jsx", "js", "scss"]>;
        converted: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "jsx" | "js" | "scss";
        converted: boolean;
    }, {
        path: string;
        type: "jsx" | "js" | "scss";
        converted?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    jsx: {
        path: string;
        type: "jsx" | "js" | "scss";
        converted: boolean;
    }[];
    js: {
        path: string;
        type: "jsx" | "js" | "scss";
        converted: boolean;
    }[];
    scss: {
        path: string;
        type: "jsx" | "js" | "scss";
        converted: boolean;
    }[];
}, {
    jsx: {
        path: string;
        type: "jsx" | "js" | "scss";
        converted?: boolean | undefined;
    }[];
    js: {
        path: string;
        type: "jsx" | "js" | "scss";
        converted?: boolean | undefined;
    }[];
    scss: {
        path: string;
        type: "jsx" | "js" | "scss";
        converted?: boolean | undefined;
    }[];
}>;
/**
 * 扫描文件夹结果类型
 */
export type ScanResult = z.infer<typeof ScanResultSchema>;
/**
 * 提示词结果架构
 */
export declare const PromptResultSchema: z.ZodObject<{
    description: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    content: string;
}, {
    description: string;
    content: string;
}>;
/**
 * 提示词结果类型
 */
export type PromptResult = z.infer<typeof PromptResultSchema>;
//# sourceMappingURL=index.d.ts.map