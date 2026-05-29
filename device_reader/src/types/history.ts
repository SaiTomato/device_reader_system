export interface UpdateType {
    LOAN: 'LOAN';
    CREATE: 'CREATE';
    UPDATE: 'UPDATE';
    DELETE: 'DELETE';
}

export interface PcHistory {

    historyId: number;

    pcNumber: string;

    currentUser: string;

    historyAction: string;

    updatedAt: Date;

    updatedBy: string;
    
    updateType: keyof UpdateType;
}