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

<div className="border border-gray-200 rounded-lg p-5 sm:p-6 mb-4 shadow-sm bg-white transition-all duration-200 hover:shadow-md hover:border-blue-300">

  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
    {pcName}
  </h3>

  <div className="space-y-3 mb-5">
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <span className="text-sm text-gray-600 font-medium">PC番号</span>
      <span className="text-sm sm:text-base text-gray-900 font-medium">{pcNumber}</span>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between">
      <span className="text-sm text-gray-600 font-medium">使用者</span>
      <span className="text-sm sm:text-base text-gray-900">{employeeName}</span>
    </div>
  </div>

  <button
    className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    onClick={onDetailClick}
  >
    詳細
  </button>

</div>

);

}

export default PcCard;
