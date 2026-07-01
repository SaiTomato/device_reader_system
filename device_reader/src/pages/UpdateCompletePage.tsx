import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function UpdateCompletePage() {
  const { pcNumber } = useParams();
  const navigate = useNavigate();
  
  return (

    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-md space-y-8">
        
        <div className="text-center">
          <PageHeader title="更新完了"/>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            更新が完了しました
          </p>
          <p className="text-gray-600">
            PC情報の更新が正常に完了いたしました。
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate(`/pc-detail/${pcNumber}`)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
          >
            戻る
          </button>
        </div>

      </div>

    </div>

  );

}

export default UpdateCompletePage;