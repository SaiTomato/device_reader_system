export type UserRole =
  | "admin"
  | "user";

export interface UserInfo {

  email: string;

  employeeName: string;

  role: UserRole;

  enabled: boolean;

  id_token: string;

}