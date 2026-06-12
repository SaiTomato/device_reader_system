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

      <div className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                履歴ID
              </p>
              <p className="text-sm sm:text-base text-gray-900 font-medium">
                {history.historyId}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                PC番号
              </p>
              <p className="text-sm sm:text-base text-gray-900 font-medium">
                {history.pcNumber}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                使用者
              </p>
              <p className="text-sm sm:text-base text-gray-900">
                {history.currentUser}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                更新分類
              </p>
              <span className="inline-block text-xs sm:text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                {history.updateType}
              </span>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                更新者
              </p>
              <p className="text-sm sm:text-base text-gray-900">
                {history.updatedBy}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                更新日時
              </p>
              <p className="text-sm sm:text-base text-gray-900">
                {
                  new Date(
                    history.updatedAt
                  ).toLocaleString()
                }
              </p>
            </div>
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">

          <h3 className="font-bold text-gray-900 mb-3">
            更新内容
          </h3>

          <pre
            className="
              whitespace-pre-wrap
              border
              border-gray-300
              p-4
              rounded-lg
              bg-gray-50
              text-xs
              sm:text-sm
              overflow-x-auto
              font-mono
              text-gray-700
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