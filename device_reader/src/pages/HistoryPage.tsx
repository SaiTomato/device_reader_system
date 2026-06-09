import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryList } from "../services/historyService";
import type { PcHistory } from "../types/entity/history";
import HistoryCard from "../components/HistoryCard";
import { usePcListFilterOptions } from "../services/masterService";
import SearchSelect from "../components/SearchSelect";
import HistoryDetailModal from"../components/HistoryDetailModal";
import { DangerButton, PrimaryButton, SecondaryButton } from "../components/common/Button";

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

  const PAGE_SIZE = 4;

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
    
  return (
    <>
      <div>
        履歴
      </div>

      <div className="mb-4">

        <div>
          <label>
            PC番号:
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
          />
        </div>

        <div>
          <label>
            社員名:
          </label>

          <SearchSelect
            value={searchForm.employeeName}
            options={
              options?.employeeName || []
            }
            placeholder="社員名"
            onChange={(value) => {
              setSearchForm({
                ...searchForm,
                employeeName: value
              });
            }}
          />
        </div>

        <div>
          <label>
            更新分類:
          </label>

          <SearchSelect
            value={searchForm.updateType}
            options={updateTypes}
            placeholder="更新分類"
            onChange={(value) => {
              setSearchForm({
                ...searchForm,
                updateType: value
              });
            }}
          />
        </div>

        <div>
          <label>
            開始日:
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
          />
        </div>

        <div>
          <label>
            終了日:
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
          />
        </div>
      </div>

      <div>
        <SecondaryButton onClick={() => navigate(`/`)}>
          戻る
        </SecondaryButton>

        <PrimaryButton
          onClick={() => {
            setSearchCondition(
              searchForm
            );
            setCurrentPage(1);
          }}
        >
          検索
        </PrimaryButton>

        <DangerButton onClick={handleReset}>
          フィルタクリア
        </DangerButton>
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
      (histories.length ?? 0) === 0 && (

        <div>
          条件に合うデータはございません。
        </div>

      )}

      <div className="grid gap-4">
        <div>
          結果総数：{histories?.length ?? 0}
        </div>

        {
          pagedData.map(history => (
            <HistoryCard
              key={
                history.historyId
              }
              history={history}
              onClick={
                handleCardClick
              }
            />
          ))
        }

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

        {
          selectedHistory && (
            <HistoryDetailModal
              history={
                selectedHistory
              }

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
