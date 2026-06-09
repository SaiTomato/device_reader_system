import type { PcHistory } from "../types/entity/history";

type Props = {

  history: PcHistory;

  onClick: (
    history: PcHistory
  ) => void;

};

function HistoryCard({
  history,
  onClick
}: Props){

  return (

    <div
      className="
        border
        rounded
        p-4
        mb-2
        cursor-pointer
      "
      onClick={() =>
        onClick(history)
      }
    >

      <div>
        更新日時：
        {
          new Date(
            history.updatedAt
          ).toLocaleString()
        }
      </div>

      <div>
        PC番号：
        {history.pcNumber}
      </div>

      <div>
        使用者：
        {history.currentUser}
      </div>

      <div>
        更新分類：
        {history.updateType}
      </div>

    </div>

  );

}

export default HistoryCard;