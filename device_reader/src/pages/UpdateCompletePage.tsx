import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

function UpdateCompletePage() {
  const navigate = useNavigate();
  
  return (

    <>
      <PageHeader title="更新完了"/>

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