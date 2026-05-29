import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PcCard from "../components/PcCard";

function PcListPage() {

const navigate = useNavigate();
const [pcList] = useState([

{

  pcName: "営業PC001",
  pcNumber: "PC-001",
  employeeName: "山田太郎"

},

{

  pcName: "開発PC002",
  pcNumber: "PC-002",
  employeeName: "鈴木一郎"

}

]);

return (

<div>

  <h1>
    PC List Page
  </h1>

  {

    pcList.map((pc) => (

      <PcCard
        key={pc.pcNumber}
        pcName={pc.pcName}
        pcNumber={pc.pcNumber}
        employeeName={pc.employeeName}
        onDetailClick={() => navigate(`/pc-detail/${pc.pcNumber}`)}
      />

    ))

  }

</div>

);

}

export default PcListPage;
