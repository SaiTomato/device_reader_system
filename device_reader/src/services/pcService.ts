import { useQuery } from '@tanstack/react-query';
import { requestGas } from '../types/api/client';
import type { PcDetailResponse } from '../types/api/pcDetailDto';
import type { PcListFilters, PcListResponse } from '../types/api/pcListDto';
import type { UpdatePcRequest, UpdatePcResponse } from '../types/api/updatePcDto';
import type { RegisterPcRequest, RegisterPcResponse } from '../types/api/pcRegisterDto';

export function usePcDetail(pcNumber: string) {
  return useQuery<PcDetailResponse>({
    queryKey: ['pcDetail', pcNumber],
    queryFn: () => requestGas<PcDetailResponse>('getPcDetail', { pcNumber }),
    enabled: !!pcNumber, // pcNumberが存在する場合のみネットワークリクエストを発行
  });
}

export function usePcList(filters: PcListFilters) {
  return useQuery<PcListResponse>({
    // ⭕ 关键：把 filters 丢进缓存 Key，这样 React Query 才能监听到过滤条件的变化
    queryKey: ["pcList", filters], 
    
    // ⭕ 关键：把 filters 作为参数，打包丢给统一的 requestGas 函数
    queryFn: () => requestGas<PcListResponse>("getPcList", filters),
  });
}

export async function updatePcInfo(
  updateData: UpdatePcRequest
): Promise<UpdatePcResponse> {

  return requestGas<UpdatePcResponse>(
    "updatePcInfo",
    updateData
  );

}

export async function registerPc(
  request: RegisterPcRequest
): Promise<RegisterPcResponse> {

  return requestGas<RegisterPcResponse>(
    "registerPc",
    request
  );

}