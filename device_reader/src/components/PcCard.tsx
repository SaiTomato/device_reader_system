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

<div
  style={{
    border: "1px solid #ccc",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "8px"
  }}
>

  <h3>
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

  <button onClick={onDetailClick}>
    詳細
  </button>

</div>

);

}

export default PcCard;
