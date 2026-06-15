import type {
  UserInfo
} from "../entity/auth";

export interface GetEmployeeRequest {
  email: string;
}

export interface GetEmployeeResponse
extends UserInfo {}