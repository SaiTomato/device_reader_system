import { useQuery } from '@tanstack/react-query';
import { requestGas } from '../types/api/client';
import type { PcFilterOptionsResponse } from '../types/api/pcListDto';

export function usePcListFilterOptions(){
  return useQuery<PcFilterOptionsResponse>({
    // 固定的缓存 Key，因为不需要参数，所以数组里放一个字符串就够了
    queryKey: ['pcFilterOptions'], 
    
    // 触发 GAS 的 'getDropdownData' 路由，payload 传空对象
    queryFn: () => requestGas<PcFilterOptionsResponse>('getDropdownData', {}),
    
    // 可选配置：因为下拉菜单数据一般变动不频繁，可以设置缓存时间为 5 分钟，避免频繁重复请求
    staleTime: 1000 * 60 * 5, 
  });
}