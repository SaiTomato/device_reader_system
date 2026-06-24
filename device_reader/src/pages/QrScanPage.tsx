import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { showError } from "../utils/error";
import { SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

function QrScanPage() {

  const navigate = useNavigate();

  // clear()した後の重複スキャン防止
  const hasHandledScanRef = useRef(false);

  useEffect(() => {
    hasHandledScanRef.current = false;

    const container = document.getElementById("qr-reader");

    if(container){
      container.innerHTML = "";
    }

    let scanner: Html5QrcodeScanner;

    try {
      scanner = new Html5QrcodeScanner(

          "qr-reader",

          {
            fps: 10,

            qrbox: {
              width: 250,
              height: 250
            },

            rememberLastUsedCamera: true
          },

          false

        );

      scanner.render(

        async (
          decodedText : string
        ) => {
          if (hasHandledScanRef.current) return;
          hasHandledScanRef.current = true;

          try {

            await scanner.clear();

          } catch(err) {

            console.warn("Failed to stop QR scanner cleanly:", err);

          }

          navigate(
            `/pc-detail/${decodedText}`
          );

        },

        () => {
          // ignore scan errors
        }

      );
    } catch (error) {
      showError(error);
      return;
    }

    return () => {

      scanner
        .clear()
        .catch(() => {});

    };

  }, [navigate]);

  return (

    <div className="space-y-6 sm:space-y-8">

      <PageHeader title="QR読取"/>

      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200">
        <p className="text-gray-700 text-base sm:text-lg mb-6 text-center font-medium">
          PCのQRコードを読み取ってください
        </p>

        <div 
          id="qr-reader" 
          className="flex justify-center bg-gray-50 rounded-lg p-6 min-h-80"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <SecondaryButton
          onClick={() => navigate("/home")}
          className="sm:flex-1"
        >
          戻る
        </SecondaryButton>
      </div>

    </div>

  );

}

export default QrScanPage;