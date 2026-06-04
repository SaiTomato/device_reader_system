import { useNavigate } from "react-router-dom";

function UpdateCompletePage() {
  const navigate = useNavigate();
  
  return (

    <>

      <h1>
        更新完了
      </h1>

      <div>
        <button
          onClick={() => navigate("/")}
        >
          ホーム
        </button>
      </div>
    </>

  );

}

export default UpdateCompletePage;