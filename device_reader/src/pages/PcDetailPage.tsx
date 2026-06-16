import { useParams } from "react-router-dom";
// 1. 引入改名后的自定义 Hook
import { usePcDetail } from "../services/pcService";

import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../hooks/useAuth";

function PcDetailPage() {
  // 从路由获取 pcNumber
  const { pcNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // 2. 一行代码替代原有的 useState, useEffect 和 fetch 逻辑
  // 解构出 data (自动映射为 PcDetailResponse 类型) 和 isLoading 状态
  const { data: pcDetail, isLoading, error } = usePcDetail(pcNumber || "");

  // 3. 处理加载中状态（更严谨，结合了 React Query 的自动感知）
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="mt-3 text-gray-600 font-medium">読込中...</p>
        </div>
      </div>
    );
  }

  // 4. 可选：处理错误状态（如果 GAS 返回了错误，可以在这里直接展示给用户）
  if (error) {
    return (
      <>
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium">
          読込失敗: {error.message}
        </div>
        
        <SecondaryButton
          onClick={() => { navigate(`/qr-scan`) }}
          className="sm:flex-1"
        >
          QR読取に戻る
        </SecondaryButton>
      </>
    );
  }

  // 5. 这里的 pcDetail 已经是安全的、有完整 TypeScript 提示的数据了
  return (
    <>
      <PageHeader title="PC詳細"/>

      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">PC番号</p>
            <p className="text-sm sm:text-lg font-semibold text-gray-900 mb-6">{pcDetail?.pcNumber}</p>

            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">PC名</p>
            <p className="text-sm sm:text-lg font-semibold text-gray-900 mb-6">{pcDetail?.pcName}</p>

            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">現使用者</p>
            <p className="text-sm sm:text-base text-gray-900 mb-6">{pcDetail?.employeeCurrent}</p>

            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">PC状況</p>
            <p className="text-sm sm:text-base text-gray-900 mb-6">{pcDetail?.pcStatus}</p>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">PC分類</p>
            <p className="text-sm sm:text-base text-gray-900 mb-6">{pcDetail?.pcCategory}</p>

            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">PC用途</p>
            <p className="text-sm sm:text-base text-gray-900 mb-6">{pcDetail?.pcUsage}</p>

            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">PC区分</p>
            <p className="text-sm sm:text-base text-gray-900 mb-6">{pcDetail?.pcDivision}</p>

            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">PC場所</p>
            <p className="text-sm sm:text-base text-gray-900 mb-6">{pcDetail?.pcLocation}</p>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-gray-200 mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">更新日</p>
          <p className="text-sm sm:text-base text-gray-900">{pcDetail?.pcUpdateDate}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
        {
          user?.role === "admin"
            &&(
            <>
              <SecondaryButton
                onClick={() => { navigate(`/pc-list`) }}
                className="sm:flex-1"
              >
                PC一覧に戻る
              </SecondaryButton>

              <PrimaryButton
                onClick={() => { navigate(`/pc-edit/${pcDetail?.pcNumber}`) }}
                className="sm:flex-1"
              >
                編集
              </PrimaryButton>
            </>
          )
        }

        <SecondaryButton
          onClick={() => { navigate(`/qr-scan`) }}
          className="sm:flex-1"
        >
          QR読取に戻る
        </SecondaryButton>

        <PrimaryButton
          onClick={() => { navigate(`/qr-code/${pcDetail?.pcNumber}`) }}
          className="sm:flex-1"
        >
          QR表示
        </PrimaryButton>
      </div>
    </>
  );
}

export default PcDetailPage;