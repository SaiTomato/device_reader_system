import type { PcHistory } from "../types/entity/history";

type Props = {

  history: PcHistory;

  updateTypeStyles: string;

  defaultStyle: string;

  onClick: (
    history: PcHistory
  ) => void;

};

function HistoryCard({
  history,
  updateTypeStyles,
  defaultStyle,
  onClick
}: Props){

  return (

    <div
      className="
        border
        border-gray-200
        rounded-lg
        p-4
        sm:p-5
        mb-3
        cursor-pointer
        transition-all
        duration-200
        bg-white
        shadow-sm
        hover:shadow-md
        hover:border-blue-300
        hover:bg-blue-50
      "
      onClick={() =>
        onClick(history)
      }
    >

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">更新日時</p>
          <p className="text-sm sm:text-base text-gray-900 font-medium">
            {
              new Date(
                history.updatedAt
              ).toLocaleString()
            }
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">PC番号</p>
          <p className="text-sm sm:text-base text-gray-900 font-medium">{history.pcNumber}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">使用者</p>
          <p className="text-sm sm:text-base text-gray-900">{history.currentUser}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">更新分類</p>
          <span className={`inline-block text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${updateTypeStyles ?? defaultStyle}`}>
            {history.updateType}
          </span>
        </div>

      </div>

    </div>

  );

}

export default HistoryCard;