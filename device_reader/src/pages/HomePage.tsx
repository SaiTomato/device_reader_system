import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (

  <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h4 className="text-xl font-semibold">
              PC管理システム
            </h4>

            <p
              id="homeUserName"
              className="text-sm text-gray-600"
            ></p>

          </div>

          <button
            className="px-3 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50"
            onClick={() => {
              // 这里可以添加注销逻辑，例如清除用户信息、重置状态等
              console.log("Logout clicked");
            }}
          >
            Logout
          </button>

        </div>

        <div className="grid gap-3">

          <button
            className="bg-blue-600 text-white py-3 rounded-lg text-lg"
            onClick={() => navigate(`/qr-scan`)}
          >
            QR読取
          </button>

          <button
            className="bg-green-600 text-white py-3 rounded-lg text-lg"
            onClick={() => { navigate(`/pc-list`) }}
          >
            PC一覧
          </button>

          <button
            className="bg-gray-500 text-white py-3 rounded-lg text-lg"
            onClick={() => { navigate(`/history`) }}
          >
            履歴
          </button>

        </div>

      </div>

  );

}

export default HomePage;
