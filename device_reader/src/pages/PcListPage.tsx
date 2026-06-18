import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePcList } from "../services/pcService";
import type { PcListFilters } from "../types/api/pcListDto";
import PcCard from "../components/PcCard";
import PcListFilter from "../components/PcListFilter"; // 👈 1. 引入新组件
import { DangerButton, PrimaryButton, SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

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

  const PAGE_SIZE = 10;

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
      <PageHeader title="PC一覧"/>

      <PcListFilter
        filters={filters}
        onFilterChange={setFilters}
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 flex-wrap">

        <SecondaryButton
          onClick={() => navigate(`/home`)}
          className="sm:flex-1"
        >
          ホームに戻る
        </SecondaryButton>
        <DangerButton
          onClick={() => {
            setFilters(emptyFilters);
            setSearchFilters(emptyFilters);
            setCurrentPage(1);
          }}
          className="sm:flex-1"
        >
          フィルタクリア
        </DangerButton>

        <PrimaryButton
          onClick={() => {
            setSearchFilters(filters);
            setCurrentPage(1);
          }}
          className="sm:flex-1"
        >
          検索
        </PrimaryButton>

        <PrimaryButton
          onClick={() => navigate(`/pc-register`)}
          className="sm:flex-1"
        >
          新規登録
        </PrimaryButton>

      </div>

      {isLoading && (

        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="mt-3 text-gray-600 font-medium">検索中...</p>
          </div>
        </div>

      )}

      {error && (

        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium">
          ロード失敗しました
        </div>

      )}

      {!isLoading &&
      !error &&
      (pcList?.length ?? 0) === 0 && (

        <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-8 rounded-lg text-center font-medium">
          条件に合うデータはございません。
        </div>

      )}

      {!isLoading &&
      !error &&
      (pcList?.length ?? 0) > 0 && (

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm">
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-bold text-gray-900">結果総数:</span> {pcList?.length ?? 0}件
            </p>
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

          {pcList && pcList.length > 0 && (
            <div className="flex justify-center items-center gap-4 bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm">
              <button
                disabled={
                  currentPage === 1
                }
                onClick={() => {
                  setCurrentPage(
                    currentPage - 1
                  );
                }}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                前へ
              </button>

              <span className="text-gray-700 font-medium mx-4">
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
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                次へ
              </button>
            </div>
          )}
        </div>
      )}

    </>

    );
}

export default PcListPage;