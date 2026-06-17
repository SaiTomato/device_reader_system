import type {
  UserInfo
} from "../entity/auth";

export interface GetEmployeeRequest {
  id_token: string;
}

export interface GetEmployeeResponse
extends UserInfo {}