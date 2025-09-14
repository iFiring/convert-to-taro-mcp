/**
 * 文件扫描资源
 * 扫描taroConvert文件夹下的文件并生成scanned-files.md
 */
/**
 * 文件扫描资源类
 * 扫描taroConvert目录中的jsx、js、scss文件
 */
export declare class FileScannerResource {
    readonly uri = "resource://scan-files";
    readonly name = "resource-for-scan-files";
    readonly description = "\u626B\u63CFtaroConvert\u6587\u4EF6\u5939\u4E0B\u7684\u6587\u4EF6\u7ED3\u6784";
    readonly mimeType = "text/markdown";
    private readonly taroConvertPath;
    private readonly outputPath;
    /**
     * 读取资源内容，执行文件扫描并返回结果
     * @returns 扫描结果的Markdown内容
     */
    read(): Promise<string>;
    /**
     * 检查目录是否存在
     * @param dirPath - 目录路径
     * @returns 目录是否存在
     */
    private checkDirectoryExists;
    /**
     * 扫描taroConvert目录中的文件
     * @returns 扫描结果
     */
    private scanFiles;
    /**
     * 获取文件扩展名
     * @param filePath - 文件路径
     * @returns 文件扩展名
     */
    private getFileExtension;
    /**
     * 生成Markdown内容
     * @param scanResult - 扫描结果
     * @returns Markdown内容
     */
    private generateMarkdown;
    /**
     * 写入扫描结果到文件
     * @param content - Markdown内容
     */
    private writeScannedFiles;
}
//# sourceMappingURL=file-scanner.d.ts.map