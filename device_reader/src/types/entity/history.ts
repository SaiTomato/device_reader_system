export type UpdateType =
  | "LOAN"
  | "CREATE"
  | "UPDATE"
  | "DELETE";

export interface PcHistory {

    historyId: number;

    pcNumber: string;

    currentUser: string;

    historyAction: string;

    updatedAt: Date;

    updatedBy: string;
    
    updateType: UpdateType;
}