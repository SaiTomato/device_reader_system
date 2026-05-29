import type {

PcDetail

} from "../types/pc";

export async function getPcDetail(

pcNumber: string

): Promise<PcDetail> {

return {

pcNumber,
pcName: "営業PC001",
employeeName: "山田太郎",
status: "使用中"

};

}


// TODO: APIからPC詳細情報を取得する実装を追加する
// fetch()
// axios()
// GAS API
