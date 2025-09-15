import type { AstConvertorResult } from '../types.js';
export interface AstConvertorOptions {
    sourcePath?: string;
    outputPath?: string;
}
export declare function astConvertor(options?: AstConvertorOptions): Promise<AstConvertorResult>;
