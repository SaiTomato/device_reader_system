import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../components/common/Button";

function UpdateCompletePage() {
  const navigate = useNavigate();
  
  return (

    <>

      <h1>
        更新完了
      </h1>

      <div>
        <SecondaryButton
          onClick={() => navigate("/")}
        >
          ホーム
        </SecondaryButton>
      </div>
    </>

  );

}

export default UpdateCompletePage;