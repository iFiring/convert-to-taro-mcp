import { readFile } from 'fs/promises';
import { join } from 'path';
import { getPromptsPath } from '../utils.js';
export async function scssSyntaxConvertor(options = {}) {
    try {
        const { sourcePath = process.cwd() } = options;
        // 读取scanned-files.json
        const scannedFilesPath = join(sourcePath, 'scanned-files.json');
        let waitingScssFiles = '';
        try {
            const scannedContent = await readFile(scannedFilesPath, 'utf-8');
            const scannedData = JSON.parse(scannedContent);
            // 生成待处理文件列表的markdown格式
            if (scannedData.scss && scannedData.scss.length > 0) {
                waitingScssFiles = scannedData.scss.map((file) => `- ${file}`).join('\n');
            }
            else {
                waitingScssFiles = '（暂无文件）';
            }
        }
        catch (scanError) {
            waitingScssFiles = '（无法读取scanned-files.json文件）';
        }
        // 读取转换规则模板
        const conversionRulesPath = join(getPromptsPath(), 'scss-syntax-convertor.md');
        const template = await readFile(conversionRulesPath, 'utf-8');
        // 替换模板中的占位符
        const content = template.replace('{waitingScssFiles}', waitingScssFiles);
        return {
            success: true,
            content
        };
    }
    catch (error) {
        return {
            success: false,
            content: '',
            error: `读取SCSS转换规则失败: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}
