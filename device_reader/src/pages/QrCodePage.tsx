import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { showError } from "../utils/error";
import { PrimaryButton, SecondaryButton } from "../components/common/Button";

function QrCodePage() {

  const { pcNumber } = useParams();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);

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

  if(!pcNumber){
    return <>PC番号がありません。<SecondaryButton onClick={() => navigate(`/qr-scan`)}>戻る</SecondaryButton></>;
  }

  return (
    <>
      <h1>QR表示</h1>

      <div ref={printRef}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          display: "inline-block"
        }}
      >
        <QRCodeSVG
          value={pcNumber}
          size={256}
        />
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "12px"
          }}
        >
          PC番号: {pcNumber}
        </div>
      </div>

      <div>
        <PrimaryButton onClick={handleDownload}>
          PNG保存
        </PrimaryButton>

        <PrimaryButton onClick={handlePrint}>
          印刷
        </PrimaryButton>
      </div>

      <div>
        <SecondaryButton onClick={() => navigate(`/qr-scan`)}>
          QRスキャンに戻る
        </SecondaryButton>

        <SecondaryButton onClick={() => navigate(`/pc-detail/${pcNumber}`)}>
          PC詳細に戻る
        </SecondaryButton>
      </div>
    </>
  );
}

export default QrCodePage;