/**
 * 资源管理器
 * 负责管理和提供MCP资源访问
 */
import type { Resource } from "@modelcontextprotocol/sdk/types.js";
/**
 * 资源管理器类
 * 注册和管理所有可用的资源
 */
export declare class ResourceManager {
    private resources;
    constructor();
    /**
     * 注册所有资源
     */
    private registerResources;
    /**
     * 列出所有可用资源
     */
    listResources(): Resource[];
    /**
     * 读取指定资源
     * @param uri - 资源URI
     * @returns 资源内容
     */
    readResource(uri: string): Promise<string>;
    /**
     * 根据URI查找资源
     * @param uri - 资源URI
     * @returns 资源实例或undefined
     */
    private findResourceByUri;
}
//# sourceMappingURL=index.d.ts.map