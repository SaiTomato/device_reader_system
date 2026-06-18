import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryList } from "../services/historyService";
import type { PcHistory } from "../types/entity/history";
import HistoryCard from "../components/HistoryCard";
import { usePcListFilterOptions } from "../services/masterService";
import SearchSelect from "../components/SearchSelect";
import HistoryDetailModal from"../components/HistoryDetailModal";
import { DangerButton, PrimaryButton, SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

interface HistorySearchForm {

  pcNumber: string;

  employeeName: string;

  updateType: string;

  startDate: string;

  endDate: string;

}

function HistoryPage() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] =
    useState<HistorySearchForm>({

      pcNumber: "",

      employeeName: "",

      updateType: "",

      startDate: "",

      endDate: ""

    });

  const { data: options } = usePcListFilterOptions();

  const updateTypes = [
    "CREATE",
    "UPDATE",
    "LOAN",
    "DELETE"
  ];

  const [searchCondition, setSearchCondition] = useState(searchForm);

  const {
    data,
    isLoading,
    error
  } = useHistoryList(
    searchCondition
  );

  const [
    selectedHistory,
    setSelectedHistory
  ] = useState<
    PcHistory | null
  >(null);

  const handleReset = () => {

    const initial = {

      pcNumber: "",

      employeeName: "",

      updateType: "",

      startDate: "",

      endDate: ""

    };

    setSearchForm(initial);

    setSearchCondition(initial);

    setCurrentPage(1);

  };

  const handleCardClick =
  (
    history: PcHistory
  ) => {

    setSelectedHistory(
      history
    );

  };

  const histories = data?.items ?? [];

  const PAGE_SIZE = 10;

  const [
    currentPage,
    setCurrentPage
  ] = useState(1);

  const totalPages =
  Math.ceil(
    (histories?.length ?? 0)
    / PAGE_SIZE
  );

  const pagedData =
    histories?.slice(

      (currentPage - 1)
      * PAGE_SIZE,

      currentPage
      * PAGE_SIZE

    ) ?? [];
  
  const updateTypeStyles: Record<string, string> = {
    "CREATE":     "bg-green-100 text-green-700",
    "UPDATE":     "bg-blue-100 text-blue-700",
    "LOAN":     "bg-yellow-100 text-yellow-700",
    "DELETE":     "bg-red-100 text-red-700",
  };

  const defaultStyle = "bg-gray-100 text-gray-700";
    
  return (
    <>
      <PageHeader title="履歴"/>

      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200 mb-6">

        <h3 className="text-lg font-bold text-gray-900 mb-6">検索条件</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-6">

          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2">
              PC番号
            </label>

            <input
              type="text"
              value={searchForm.pcNumber}
              onChange={(e) =>
                setSearchForm({
                  ...searchForm,
                  pcNumber: e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
              placeholder="PC番号を入力..."
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2">
              社員名
            </label>

            <SearchSelect
              value={searchForm.employeeName}
              options={
                options?.employeeName || []
              }
              placeholder="社員名を選択..."
              onChange={(value) => {
                setSearchForm({
                  ...searchForm,
                  employeeName: value
                });
              }}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2">
              更新分類
            </label>

            <SearchSelect
              value={searchForm.updateType}
              options={updateTypes}
              placeholder="更新分類を選択..."
              onChange={(value) => {
                setSearchForm({
                  ...searchForm,
                  updateType: value
                });
              }}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2">
              開始日
            </label>

            <input
              type="date"
              value={searchForm.startDate}
              onChange={(e) =>
                setSearchForm({
                  ...searchForm,
                  startDate: e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2">
              終了日
            </label>

            <input
              type="date"
              value={searchForm.endDate}
              onChange={(e) =>
                setSearchForm({
                  ...searchForm,
                  endDate: e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            />
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <SecondaryButton onClick={() => navigate(`/`)} className="sm:order-2">
            戻る
          </SecondaryButton>

          <PrimaryButton
            onClick={() => {
              setSearchCondition(
                searchForm
              );
              setCurrentPage(1);
            }}
            className="sm:order-1">
            検索
          </PrimaryButton>

          <DangerButton onClick={handleReset} className="sm:order-3">
            フィルタクリア
          </DangerButton>
        </div>

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
      (histories.length ?? 0) === 0 && (

        <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-8 rounded-lg text-center font-medium">
          条件に合うデータはございません。
        </div>

      )}

      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-700 text-sm sm:text-base">
            <span className="font-bold text-gray-900">結果総数:</span> {histories?.length ?? 0}件
          </p>
        </div>

        {
          pagedData.map(history => (
            <HistoryCard
              key={
                history.historyId
              }
              history={history}
              updateTypeStyles={updateTypeStyles[history.updateType]}
              defaultStyle={defaultStyle}
              onClick={
                handleCardClick
              }
            />
          ))
        }

        {histories.length > 0 && (
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

        {
          selectedHistory && (
            <HistoryDetailModal
              history={
                selectedHistory
              }
              updateTypeStyles={updateTypeStyles[selectedHistory.updateType]}
              defaultStyle={defaultStyle}
              onClose={() => {
                setSelectedHistory(
                  null
                );
              }}
            />
          )
        }
      </div>
    </>
  );
}

export default HistoryPage;
