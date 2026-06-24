import { useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updatePcInfo } from "../services/pcService";
import { useReactToPrint } from "react-to-print";
import { showError } from "../utils/error";
import { PrimaryButton, SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";
import { useQueryClient } from "@tanstack/react-query";


function LoanDocumentPage() {

  const { pcNumber } = useParams();
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({queryKey: ['pcDetail', pcNumber]});
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
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg font-medium">
          貸出書を表示できません。
        </div>

        <SecondaryButton
            onClick={() => { navigate(`/pc-list`) }}
          >
          PC一覧に戻る
        </SecondaryButton>
      </div>
    );
  }

  return (

    <>
      <div ref={printRef}
        className="max-w-4xl mx-auto bg-white rounded-lg p-8 sm:p-10 shadow-sm border border-gray-200 mb-6">
        
        <PageHeader title="貸出書"/>

        <div className="space-y-6 text-base sm:text-lg">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 font-medium mb-1">借用者名前</p>
              <p className="text-gray-900 font-semibold">{updateData?.employeeCurrent}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">日付</p>
              <p className="text-gray-900 font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            <div>
              <p className="text-gray-600 font-medium mb-1">PC番号</p>
              <p className="text-gray-900 font-semibold">{updateData?.pcNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">品名</p>
              <p className="text-gray-900 font-semibold">{updateData?.pcName}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 font-medium mb-2">以前使用した品名</p>
            <p className="text-gray-900">{originalPcName}</p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 font-medium mb-2">使用場所</p>
            <p className="text-gray-900">{updateData?.pcLocation}</p>
          </div>

          <div className="pt-4 border-t border-gray-200 space-y-3">
            <p className="text-gray-900">
              上記の品目をプロジェクト開発用として貸出します。
            </p>

            <p className="text-gray-900">
              プロジェクトが終了したら会社に返納します。
            </p>
          </div>

          <div className="pt-8 border-t border-gray-200 mt-12">
            <p className="text-gray-600 font-medium mb-2">署名</p>
            <div className="border-b border-gray-400 h-12 mt-8"></div>
          </div>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
        <SecondaryButton
          onClick={() => { navigate(`/pc-edit/${pcNumber}`) }}
          disabled={printed || isSubmitting}
          className="sm:flex-1"
        >
          戻る
        </SecondaryButton>
        <PrimaryButton
          disabled={isSubmitting}
          onClick={handlePrint}
          className="sm:flex-1"
        >
          🖨️ 印刷
        </PrimaryButton>
        <PrimaryButton
          disabled={!printed || isSubmitting}
          onClick={handleComplete}
          className="sm:flex-1"
        >
          { isSubmitting ? "処理中..." : "完了" }
        </PrimaryButton>
      </div>
    </>

  );

}

export default LoanDocumentPage;