import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePcList } from "../services/pcService";
import type { PcListFilters } from "../types/api/pcListDto";
import PcCard from "../components/PcCard";
import PcListFilter from "../components/PcListFilter"; // 👈 1. 引入新组件

function PcListPage() {
  const navigate = useNavigate();

  // 用 useState 托住当前的筛选状态
  const [filters, setFilters] = useState<PcListFilters>({
    employeeName: "",
    pcStatus: "",
    pcCategory: "",
    pcUsage: "",
    pcDivision: "",
    pcLocation: "",
  });
  
  // 👈 2. 像调用普通函数一样，直接传入 filters 状态
  const { data: pcList, isLoading, error } = usePcList(filters);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">PC List Page</h1>

      {/* 挂载筛选子组件 */}
      <PcListFilter filters={filters} onFilterChange={setFilters} />

      {/* 数据渲染区域保持原样 */}
      {!isLoading && !error && (
        <div className="grid gap-4">
          {pcList?.map((pc) => (
            <PcCard
              key={pc.pcNumber}
              pcName={pc.pcName}
              pcNumber={pc.pcNumber}
              employeeName={pc.employeeCurrent}
              onDetailClick={() => navigate(`/pc-detail/${pc.pcNumber}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PcListPage;