import { readFile } from 'fs/promises';
import { join } from 'path';
import { getPromptsPath } from '../utils.js';
export async function jsSyntaxConvertor() {
    try {
        const conversionRulesPath = join(getPromptsPath(), 'js-syntax-convertor.md');
        const content = await readFile(conversionRulesPath, 'utf-8');
        return {
            success: true,
            content
        };
    }
    catch (error) {
        return {
            success: false,
            content: '',
            error: `读取JS转换规则失败: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}
