import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, extname, relative } from 'path';
import { getPromptsPath } from '../utils.js';
async function getAllFiles(dir, extensions) {
    const files = [];
    try {
        const entries = await readdir(dir);
        for (const entry of entries) {
            const fullPath = join(dir, entry);
            const stats = await stat(fullPath);
            if (stats.isDirectory()) {
                const subFiles = await getAllFiles(fullPath, extensions);
                files.push(...subFiles);
            }
            else if (stats.isFile()) {
                const ext = extname(entry);
                if (extensions.includes(ext)) {
                    // 跳过不需要转换的文件
                    const shouldSkip = entry.includes('.config.js') || // 配置文件
                        entry.startsWith('app.') || // app相关文件
                        fullPath.includes('/config/') || // config目录
                        fullPath.includes('/dist/') || // dist目录
                        fullPath.includes('/report/') || // report目录
                        fullPath.includes('/.convert/') || // .convert目录
                        entry === 'babel.config.js' || // babel配置
                        entry.startsWith('.eslintrc') || // eslint配置
                        entry === 'index.html'; // html文件
                    if (shouldSkip) {
                        continue;
                    }
                    files.push(fullPath);
                }
            }
        }
    }
    catch (error) {
        // 如果目录不存在或无法访问，返回空数组
        console.warn(`无法访问目录 ${dir}:`, error);
    }
    return files;
}
export async function scanFiles(options = {}) {
    try {
        const { sourcePath = process.cwd() } = options;
        // 使用指定路径下的taroConvert文件夹
        const taroConvertPath = join(sourcePath, 'taroConvert');
        console.log(`扫描目录: ${taroConvertPath}`);
        // 扫描不同类型的文件
        const jsxFiles = await getAllFiles(taroConvertPath, ['.jsx']);
        const jsFiles = await getAllFiles(taroConvertPath, ['.js']);
        const scssFiles = await getAllFiles(taroConvertPath, ['.scss']);
        console.log(`目录${taroConvertPath}找到 JSX 文件: ${jsxFiles.length} 个`);
        console.log(`目录${taroConvertPath}找到 JS 文件: ${jsFiles.length} 个`);
        console.log(`目录${taroConvertPath}找到 SCSS 文件: ${scssFiles.length} 个`);
        const scannedFiles = {
            jsx: jsxFiles.map(file => relative(sourcePath, file)),
            js: jsFiles.map(file => relative(sourcePath, file)),
            scss: scssFiles.map(file => relative(sourcePath, file))
        };
        // 读取模板文件
        const templatePath = join(getPromptsPath(), 'scanned-files.md');
        let template = '';
        try {
            template = await readFile(templatePath, 'utf-8');
        }
        catch {
            // 如果模板文件不存在，使用默认模板
            template = `# 待转换文件

## jsx 文件

## js 文件

## scss 文件
`;
        }
        // 生成 scanned-files.md 内容
        let content = '# 待转换文件\n\n';
        content += '## jsx 文件\n';
        scannedFiles.jsx.forEach(file => {
            content += `- [ ] ./${file}\n`;
        });
        content += '\n';
        content += '## js 文件\n';
        scannedFiles.js.forEach(file => {
            content += `- [ ] ./${file}\n`;
        });
        content += '\n';
        content += '## scss 文件\n';
        scannedFiles.scss.forEach(file => {
            content += `- [ ] ./${file}\n`;
        });
        // 写入 scanned-files.md
        const outputPath = join(sourcePath, 'scanned-files.md');
        await writeFile(outputPath, content, 'utf-8');
        return {
            success: true,
            scannedFiles
        };
    }
    catch (error) {
        return {
            success: false,
            scannedFiles: { jsx: [], scss: [] },
            error: `扫描文件失败: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}
