import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, extname, relative } from 'path';
import type { ScanFilesResult, ScanFilesOptions } from '../types.js';
import { getPromptsPath, getMCPRootPath } from '../utils.js';

async function getAllFiles(dir: string, extensions: string[]): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await readdir(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        const subFiles = await getAllFiles(fullPath, extensions);
        files.push(...subFiles);
      } else if (stats.isFile()) {
        const ext = extname(entry);
        if (extensions.includes(ext)) {
          // 跳过不需要转换的文件
          const shouldSkip = 
            entry.includes('.config.js') ||          // 配置文件
            entry === 'app.js' ||              // app相关文件
            fullPath.includes('/config/') ||         // config目录
            fullPath.includes('/dist/') ||           // dist目录
            fullPath.includes('/report/') ||         // report目录
            fullPath.includes('/.convert/') ||       // .convert目录
            entry === 'babel.config.js' ||          // babel配置
            entry.startsWith('.eslintrc') ||         // eslint配置
            entry === 'index.html';                 // html文件
            
          if (shouldSkip) {
            continue;
          }
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    // 如果目录不存在或无法访问，返回空数组
    console.warn(`无法访问目录 ${dir}:`, error);
  }
  
  return files;
}

export async function scanFiles(options: ScanFilesOptions = {}): Promise<ScanFilesResult> {
  try {
    const { sourcePath = process.cwd() } = options;
    // 使用指定路径下的taroConvert文件夹
    const taroConvertPath = sourcePath.includes('taroConvert') ? sourcePath : join(sourcePath, 'taroConvert');
    console.log(`扫描目录: ${taroConvertPath}`);
    
    // 扫描不同类型的文件
    const jsxFiles = await getAllFiles(taroConvertPath, ['.jsx']);
    const jsFiles = await getAllFiles(taroConvertPath, ['.js']);
    const scssFiles = await getAllFiles(taroConvertPath, ['.scss']);
    
    console.log(`目录${taroConvertPath}找到 JSX 文件: ${jsxFiles.length} 个`);
    console.log(`目录${taroConvertPath}找到 JS 文件: ${jsFiles.length} 个`);
    console.log(`目录${taroConvertPath}找到 SCSS 文件: ${scssFiles.length} 个`);
    
    // 按照PRD要求：js也算jsx，所以合并js和jsx文件
    const allJsxFiles = [...jsxFiles, ...jsFiles];
    
    const scannedFiles = {
      jsx: allJsxFiles.map(file => file),
      scss: scssFiles.map(file => file)
    };
    
    // 按照PRD要求：输出JSON格式文件
    const jsonOutput = {
      jsx: scannedFiles.jsx,
      scss: scannedFiles.scss
    };
    
    // 写入 scanned-files.json
    const outputPath = join(sourcePath, 'scanned-files.json');
    await writeFile(outputPath, JSON.stringify(jsonOutput, null, 2), 'utf-8');
    
    return {
      success: true,
      scannedFiles
    };
  } catch (error) {
    return {
      success: false,
      scannedFiles: { jsx: [], scss: [], error: error instanceof Error ? error.message : String(error) },
      error: `扫描文件失败: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
