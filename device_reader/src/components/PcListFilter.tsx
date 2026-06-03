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

  if (isLoading) return <div className="text-gray-500 text-sm">Dropdown Loading...</div>;
  if (error) return <div className="text-red-500 text-sm">Dropdown Loading Failed</div>;

  return (
    <div className="filter-area">
      {/* 1. 社員名 */}
      <SearchSelect
        placeholder="全社員"
        value={filters?.employeeName || ''}
        options={options?.employeeName || []}
        onChange={(value) => {
          onFilterChange?.({ ...filters!, employeeName: value });
        }}
      />

      {/* 2. PC 状況 */}
      <SearchSelect
        placeholder="全状況"
        value={filters?.pcStatus || ''}
        options={options?.pcStatus || []}
        onChange={(value) => {
          onFilterChange?.({ ...filters!, pcStatus: value });
        }}
      />

      {/* 3. PC 分類 */}
      <SearchSelect
        placeholder="全分类"
        value={filters?.pcCategory || ''}
        options={options?.pcCategory || []}
        onChange={(value) => {
          onFilterChange?.({ ...filters!, pcCategory: value });
        }}
      />

      {/* 4. PC 用途 */}
      <SearchSelect
        placeholder="全用途"
        value={filters?.pcUsage || ''}
        options={options?.pcUsage || []}
        onChange={(value) => {
          onFilterChange?.({ ...filters!, pcUsage: value });
        }}
      />

      {/* 5. PC 区分 */}
      <SearchSelect
        placeholder="全区分"
        value={filters?.pcDivision || ''}
        options={options?.pcDivision || []}
        onChange={(value) => {
          onFilterChange?.({ ...filters!, pcDivision: value });
        }}
      />

      {/* 6. PC 場所 */}
      <SearchSelect
        placeholder="全場所"
        value={filters?.pcLocation || ''}
        options={options?.pcLocation || []}
        onChange={(value) => {
          onFilterChange?.({ ...filters!, pcLocation: value });
        }}
      />
    </div>
  );
}

export default PcListFilter;