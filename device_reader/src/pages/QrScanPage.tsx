// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import { showError } from "../utils/error";
// import { SecondaryButton } from "../components/common/Button";
// import PageHeader from "../components/common/PageHeader";

// function QrScanPage() {

//   const navigate = useNavigate();

//   // clear()した後の重複スキャン防止
//   const hasHandledScanRef = useRef(false);

//   // StrictModeによる二重カメラ防止
//   const cleanupLockRef = useRef<Promise<void>>(Promise.resolve());
  
//   useEffect(() => {
//     hasHandledScanRef.current = false;
//     let isActive = true;
//     let scanner: Html5QrcodeScanner | null = null;

//     const acquiredStreams: MediaStream[] = [];
//     const originalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
//       navigator.mediaDevices
//     );
//     navigator.mediaDevices.getUserMedia = async (
//       constraints?: MediaStreamConstraints
//     ) => {
//       const stream = await originalGetUserMedia(constraints);
//       if (!isActive) {
//         // カメラのstreamを獲得する時、コンポネントもう破棄した場合、カメラ閉じる
//         // ゴーストストリーム防ぐ
//         stream.getTracks().forEach((track) => track.stop());
//       } else {
//         acquiredStreams.push(stream);
//       }
//       return stream;
//     };

//     const start = async () => {
//       //　前回のカメラcleanupを待つ
//       await cleanupLockRef.current;
//       if (!isActive) return;// 待つ期間コンポネント破棄されたら、カメラの再起動は不要

//       const container = document.getElementById("qr-reader");
//       if (container) {
//         container.innerHTML = "";
//       }

//       try {
//         scanner = new Html5QrcodeScanner(
//             "qr-reader",
//             {
//               fps: 10,
//               qrbox: {
//                 width: 250,
//                 height: 250
//               },
//               rememberLastUsedCamera: true
//             },
//             false
//           );

//         scanner.render(
//           async (decodedText : string) => {
//             if (hasHandledScanRef.current) return;
//             hasHandledScanRef.current = true;

//             try {
//               await scanner?.clear();
//             } catch(err) {
//               console.warn("Failed to stop QR scanner cleanly:", err);
//             } finally {
//               // clearに関係せず、カメラを強制終了させる
//               acquiredStreams.forEach((stream) =>
//                 stream.getTracks().forEach((track) => track.stop())
//               );
//             }
//             navigate(`/pc-detail/${decodedText}`);
//           },
//           () => {
//             // ignore scan errors
//           }
//         );
//       } catch (error) {
//         showError(error);
//       }
//     };

//     void start();

//     return () => {
//       isActive = false;
//       // 他のページを影響しないため、globalのgetUserMediaを元に戻す
//       navigator.mediaDevices.getUserMedia = originalGetUserMedia;
//       // 今回のcleanupをlock, 次のstart()はこれが完成した後実行する
//       cleanupLockRef.current = (scanner?.clear() ?? Promise.resolve())
//         .catch(() => {})
//         .finally(()=>{
//           //　html5-qrcodeと関係せず、全stream強制的に閉じる
//           acquiredStreams.forEach((stream) =>
//             stream.getTracks().forEach((track) => track.stop())
//           );
//         });
//     };

//   }, [navigate]);

//   return (

//     <div className="space-y-6 sm:space-y-8">

//       <PageHeader title="QR読取"/>

//       <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200">
//         <p className="text-gray-700 text-base sm:text-lg mb-6 text-center font-medium">
//           PCのQRコードを読み取ってください
//         </p>

//         <div 
//           id="qr-reader" 
//           className="flex justify-center bg-gray-50 rounded-lg p-6 min-h-80"
//         />
//       </div>

//       <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//         <SecondaryButton
//           onClick={() => navigate("/home")}
//           className="sm:flex-1"
//         >
//           戻る
//         </SecondaryButton>
//       </div>

//     </div>

//   );

// }

