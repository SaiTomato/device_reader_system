// src/api/client.ts
import type { ApiResponse } from './common';

const API_URL = import.meta.env.VITE_GAS_API_URL;

/**
 * 统一的 GAS 请求核心函数
 * @param action 对应 GAS 后端 switch(action) 的路由标识
 * @param payload 附带的请求参数
 */
export async function requestGas<T>(action: string, payload?: any): Promise<T> {

  let id_token = "";
  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      id_token = userObj?.id_token || ""; // 提取出加密令牌
    }
  } catch (e) {
    console.error("Failed to parse user token from localStorage", e);
  }

  // 1. 统一处理 fetch
  const response = await fetch(API_URL, {
    method: "POST",
    redirect: "follow", 
    headers: { "Content-Type": "text/plain" }, 
    body: JSON.stringify({ action, id_token, ...payload }) // 合并 action 和入参
  });

  // 2. 统一校验 HTTP 状态码
  if (!response.ok) {
    throw new Error(`通信エラーが発生しました。再度お試しください。HTTP Error! Status: ${response.status}`);
  }

  // 3. 统一校验 GAS 返回的自定义 ApiResponse 结构
  const result: ApiResponse<T> = await response.json();
  
  if (result.result === "success" && result.data !== undefined) {
    return result.data; // 直接返回业务需要的核心数据 T
  } else {
    // 如果 GAS 返回 error，直接抛出，React Query 会自动捕获并存入 error.message
    throw new Error(result.message || `操作 [${action}] 失敗`);
  }
}
