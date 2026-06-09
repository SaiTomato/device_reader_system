import type { PcHistory } from "../entity/history";

export interface HistorySearchRequest {

  pcNumber?: string;

  employeeName?: string;

  updateType?: string;

  startDate?: string;

  endDate?: string;

}

export interface HistorySearchResponse {

  items: PcHistory[];

}