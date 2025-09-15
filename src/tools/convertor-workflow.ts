import { readFile } from 'fs/promises';
import { join } from 'path';
import type { ConvertorWorkflowResult } from '../types.js';
import { getPromptsPath } from '../utils.js';

export async function convertorWorkflow(): Promise<ConvertorWorkflowResult> {
  try {
    const workflowPath = join(getPromptsPath(), 'convertor-workflow.md');
    const workflow = await readFile(workflowPath, 'utf-8');
    
    return {
      success: true,
      workflow
    };
  } catch (error) {
    return {
      success: false,
      workflow: '',
      error: `读取工作流文件失败: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
