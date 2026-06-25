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

  // StrictModeによる二重カメラ防止
  const cleanupLockRef = useRef<Promise<void>>(Promise.resolve());
  
  useEffect(() => {
    hasHandledScanRef.current = false;
    let isActive = true;
    let scanner: Html5QrcodeScanner | null = null;

    const acquiredStreams: MediaStream[] = [];
    const originalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
      navigator.mediaDevices
    );
    navigator.mediaDevices.getUserMedia = async (
      constraints?: MediaStreamConstraints
    ) => {
      const stream = await originalGetUserMedia(constraints);
      if (!isActive) {
        // カメラのstreamを獲得する時、コンポネントもう破棄した場合、カメラ閉じる
        // ゴーストストリーム防ぐ
        stream.getTracks().forEach((track) => track.stop());
      } else {
        acquiredStreams.push(stream);
      }
      return stream;
    };

    const start = async () => {
      //　前回のカメラcleanupを待つ
      await cleanupLockRef.current;
      if (!isActive) return;// 待つ期間コンポネント破棄されたら、カメラの再起動は不要

      const container = document.getElementById("qr-reader");
      if (container) {
        container.innerHTML = "";
      }

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
          async (decodedText : string) => {
            if (hasHandledScanRef.current) return;
            hasHandledScanRef.current = true;

            try {
              await scanner?.clear();
            } catch(err) {
              console.warn("Failed to stop QR scanner cleanly:", err);
            } finally {
              // clearに関係せず、カメラを強制終了させる
              acquiredStreams.forEach((stream) =>
                stream.getTracks().forEach((track) => track.stop())
              );
            }
            navigate(`/pc-detail/${decodedText}`);
          },
          () => {
            // ignore scan errors
          }
        );
      } catch (error) {
        showError(error);
      }
    };

    void start();

    return () => {
      isActive = false;
      // 他のページを影響しないため、globalのgetUserMediaを元に戻す
      navigator.mediaDevices.getUserMedia = originalGetUserMedia;
      // 今回のcleanupをlock, 次のstart()はこれが完成した後実行する
      cleanupLockRef.current = (scanner?.clear() ?? Promise.resolve())
        .catch(() => {})
        .finally(()=>{
          //　html5-qrcodeと関係せず、全stream強制的に閉じる
          acquiredStreams.forEach((stream) =>
            stream.getTracks().forEach((track) => track.stop())
          );
        });
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