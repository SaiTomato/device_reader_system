export interface UpdatePcRequest {

  pcNumber: string;

  pcName: string;

  employeeCurrent: string;

  pcStatus: string;

  pcCategory: string;

  pcUsage: string;

  pcDivision: string;

  pcLocation: string;

  pcRemark: string;

  updatedBy: string; // 追加: 更新者の情報を含めるフィールド

}

export interface UpdatePcResponse {

  pdfData: string;

}