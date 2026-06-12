export type UpdateType =
  | "LOAN"
  | "CREATE"
  | "UPDATE"
  | "DELETE";

export interface PcHistory {

    historyId: string;

    pcNumber: string;

    currentUser: string;

    historyAction: string;

    updatedAt: Date;

    updatedBy: string;
    
    updateType: UpdateType;
}