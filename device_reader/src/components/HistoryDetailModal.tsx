import type { PcHistory } from "../types/entity/history";
import BaseModal from "./common/BaseModal";

type Props = {

  history: PcHistory;

  onClose: () => void;

};

function HistoryDetailModal({
  history,
  onClose
}: Props){

  return (

    <BaseModal
      title="履歴詳細"
      onClose={onClose}
    >

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

    </BaseModal>

  );

}

export default HistoryDetailModal;