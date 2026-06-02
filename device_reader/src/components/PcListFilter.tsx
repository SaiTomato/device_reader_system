import { usePcListFilterOptions } from '../services/masterService.ts';
import type { PcListFilters } from '../types/api/pcListDto.ts';

type PcListFilterProps = {
  filters?: PcListFilters;
  onFilterChange?: (newFilters: PcListFilters) => void;
};

export function PcListFilter({ filters, onFilterChange }: PcListFilterProps) {
  // 引入我们刚刚写好的 Hook
  const { data: options, isLoading, error } = usePcListFilterOptions();

  console.log("=== 检查 options 的真实内容 ===", options);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (onFilterChange && filters) {
      onFilterChange({ ...filters, [name]: value });
    }
  };

  if (isLoading) return <div className="text-gray-500 text-sm">正在加载筛选选项...</div>;
  if (error) return <div className="text-red-500 text-sm">选项加载失败</div>;

  return (
    <div className="filter-area">
      {/* 1. 社員名 */}
      <select name="employeeName" value={filters?.employeeName || ''} onChange={handleChange}>
        <option value="">全社員</option>
        {options?.employeeName?.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      {/* 2. PC 状況 */}
      <select name="pcStatus" value={filters?.pcStatus || ''} onChange={handleChange}>
        <option value="">全状況</option>
        {options?.pcStatus?.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      {/* 3. PC 分類 */}
      <select name="pcCategory" value={filters?.pcCategory || ''} onChange={handleChange}>
        <option value="">全分类</option>
        {options?.pcCategory?.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      {/* 4. PC 用途 */}
      <select name="pcUsage" value={filters?.pcUsage || ''} onChange={handleChange}>
        <option value="">全用途</option>
        {options?.pcUsage?.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      {/* 5. PC 区分 */}
      <select name="pcDivision" value={filters?.pcDivision || ''} onChange={handleChange}>
        <option value="">全区分</option>
        {options?.pcDivision?.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      {/* 6. PC 場所 */}
      <select name="pcLocation" value={filters?.pcLocation || ''} onChange={handleChange}>
        <option value="">全場所</option>
        {options?.pcLocation?.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default PcListFilter;