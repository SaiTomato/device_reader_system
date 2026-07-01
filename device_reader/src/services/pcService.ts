import { useQuery } from '@tanstack/react-query';
import { requestGas } from '../types/api/client';
import type { PcDetailResponse } from '../types/api/pcDetailDto';
import type { PcListFilters, PcListResponse } from '../types/api/pcListDto';
import type { UpdatePcRequest, UpdatePcResponse } from '../types/api/updatePcDto';
import type { RegisterPcRequest, RegisterPcResponse } from '../types/api/pcRegisterDto';

export function usePcDetail(pcNumber: string) {
  return useQuery<PcDetailResponse>({
    queryKey: ['pcDetail', pcNumber],
    queryFn: () => requestGas('getPcDetail', { pcNumber }),
    enabled: !!pcNumber, // pcNumberが存在する場合のみネットワークリクエストを発行

    staleTime: Infinity, // PC詳細のキャッシュ永久化、更新の時該当㍶Numberのキャッシュを破棄処理必要
  });
}

export function usePcList(filters: PcListFilters) { // TODO query必要か検討
  return useQuery<PcListResponse>({
    // ⭕ 关键：把 filters 丢进缓存 Key，这样 React Query 才能监听到过滤条件的变化
    queryKey: ["pcList", filters], 
    
    // ⭕ 关键：把 filters 作为参数，打包丢给统一的 requestGas 函数
    queryFn: () => requestGas("getPcList", filters),
  });
}

export async function updatePcInfo(
  updateData: UpdatePcRequest
): Promise<UpdatePcResponse> {

  return requestGas(
    "checkUpdatePcInfo",
    updateData
  );

}

export async function registerPc(
  request: RegisterPcRequest
): Promise<RegisterPcResponse> {

  return requestGas(
    "registerPc",
    request
  );

}