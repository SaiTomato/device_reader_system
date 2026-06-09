import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryList } from "../services/historyService";
import type { PcHistory } from "../types/entity/history";
import HistoryCard from "../components/HistoryCard";
import { usePcListFilterOptions } from "../services/masterService";
import SearchSelect from "../components/SearchSelect";

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

  console.log(histories);
    
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
        <button onClick={() => navigate(`/`)}>
          戻る
        </button>

        <button
          onClick={() => {
            setSearchCondition(
              searchForm
            );
          }}
        >
          検索
        </button>

        <button onClick={handleReset}>
          フィルタクリア
        </button>
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
          没有符合条件的数据
        </div>

      )}

      {
        histories.map(history => (

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
    </>
  );
}

export default HistoryPage;
