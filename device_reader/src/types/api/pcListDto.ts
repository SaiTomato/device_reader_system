import type { PcDetail } from "../entity/pc";
import type { MasterData } from "../entity/master";

export type PcListResponse = Pick<PcDetail, 
    'pcNumber' | 'pcName' | 'employeeCurrent'>[]; 

export type PcFilterOptionsResponse = MasterData & {
    employeeName?: string[];
};

export type PcListFilters = {
    pcStatus?: string;

    pcCategory?: string;

    pcUsage?: string;

    pcDivision?: string;

    pcLocation?: string;

    employeeName?: string;
}
