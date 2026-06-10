import type {
  EmployeeInfo
} from "../entity/employee";

export interface GetEmployeeRequest {
  email: string;
}

export interface GetEmployeeResponse
extends EmployeeInfo {}