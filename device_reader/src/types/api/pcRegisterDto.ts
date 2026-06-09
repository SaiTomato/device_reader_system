export interface RegisterPcRequest {

  pcNumber: string;

  pcName: string;

  employeeCurrent: string;

  pcStatus: string;

  pcCategory: string;

  pcUsage: string;

  pcDivision: string;

  pcLocation: string;

  pcMaker: string;

  pcModel: string;

  pcCpu: string;

  pcRam: string;

  pcBuyDate: string;

  pcOs: string;

  pcOsLicense: string;

//   pcBackupDate: string;

  pcPassword: string;

  pcOfficeLicense: string;

  pcIpAddress: string;

  updatedBy: string;

}

export interface RegisterPcResponse {

  registered: boolean;

  pcNumber: string;

}