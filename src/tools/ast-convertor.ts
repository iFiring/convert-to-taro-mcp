import { exec } from 'child_process';
import { promisify } from 'util';
import type { AstConvertorResult } from '../types.js';

const execAsync = promisify(exec);

export interface AstConvertorOptions {
  sourcePath?: string;
  outputPath?: string;
}

export async function astConvertor(options: AstConvertorOptions = {}): Promise<AstConvertorResult> {
  try {
    const { sourcePath = '.', outputPath = 'taroConvert' } = options;
    
    // 执行 tarojs-cli-convertor 命令
    const command = `pnpx tarojs-cli-convertor`;
    const { stdout, stderr } = await execAsync(command, {
      cwd: sourcePath
    });

    if (stderr && !stderr.includes('npm WARN')) {
      throw new Error(stderr);
    }

    return {
      success: true,
      message: '小程序代码预处理完成',
      outputPath,
    };
  } catch (error) {
    return {
      success: false,
      message: '小程序代码预处理失败',
      error: `执行转换命令失败: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
