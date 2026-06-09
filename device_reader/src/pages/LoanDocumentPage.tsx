import { useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updatePcInfo } from "../services/pcService";
import { useReactToPrint } from "react-to-print";
import { showError } from "../utils/error";


function LoanDocumentPage() {

  const { pcNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const updateData = location.state?.updateData;
  const originalPcName = location.state?.originalPcName;
  const [printed, setPrinted] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      const result =
        await updatePcInfo(
          updateData
        );
      if(result.updated){
        navigate(
          "/update-complete"
        );
      }
    } catch (error) {
      showError(error)
    }finally{
      setIsSubmitting(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    onAfterPrint: () => {
      setPrinted(true);
    }
  });

  if(!updateData){
    return (
      <>
        <div>
          貸出書を表示できません。
        </div>

        <button
            onClick={() => { navigate(`/pc-list`) }}
          >
            PC一覧に戻る
        </button>
      </>
    );
  }

  return (

    <>
      <div ref={printRef}
        className="
        max-w-3xl
        mx-auto
        p-8
        bg-white
      ">
        <h1>
          貸出書
        </h1>


        <div>
          <p>借用者名前 : {updateData?.employeeCurrent}</p>
        </div>
        <div>
          <p>日付 : {new Date().toLocaleDateString()}</p>
        </div>

        <div>
          <p>PC番号 : {updateData?.pcNumber}</p>
        </div>
        <div>
          <p>品名 : {updateData?.pcName}</p>
        </div>
        <div>
          <p>以前使用した品名 : {originalPcName}</p>
        </div>

        <div>
          <p>使用場所（例: 自宅/本社/現場）: {updateData?.pcLocation}</p>
        </div>

        <div>
          <p>
            上記の品目をプロジェクト開発用として貸出します。
          </p>

          <p>
            プロジェクトが終了したら会社に返納します。
          </p>
        </div>

        <div className="mt-24">
          署名
          <div className="border-b mt-8"></div>
        </div>
      </div>

      <div>
        <button
          onClick={() => { navigate(`/pc-edit/${pcNumber}`) }}
          disabled={printed || isSubmitting}
        >
          戻る
        </button>
        <button
          disabled={isSubmitting}
          onClick={handlePrint}
        >
          印刷
        </button>
        <button
          disabled={!printed || isSubmitting}
          onClick={handleComplete}
        >
          完了
        </button>
      </div>
    </>

  );

}

export default LoanDocumentPage;