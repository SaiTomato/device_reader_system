import { useQuery } from '@tanstack/react-query';
import { requestGas } from '../types/api/client';
import type { PcDetailResponse } from '../types/api/pcDetailDto';

export function usePcDetail(pcNumber: string) {
  return useQuery<PcDetailResponse>({
    queryKey: ['pcDetail', pcNumber],
    queryFn: () => requestGas<PcDetailResponse>('getPcDetail', { pcNumber })
  });
}

// // src/services/pcService.ts
// import { useQuery } from '@tanstack/react-query';
// import { requestGas } from '../types/api/client';
// import type { PcDetailResponse } from '../types/api/pcDetailDto';

// // 函数名改为以 use 开头
// export function usePcDetail(pcNumber: string) {
//   return useQuery<PcDetailResponse>({
//     queryKey: ['pcDetail', pcNumber],
//     queryFn: () => requestGas<PcDetailResponse>('getPcDetail', { pcNumber }),
//     // 只有当 pcNumber 真正存在时，React Query 才会发起网络请求
//     enabled: !!pcNumber, 
//   });
// }