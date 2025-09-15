export interface ConvertorWorkflowResult {
    success: boolean;
    workflow: string;
    error?: string;
}
export interface AstConvertorResult {
    success: boolean;
    message: string;
    outputPath?: string;
    error?: string;
}
export interface ScanFilesOptions {
    sourcePath?: string;
}
export interface ScanFilesResult {
    success: boolean;
    scannedFiles: {
        jsx: string[];
        js: string[];
        scss: string[];
    };
    error?: string;
}
export interface SyntaxConvertorResult {
    success: boolean;
    content: string;
    error?: string;
}
export interface FileInfo {
    path: string;
    type: 'jsx' | 'js' | 'scss';
    processed: boolean;
    success?: boolean;
}
