type PcCardProps = {

pcName: string;
pcNumber: string;
employeeName: string;

onDetailClick: () => void;

};

function PcCard({

pcName,
pcNumber,
employeeName,
onDetailClick

}: PcCardProps) {

return (

<div className="border rounded-xl p-4 mb-4 shadow">

  <h3 className="text-xl font-bold mb-2">
    {pcName}
  </h3>

  <p>
    PC番号:
    {pcNumber}
  </p>

  <p>
    使用者:
    {employeeName}
  </p>

  <button
  className=" mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
  onClick={onDetailClick}>
    詳細
  </button>

</div>

);

}

export default PcCard;
