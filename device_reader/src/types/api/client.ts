// src/api/client.ts
import type { ApiResponse } from './common';
import type { GetEmployeeRequest, GetEmployeeResponse } from './empInfoDto';
import type { PcDetailResponse } from './pcDetailDto';
import type { HistorySearchRequest, HistorySearchResponse } from './pcHistoryDto';
import type { PcFilterOptionsResponse, PcListFilters, PcListResponse } from './pcListDto';
import type { RegisterPcRequest, RegisterPcResponse } from './pcRegisterDto';
import type { UpdatePcRequest, UpdatePcResponse } from './updatePcDto';

const API_URL = import.meta.env.VITE_GAS_API_URL;

interface ActionMap {
  getEmployeeByEmail: { payload: GetEmployeeRequest; data: GetEmployeeResponse };
  getHistoryList: { payload: HistorySearchRequest; data: HistorySearchResponse };
  getPcDetail: { payload: { pcNumber: string }; data: PcDetailResponse };
  getDropdownData: { payload: {}; data: PcFilterOptionsResponse };
  getPcList: { payload: PcListFilters; data: PcListResponse };
  updatePcInfo: { payload: UpdatePcRequest; data: UpdatePcResponse };
  registerPc: { payload: RegisterPcRequest; data: RegisterPcResponse };
}

/**
 * GAS　統一リクエスト関数
 * @param action バックエンド GAS の switch(action) API
 * @param payload リクエスト　パラメーター
 */
export async function requestGas<K extends keyof ActionMap>(action: K, payload?: ActionMap[K]['payload'])
  : Promise<ActionMap[K]['data']> {

  let id_token = "";
  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      id_token = userObj?.id_token || "";
    }
  } catch (e) {
    console.error("Failed to parse user token from localStorage", e);
  }

  // 1. fetch　统一处理
  const response = await fetch(API_URL, {
    method: "POST",
    redirect: "follow", 
    headers: { "Content-Type": "text/plain" }, 
    body: JSON.stringify({ action, id_token, ...payload }) // 合并 action 和入参
  });

  // 2. HTTP　统一検証
  if (!response.ok) {
    throw new Error(`通信エラーが発生しました。再度お試しください。HTTP Error! Status: ${response.status}`);
  }

  // 3. GASの応答をApiResponseに統一 
  const result: ApiResponse<ActionMap[K]['data']> = await response.json();
  
  if (result.result === "success" && result.data !== undefined) {
    return result.data;
  } else {
    throw new Error(result.message || `操作 [${action}] 失敗`);
  }
}
