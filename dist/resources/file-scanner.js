/**
 * 文件扫描资源
 * 扫描taroConvert文件夹下的文件并生成scanned-files.md
 */
import { glob } from "glob";
import { promises as fs } from "fs";
import { relative } from "path";
/**
 * 文件扫描资源类
 * 扫描taroConvert目录中的jsx、js、scss文件
 */
export class FileScannerResource {
    constructor() {
        this.uri = "resource://scan-files";
        this.name = "resource-for-scan-files";
        this.description = "扫描taroConvert文件夹下的文件结构";
        this.mimeType = "text/markdown";
        this.taroConvertPath = "./taroConvert";
        this.outputPath = "./prompts/scanned-files.md";
    }
    /**
     * 读取资源内容，执行文件扫描并返回结果
     * @returns 扫描结果的Markdown内容
     */
    async read() {
        try {
            console.error("开始扫描taroConvert文件夹...");
            // 检查taroConvert目录是否存在
            const dirExists = await this.checkDirectoryExists(this.taroConvertPath);
            if (!dirExists) {
                throw new Error(`taroConvert目录不存在: ${this.taroConvertPath}`);
            }
            // 扫描文件
            const scanResult = await this.scanFiles();
            // 生成Markdown内容
            const markdownContent = this.generateMarkdown(scanResult);
            // 写入文件
            await this.writeScannedFiles(markdownContent);
            console.error(`文件扫描完成，结果已保存到: ${this.outputPath}`);
            return markdownContent;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("文件扫描失败:", errorMessage);
            throw new Error(`文件扫描失败: ${errorMessage}`);
        }
    }
    /**
     * 检查目录是否存在
     * @param dirPath - 目录路径
     * @returns 目录是否存在
     */
    async checkDirectoryExists(dirPath) {
        try {
            const stats = await fs.stat(dirPath);
            return stats.isDirectory();
        }
        catch {
            return false;
        }
    }
    /**
     * 扫描taroConvert目录中的文件
     * @returns 扫描结果
     */
    async scanFiles() {
        const patterns = [
            `${this.taroConvertPath}/**/*.jsx`,
            `${this.taroConvertPath}/**/*.js`,
            `${this.taroConvertPath}/**/*.scss`,
        ];
        const excludePatterns = [
            "**/*.config.js",
            "**/app.*.*",
        ];
        const result = {
            jsx: [],
            js: [],
            scss: [],
        };
        for (const pattern of patterns) {
            console.error(`扫描模式: ${pattern}`);
            const files = await glob(pattern, {
                ignore: excludePatterns,
            });
            for (const filePath of files) {
                const relativePath = relative(".", filePath);
                const extension = this.getFileExtension(filePath);
                const fileInfo = {
                    path: relativePath,
                    type: extension,
                    converted: false,
                };
                if (extension === "jsx") {
                    result.jsx.push(fileInfo);
                }
                else if (extension === "js") {
                    result.js.push(fileInfo);
                }
                else if (extension === "scss") {
                    result.scss.push(fileInfo);
                }
            }
        }
        console.error(`扫描完成，找到文件: jsx(${result.jsx.length}), js(${result.js.length}), scss(${result.scss.length})`);
        return result;
    }
    /**
     * 获取文件扩展名
     * @param filePath - 文件路径
     * @returns 文件扩展名
     */
    getFileExtension(filePath) {
        const match = filePath.match(/\\.([^.]+)$/);
        return match ? match[1] : "";
    }
    /**
     * 生成Markdown内容
     * @param scanResult - 扫描结果
     * @returns Markdown内容
     */
    generateMarkdown(scanResult) {
        const lines = [];
        lines.push("# 待转换文件");
        lines.push("");
        // JSX文件
        lines.push("## jsx 文件");
        if (scanResult.jsx.length === 0) {
            lines.push("- 未找到jsx文件");
        }
        else {
            for (const file of scanResult.jsx) {
                const checkbox = file.converted ? "[x]" : "[ ]";
                lines.push(`- ${checkbox} ${file.path}`);
            }
        }
        lines.push("");
        lines.push("");
        // JS文件
        lines.push("## js 文件");
        if (scanResult.js.length === 0) {
            lines.push("- 未找到js文件");
        }
        else {
            for (const file of scanResult.js) {
                const checkbox = file.converted ? "[x]" : "[ ]";
                lines.push(`- ${checkbox} ${file.path}`);
            }
        }
        lines.push("");
        // SCSS文件
        lines.push("## scss 文件");
        if (scanResult.scss.length === 0) {
            lines.push("- 未找到scss文件");
        }
        else {
            for (const file of scanResult.scss) {
                const checkbox = file.converted ? "[x]" : "[ ]";
                lines.push(`- ${checkbox} ${file.path}`);
            }
        }
        return lines.join("\\n");
    }
    /**
     * 写入扫描结果到文件
     * @param content - Markdown内容
     */
    async writeScannedFiles(content) {
        try {
            // 确保目录存在
            const dir = this.outputPath.substring(0, this.outputPath.lastIndexOf("/"));
            await fs.mkdir(dir, { recursive: true });
            // 写入文件
            await fs.writeFile(this.outputPath, content, "utf-8");
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`写入扫描结果失败: ${errorMessage}`);
        }
    }
}
//# sourceMappingURL=file-scanner.js.map