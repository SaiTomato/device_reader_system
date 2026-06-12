import { usePcListFilterOptions } from '../services/masterService.ts';
import type { PcListFilters } from '../types/api/pcListDto.ts';

import SearchSelect from './SearchSelect.tsx';

type PcListFilterProps = {
  filters?: PcListFilters;
  onFilterChange?: (newFilters: PcListFilters) => void;
};

export function PcListFilter({ filters, onFilterChange }: PcListFilterProps) {

  // 引入我们刚刚写好的 Hook
  const { data: options, isLoading, error } = usePcListFilterOptions();

  if (isLoading) return <div className="text-gray-500 text-sm font-medium">フィルター読込中...</div>;
  if (error) return <div className="text-red-500 text-sm font-medium">フィルター読込失敗</div>;

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">フィルター</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* 1. 社員名 */}
        <SearchSelect
          label="社員名"
          placeholder="全社員"
          value={filters?.employeeName || ''}
          options={options?.employeeName || []}
          onChange={(value) => {
            onFilterChange?.({ ...filters!, employeeName: value });
          }}
        />

        {/* 2. PC 状況 */}
        <SearchSelect
          label="PC状況"
          placeholder="全状況"
          value={filters?.pcStatus || ''}
          options={options?.pcStatus || []}
          onChange={(value) => {
            onFilterChange?.({ ...filters!, pcStatus: value });
          }}
        />

        {/* 3. PC 分類 */}
        <SearchSelect
          label="PC分類"
          placeholder="全分類"
          value={filters?.pcCategory || ''}
          options={options?.pcCategory || []}
          onChange={(value) => {
            onFilterChange?.({ ...filters!, pcCategory: value });
          }}
        />

        {/* 4. PC 用途 */}
        <SearchSelect
          label="PC用途"
          placeholder="全用途"
          value={filters?.pcUsage || ''}
          options={options?.pcUsage || []}
          onChange={(value) => {
            onFilterChange?.({ ...filters!, pcUsage: value });
          }}
        />

        {/* 5. PC 区分 */}
        <SearchSelect
          label="PC区分"
          placeholder="全区分"
          value={filters?.pcDivision || ''}
          options={options?.pcDivision || []}
          onChange={(value) => {
            onFilterChange?.({ ...filters!, pcDivision: value });
          }}
        />

        {/* 6. PC 場所 */}
        <SearchSelect
          label="PC場所"
          placeholder="全場所"
          value={filters?.pcLocation || ''}
          options={options?.pcLocation || []}
          onChange={(value) => {
            onFilterChange?.({ ...filters!, pcLocation: value });
          }}
        />
      </div>
    </div>
  );
}

export default PcListFilter;