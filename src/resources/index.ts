/**
 * 资源管理器
 * 负责管理和提供MCP资源访问
 */

import type { Resource } from "@modelcontextprotocol/sdk/types.js";
import { FileScannerResource } from "./file-scanner.js";

/**
 * 资源管理器类
 * 注册和管理所有可用的资源
 */
export class ResourceManager {
  private resources: Map<string, any> = new Map();

  constructor() {
    this.registerResources();
  }

  /**
   * 注册所有资源
   */
  private registerResources(): void {
    const fileScanner = new FileScannerResource();
    this.resources.set("resource-for-scan-files", fileScanner);
  }

  /**
   * 列出所有可用资源
   */
  listResources(): Resource[] {
    return Array.from(this.resources.values()).map((resource) => ({
      uri: resource.uri,
      name: resource.name,
      description: resource.description,
      mimeType: resource.mimeType,
    }));
  }

  /**
   * 读取指定资源
   * @param uri - 资源URI
   * @returns 资源内容
   */
  async readResource(uri: string): Promise<string> {
    const resource = this.findResourceByUri(uri);
    if (!resource) {
      throw new Error(`资源未找到: ${uri}`);
    }

    try {
      return await resource.read();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`读取资源失败: ${errorMessage}`);
    }
  }

  /**
   * 根据URI查找资源
   * @param uri - 资源URI
   * @returns 资源实例或undefined
   */
  private findResourceByUri(uri: string): any | undefined {
    for (const resource of this.resources.values()) {
      if (resource.uri === uri) {
        return resource;
      }
    }
    return undefined;
  }
}
