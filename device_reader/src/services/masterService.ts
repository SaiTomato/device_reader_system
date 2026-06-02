import type {DropdownOptions} from "../types/entity/master";
import type {ApiResponse} from "../types/api/common";
const API_URL = import.meta.env.VITE_GAS_API_URL;

export async function getDropdownData()
: Promise<DropdownOptions> {
  if (!API_URL) {
    throw new Error("VITE_GAS_API_URL 未配置");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      // GAS 作为 Web App 必须支持重定向，fetch 默认就是 'follow'，保持默认即可
      redirect: "follow", 
      headers: { "Content-Type": "text/plain" }, 
      body: JSON.stringify({ action: "getDropdownData" })
    });

    if (!response.ok) {
      throw new Error(`HTTP 错误！状态码: ${response.status}`);
    }

    // 2. 如果你的 GAS 返回的是被 ApiResponse 包裹的结构（例如：{ success: true, data: { ... } }）
    const result: ApiResponse<DropdownOptions> = await response.json();
    if (result.result === "success" && result.data) {
      return result.data;
    } else {
      throw new Error(result.message || "获取下拉菜单失败");
    }
    
  } catch (error) {
    console.error("请求 GAS API 出错:", error);
    // 抛出错误让调用它的组件可以捕捉到，或者返回空对象作为兜底
    throw error; 
  }

}
