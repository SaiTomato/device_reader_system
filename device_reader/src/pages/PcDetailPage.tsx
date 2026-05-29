import {

useEffect,
useState

} from "react";

import type {

PcDetail

} from "../types/pc";

import { useParams } from "react-router-dom";

import {

getPcDetail

} from "../services/pcService";

function PcDetailPage() {

  const { pcNumber } = useParams();

  const [pcDetail, setPcDetail] = useState<PcDetail | null>(null);

  useEffect(() => {

    async function fetchPcDetail() {

      if(!pcNumber) return;

      const result = await getPcDetail(
        pcNumber
      );

      if(result.result === "success"
      && result.data
      ) {

        setPcDetail(
        result.data
        );

      }

    }

    fetchPcDetail();

  }, [pcNumber]);

  if(!pcDetail){

  return <div>Loading...</div>;

  }

  return (

  <div>

    <h1>
      PC Detail Page
    </h1>

    <p>

      PC番号:
      {pcDetail.pcNumber}

    </p>

    <p>

      PC名:
      {pcDetail.pcName}

    </p>

    <p>

      使用者:
      {pcDetail.employeeCurrent}

    </p>

    <p>

      状態:
      {pcDetail.pcStatus}

    </p>

  </div>

  );

}

export default PcDetailPage;
