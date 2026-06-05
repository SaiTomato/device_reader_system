import { useParams } from "react-router-dom";
// 1. 引入改名后的自定义 Hook
import { usePcDetail } from "../services/pcService";

import { useNavigate } from "react-router-dom";

function PcDetailPage() {
  // 从路由获取 pcNumber
  const { pcNumber } = useParams();
  const navigate = useNavigate();

  // 2. 一行代码替代原有的 useState, useEffect 和 fetch 逻辑
  // 解构出 data (自动映射为 PcDetailResponse 类型) 和 isLoading 状态
  const { data: pcDetail, isLoading, error } = usePcDetail(pcNumber || "");

  // 3. 处理加载中状态（更严谨，结合了 React Query 的自动感知）
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 4. 可选：处理错误状态（如果 GAS 返回了错误，可以在这里直接展示给用户）
  if (error) {
    return <div>Loading failed: {error.message}</div>;
  }

  // 5. 这里的 pcDetail 已经是安全的、有完整 TypeScript 提示的数据了
  return (
    <>
      <div>
        <h1>
          PC詳細
        </h1>

        <p>
          PC番号:
          {pcDetail?.pcNumber}
        </p>

        <p>
          PC名:
          {pcDetail?.pcName}
        </p>

        <p>
          使用者:
          {pcDetail?.employeeCurrent}
        </p>

        <p>
          状態:
          {pcDetail?.pcStatus}
        </p>

        <p>
          分類:
          {pcDetail?.pcCategory}
        </p>

        <p>
          用途:
          {pcDetail?.pcUsage}
        </p>

        <p>
          区分:
          {pcDetail?.pcDivision}
        </p>

        <p>
          場所:
          {pcDetail?.pcLocation}
        </p>

        <p>
          更新日:
          {pcDetail?.pcUpdateDate}
        </p>
      </div>

      <div>
        <button
          onClick={() => { navigate(`/pc-list`) }}
        >
          PC一覧に戻る
        </button>

        <button
          onClick={() => { navigate(`/qr-scan`) }}
        >
          QRスキャンに戻る
        </button>

        <button
          onClick={() => { navigate(`/pc-edit/${pcDetail?.pcNumber}`) }}
        >
          編集
        </button>

        <button
          onClick={() => { navigate(`/qr-code/${pcDetail?.pcNumber}`) }}
        >
          QR表示
        </button>
      </div>
    </>
  );
}

export default PcDetailPage;