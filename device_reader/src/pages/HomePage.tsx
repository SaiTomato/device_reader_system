import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../hooks/useAuth";

function HomePage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {

    setUser(null);

    navigate(`/`)
    
  };

  return (

  <div className="space-y-6 sm:space-y-8">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

          <div>

            <PageHeader title="ホーム"/>

            <p
              id="homeUserName"
              className="text-sm text-gray-600"
            ></p>

          </div>

          <button
            className="w-full sm:w-auto px-4 py-2.5 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        <div className="bg-white rounded-lg p-5 sm:p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium mb-2">ユーザー名</h3>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">
            {user?.employeeName}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          <button
            className="bg-linear-to-br from-blue-600 to-blue-700 text-white py-4 sm:py-6 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
            onClick={() => navigate(`/qr-scan`)}
          >
            📱 QR読取
          </button>

          <button
            className="bg-linear-to-br from-green-600 to-green-700 text-white py-4 sm:py-6 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95"
            onClick={() => { navigate(`/pc-list`) }}
          >
            💻 PC一覧
          </button>

          {
            user?.role === "admin"
            &&
            (
              <button
                className="bg-linear-to-br from-gray-600 to-gray-700 text-white py-4 sm:py-6 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95"
                onClick={() => { navigate(`/history`) }}
              >
                📋 履歴
              </button>
            )
          }
          

        </div>

      </div>

  );

}

export default HomePage;
