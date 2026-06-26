import { useQuery } from '@tanstack/react-query';
import { requestGas } from '../types/api/client';
import type { PcFilterOptionsResponse } from '../types/api/pcListDto';

export function usePcListFilterOptions(){
  return useQuery<PcFilterOptionsResponse>({
    queryKey: ['pcFilterOptions'], 

    queryFn: () => requestGas('getDropdownData',{}),
    
    // 頻繫にリクエストしないため、Dropdownのキャッシュを永久化にする
    staleTime: Infinity,
  });
}