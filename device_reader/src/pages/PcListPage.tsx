import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePcList } from "../services/pcService";
import type { PcListFilters } from "../types/api/pcListDto";
import PcCard from "../components/PcCard";
import PcListFilter from "../components/PcListFilter"; // 👈 1. 引入新组件

function PcListPage() {
  const navigate = useNavigate();

  const emptyFilters: PcListFilters = {
    employeeName: "",
    pcStatus: "",
    pcCategory: "",
    pcUsage: "",
    pcDivision: "",
    pcLocation: "",
  };

  const [filters, setFilters] =
    useState<PcListFilters>(emptyFilters);

  const [searchFilters, setSearchFilters] =
    useState<PcListFilters>(emptyFilters);
  
  const cleanSearchFilters =
  Object.fromEntries(
    Object.entries(searchFilters)
      .filter(([, value]) => value !== "")
  ) as PcListFilters;

  const {
    data: pcList,
    isLoading,
    error
  } = usePcList(cleanSearchFilters);

  return (
    <>

      <h1>
        PC一覧
      </h1>

      <PcListFilter
        filters={filters}
        onFilterChange={setFilters}
      />

      <div className="flex gap-2 mt-4">

        <button
          onClick={() => {

            setFilters(emptyFilters);
            setSearchFilters(emptyFilters);

          }}
        >
          フィルタクリア
        </button>

        <button
          onClick={() => {

            setSearchFilters(filters);

          }}
        >
          検索
        </button>

      </div>

      {isLoading && (

        <div>
          搜索中...
        </div>

      )}

      {error && (

        <div>
          加载失败
        </div>

      )}

      {!isLoading &&
      !error &&
      (pcList?.length ?? 0) === 0 && (

        <div>
          没有符合条件的数据
        </div>

      )}

      {!isLoading &&
      !error &&
      (pcList?.length ?? 0) > 0 && (

        <div className="grid gap-4">

          {pcList?.map((pc) => (

            <PcCard
              key={pc.pcNumber}
              pcName={pc.pcName}
              pcNumber={pc.pcNumber}
              employeeName={pc.employeeCurrent}
              onDetailClick={() =>
                navigate(
                  `/pc-detail/${pc.pcNumber}`
                )
              }
            />

          ))}

        </div>

      )}

    </>

    );
}

export default PcListPage;