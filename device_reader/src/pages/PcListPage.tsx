import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePcList } from "../services/pcService";
import type { PcListFilters } from "../types/api/pcListDto";
import PcCard from "../components/PcCard";
import PcListFilter from "../components/PcListFilter"; // 👈 1. 引入新组件
import { DangerButton, PrimaryButton, SecondaryButton } from "../components/common/Button";

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

  const PAGE_SIZE = 4;

  const [
    currentPage,
    setCurrentPage
  ] = useState(1);

  const totalPages =
  Math.ceil(
    (pcList?.length ?? 0)
    / PAGE_SIZE
  );

  const pagedData =
    pcList?.slice(

      (currentPage - 1)
      * PAGE_SIZE,

      currentPage
      * PAGE_SIZE

    ) ?? [];

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

        <SecondaryButton
          onClick={() => navigate(`/`)}
        >
          ホームに戻る
        </SecondaryButton>
        <DangerButton
          onClick={() => {
            setFilters(emptyFilters);
            setSearchFilters(emptyFilters);
            setCurrentPage(1);
          }}
        >
          フィルタクリア
        </DangerButton>

        <PrimaryButton
          onClick={() => {
            setSearchFilters(filters);
            setCurrentPage(1);
          }}
        >
          検索
        </PrimaryButton>

        <PrimaryButton
          onClick={() => navigate(`/pc-register`)}
        >
          新規登録
        </PrimaryButton>

      </div>

      {isLoading && (

        <div>
          搜索中...
        </div>

      )}

      {error && (

        <div>
          ロード失敗
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
          <div>
            結果総数：{pcList?.length ?? 0}
          </div>

          {pagedData?.map((pc) => (

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

          <div>
            <button
              disabled={
                currentPage === 1
              }
              onClick={() => {
                setCurrentPage(
                  currentPage - 1
                );
              }}
            >
              前へ
            </button>

            <span>
              {currentPage}
              /
              {totalPages}
            </span>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() => {
                setCurrentPage(
                  currentPage + 1
                );
              }}
            >
              次へ
            </button>
          </div>
        </div>
      )}

    </>

    );
}

export default PcListPage;