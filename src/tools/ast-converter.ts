/**
 * AST转换工具
 * 执行 pnpx tarojs-cli-convertor 命令将小程序代码转换为Taro代码
 */

import { spawn } from "child_process";
import { z } from "zod";
import type { ToolResult } from "../types/index.js";

/**
 * AST转换工具输入参数架构
 */
const AstConverterInputSchema = z.object({
  sourcePath: z.string().optional().describe("源代码路径，默认为当前目录"),
  outputPath: z.string().optional().describe("输出路径，默认为 taroConvert"),
});

/**
 * AST转换工具类
 * 使用Babel进行AST转换，将小程序代码转换为Taro代码
 */
export class AstConverterTool {
  public readonly name = "tool-for-ast-convertor";
  public readonly description = "将小程序代码用 Babel 转换后，放进taroConvert文件夹中";
  public readonly inputSchema = AstConverterInputSchema.shape;

  /**
   * 执行AST转换工具
   * @param args - 工具参数
   * @returns 执行结果
   */
  async execute(args: z.infer<typeof AstConverterInputSchema>): Promise<ToolResult> {
    try {
      const { sourcePath = ".", outputPath = "taroConvert" } = args;

      console.error(`开始执行 AST 转换，源路径: ${sourcePath}，输出路径: ${outputPath}`);

      const result = await this.runTaroConverter();

      if (result.success) {
        return {
          success: true,
          message: "AST转换完成，小程序代码已转换为Taro代码并放置在taroConvert文件夹中",
          data: {
            command: "pnpx tarojs-cli-convertor",
            outputPath: "taroConvert",
            stdout: result.stdout,
            stderr: result.stderr,
          },
        };
      } else {
        return {
          success: false,
          message: `AST转换失败: ${result.error}`,
          error: result.error,
          data: {
            command: "pnpx tarojs-cli-convertor",
            stdout: result.stdout,
            stderr: result.stderr,
          },
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: `执行AST转换时发生错误: ${errorMessage}`,
        error: errorMessage,
      };
    }
  }

  /**
   * 执行Taro转换命令
   * @returns 命令执行结果
   */
  private async runTaroConverter(): Promise<{
    success: boolean;
    stdout: string;
    stderr: string;
    error?: string;
  }> {
    return new Promise((resolve) => {
      console.error("正在执行: pnpx tarojs-cli-convertor");

      const child = spawn("pnpx", ["tarojs-cli-convertor"], {
        stdio: ["pipe", "pipe", "pipe"],
        shell: true,
      });

      let stdout = "";
      let stderr = "";

      child.stdout?.on("data", (data) => {
        const output = data.toString();
        stdout += output;
        console.error("stdout:", output);
      });

      child.stderr?.on("data", (data) => {
        const output = data.toString();
        stderr += output;
        console.error("stderr:", output);
      });

      child.on("close", (code) => {
        console.error(`子进程退出，代码: ${code}`);
        if (code === 0) {
          resolve({
            success: true,
            stdout,
            stderr,
          });
        } else {
          resolve({
            success: false,
            stdout,
            stderr,
            error: `命令执行失败，退出代码: ${code}`,
          });
        }
      });

      child.on("error", (error) => {
        console.error("执行命令时发生错误:", error);
        resolve({
          success: false,
          stdout,
          stderr,
          error: error.message,
        });
      });
    });
  }
}
