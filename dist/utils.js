import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// 获取MCP服务器的根目录路径
export function getMCPRootPath() {
    // 获取当前模块的文件路径
    const currentModulePath = fileURLToPath(import.meta.url);
    // 从 src/utils.ts 向上两级到达项目根目录
    return dirname(dirname(currentModulePath));
}
// 获取prompts目录的路径
export function getPromptsPath() {
    return join(getMCPRootPath(), 'prompts');
}