// export default QrScanPage;

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode"; // 改用更底层的 Html5Qrcode
import { showError } from "../utils/error";
import { SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

// 【核心修改 1】将锁移到组件外部。这样跨页面、跨挂载周期的清理锁才能真正生效。
let globalCleanupLock: Promise<void> = Promise.resolve();

function QrScanPage() {
  const navigate = useNavigate();
  const hasHandledScanRef = useRef(false);

  useEffect(() => {
    hasHandledScanRef.current = false;
    let isActive = true;
    let html5QrCode: Html5Qrcode | null = null;
    const acquiredStreams: MediaStream[] = [];

    // 拦截全局 getUserMedia 拦截 Ghost Stream
    const originalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(
      navigator.mediaDevices
    );
    navigator.mediaDevices.getUserMedia = async (constraints?: MediaStreamConstraints) => {
      const stream = await originalGetUserMedia(constraints);
      if (!isActive) {
        stream.getTracks().forEach((track) => track.stop());
      } else {
        acquiredStreams.push(stream);
      }
      return stream;
    };

    const start = async () => {
      // 【核心修改 2】真正等待上一次无论什么原因（切页面或扫码成功）留下的清理工作结束
      await globalCleanupLock;
      if (!isActive) return;

      try {
        // 使用 Html5Qrcode，我们需要确保容器存在
        const container = document.getElementById("qr-reader");
        if (!container) return;

        // 每次启动前清空容器
        container.innerHTML = "";

        // 实例化纯逻辑的 html5QrCode
        html5QrCode = new Html5Qrcode("qr-reader");

        // 启动摄像头并开始监听
        await html5QrCode.start(
          { facingMode: "environment" }, // 优先后置摄像头
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText: string) => {
            if (hasHandledScanRef.current) return;
            hasHandledScanRef.current = true;

            // 扫码成功，立即停止摄像头
            if (html5QrCode && html5QrCode.isScanning) {
              try {
                await html5QrCode.stop();
              } catch (err) {
                console.warn("Failed to stop scan on success:", err);
              }
            }

            // 无论停没成功，暴力释放所有捕获到的流
            acquiredStreams.forEach((stream) =>
              stream.getTracks().forEach((track) => track.stop())
            );

            navigate(`/pc-detail/${decodedText}`);
          },
          () => {
            // ignore scan errors
          }
        );
      } catch (error) {
        // 如果是 StrictMode 的第二次并发进入，通常会被上面的 globalCleanupLock 挡住
        // 如果依然报错，我们在 isActive 为 true 时才提示用户
        if (isActive) {
          showError(error);
        }
      }
    };

    void start();

    // 组件卸载（换页面）时的清理
    return () => {
      isActive = false;
      // 还原全局方法
      navigator.mediaDevices.getUserMedia = originalGetUserMedia;

      // 【核心修改 3】把本次的清理任务挂载到全局锁上
      globalCleanupLock = new Promise<void>(async (resolve) => {
        try {
          if (html5QrCode && html5QrCode.isScanning) {
            await html5QrCode.stop();
            console.log("Html5Qrcode 停止成功");
          }
        } catch (err) {
          console.warn("Html5Qrcode 停止失败:", err);
        } finally {
          // 无论第三方库的 stop 是否成功或崩溃，
          // 这里是让摄像头灯立刻熄灭、确保下一次能秒开的关键。
          acquiredStreams.forEach((stream) => {
            stream.getTracks().forEach((track) => {
              track.stop();
              console.log("Track 强制停止:", track.label);
            });
          });
          // 彻底完成清理，释放锁，让下一个页面可以安全进入
          resolve();
        }
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

        {/* 样式微调，Html5Qrcode 需要给它一个相对或绝对定位的包裹层以防闪烁 */}
        <div className="flex justify-center bg-gray-50 rounded-lg p-6 min-h-80 relative">
          <div id="qr-reader" className="w-full max-w-md mx-auto" />
        </div>
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
