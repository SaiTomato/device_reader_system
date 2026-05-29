import type {PcDetail} from "../types/pc";

import type {ApiResponse} from "../types/api";

const API_URL = import.meta.env.VITE_GAS_API_URL;

export async function getPcDetail(

pcNumber: string

): Promise<ApiResponse<PcDetail>> {

const response = await fetch(

API_URL,

{

  method: "POST",

  headers: {

    "Content-Type":
      "application/json"

  },

  body: JSON.stringify({

    action: "getPcDetail",

    pcNumber

  })

}

);

return await response.json();

}


// TODO: APIからPC詳細情報を取得する実装を追加する
// fetch()
// axios()
// GAS API
