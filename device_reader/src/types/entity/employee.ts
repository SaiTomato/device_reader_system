export interface Employee {

    employeeId: number;

    employeeName: string;

    employeePosition: string;

    employeeIdName: string;

    employeeNameKorean: string;

    employeeNameEnglish: string;

    employeeNameKana: string;

    employeeStatus: string;

    employeeCountry: string;

    employeeStartDate: Date;
    
    employeeEndDate: Date | null;
}

export type UserRole =
  | "admin"
  | "user";

export interface EmployeeInfo {

  email: string;

  employeeName: string;

  role: UserRole;

  enabled: boolean;

}