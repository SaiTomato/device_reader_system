import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updatePcInfo } from "../services/pcService";


function LoanDocumentPage() {

  const { pcNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const updateData = location.state?.updateData;
  const [printed, setPrinted] = useState(false);

  const handleComplete = async () => {
    const result =
      await updatePcInfo(
        updateData
      );
    if(result.updated){
      navigate(
        "/update-complete"
      );
    }
  };

  return (

    <>

      <h1>
        貸出書
      </h1>

      <h2>貸出情報</h2>

      <p>PC番号: {updateData?.pcNumber}</p>

      <p>PC名: {updateData?.pcName}</p>

      <p>使用者: {updateData?.employeeCurrent}</p>

      <p>分類: {updateData?.pcCategory}</p>

      <p>貸出日: {new Date().toLocaleDateString()}</p>

      <div>
        <button
          onClick={() => { navigate(`/pc-edit/${pcNumber}`) }}
          disabled={printed}
        >
          戻る
        </button>
        <button
          onClick={() => {
            window.print();
            setPrinted(true);
          }}
        >
          印刷
        </button>
        <button
          disabled={!printed}
          onClick={handleComplete}
        >
          完了
        </button>
      </div>
    </>

  );

}

export default LoanDocumentPage;