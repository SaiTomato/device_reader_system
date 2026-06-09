import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { showError } from "../utils/error";

function QrScanPage() {

  const navigate = useNavigate();

  useEffect(() => {

    const container = document.getElementById("qr-reader");

    if(container){
      container.innerHTML = "";
    }

    const scanner =
      new Html5QrcodeScanner(

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
        decodedText
      ) => {

        try {

          await scanner.clear();

        } catch(err) {

          console.error(
            err
          );
          showError(err);

        }

        navigate(
          `/pc-detail/${decodedText}`
        );

      },

      () => {
        // ignore scan errors
      }

    );

    return () => {

      scanner
        .clear()
        .catch(() => {});

    };

  }, [navigate]);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        QR Scan
      </h1>

      <p className="mb-4">
        PCのQRコードを読み取ってください
      </p>

      <div id="qr-reader" />

      <button
        onClick={() => navigate("/")}
      >
        戻る
      </button>

    </div>

  );

}

export default QrScanPage;