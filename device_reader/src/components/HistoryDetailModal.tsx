import type { PcHistory } from "../types/entity/history";

type Props = {

  history: PcHistory;

  onClose: () => void;

};

function HistoryDetailModal({
  history,
  onClose
}: Props){

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
      onClick={onClose}
    >

      <div
        className="
          bg-white
          p-6
          rounded
          w-150
          max-w-[90vw]
        "
        onClick={(e) => e.stopPropagation()}
      >

        <h2
          className="
            text-xl
            font-bold
            mb-4
          "
        >
          履歴詳細
        </h2>

        <div>

          <p>
            履歴ID：
            {history.historyId}
          </p>

          <p>
            PC番号：
            {history.pcNumber}
          </p>

          <p>
            使用者：
            {history.currentUser}
          </p>

          <p>
            更新分類：
            {history.updateType}
          </p>

          <p>
            更新者：
            {history.updatedBy}
          </p>

          <p>
            更新日時：
            {
              new Date(
                history.updatedAt
              ).toLocaleString()
            }
          </p>

        </div>

        <div
          className="
            mt-4
          "
        >

          <div
            className="
              font-bold
              mb-2
            "
          >
            更新内容
          </div>

          <pre
            className="
              whitespace-pre-wrap
              border
              p-3
              rounded
              bg-gray-50
            "
          >
            {
              history.historyAction
            }
          </pre>

        </div>

      </div>

    </div>

  );

}

export default HistoryDetailModal;