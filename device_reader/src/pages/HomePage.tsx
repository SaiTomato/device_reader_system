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

  <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">

        <div className="flex justify-between items-center mb-6">

          <div>

            <PageHeader title="ホーム"/>

            <p
              id="homeUserName"
              className="text-sm text-gray-600"
            ></p>

          </div>

          <button
            className="px-3 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        <div>
          ユーザー名：
          {user?.employeeName}
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

          {
            user?.role === "admin"
            &&
            (
              <button
                className="bg-gray-500 text-white py-3 rounded-lg text-lg"
                onClick={() => { navigate(`/history`) }}
              >
                履歴
              </button>
            )
          }
          

        </div>

      </div>

  );

}

export default HomePage;
