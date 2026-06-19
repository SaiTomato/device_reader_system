import type { PcDetail } from "../entity/pc";

export type PcDetailResponse = Pick<PcDetail, 
  'pcNumber' | 
  'pcName' |
  'pcStatus' |
  'pcCategory' |
  'pcUsage' |
  'pcDivision' |
  'pcLocation' |
  'employeeCurrent' |
  'pcRemark'
  > & {
  pcUpdateDate: string;
};