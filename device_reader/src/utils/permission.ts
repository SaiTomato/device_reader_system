import {
  ROLE
} from "../constants/roles";

import type {
  EmployeeInfo
} from "../types/entity/employee";

export function isAdmin(
  user:
    EmployeeInfo | null
){

  return (
    user?.role
    ===
    ROLE.ADMIN
  );

}