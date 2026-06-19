import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { showError } from "../utils/error";
import { PrimaryButton, SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";
import { usePcDetail } from "../services/pcService";

function QrCodePage() {

  const { pcNumber } = useParams();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const { data: pcDetail, isLoading, error } = usePcDetail(pcNumber || "");

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleDownload = async () => {
    if(!printRef.current) return;

    try{
      const dataUrl =
      await toPng(printRef.current, {backgroundColor: "#ffffff"});

      const link = document.createElement("a");
      link.download = `${pcNumber}.png`;
      link.href = dataUrl;
      link.click();

    }catch(err){
      showError(err);
    }
  };

  if(error){
    return (
      <div className="space-y-4">
        <p className="text-red-600 font-medium">PC番号は存在しません。</p>
        <SecondaryButton onClick={() => navigate(`/qr-scan`)}>戻る</SecondaryButton>
      </div>
    );
  }

  if(isLoading){
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="mt-3 text-gray-600 font-medium">データ確認中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="QR表示"/>

      <div className="flex flex-col items-center space-y-6 sm:space-y-8">
        
        <div ref={printRef}
          className="bg-white rounded-lg p-8 sm:p-10 shadow-lg border border-gray-200 flex flex-col items-center"
        >
          <QRCodeSVG
            value={pcDetail?.pcNumber ?? ""}
            size={256}
          />
          <div
            className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mt-6 mb-2"
          >
            PC番号
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-blue-600">
            {pcNumber}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <PrimaryButton onClick={handleDownload} className="sm:flex-1">
            📥 PNG保存
          </PrimaryButton>

          <PrimaryButton onClick={handlePrint} className="sm:flex-1">
            🖨️ 印刷
          </PrimaryButton>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <SecondaryButton onClick={() => navigate(`/qr-scan`)} className="sm:flex-1">
            QR読取に戻る
          </SecondaryButton>

          <SecondaryButton onClick={() => navigate(`/pc-detail/${pcNumber}`)} className="sm:flex-1">
            PC詳細に戻る
          </SecondaryButton>
        </div>

      </div>
    </>
  );
}

export default QrCodePage;