import {
  ROLE
} from "../constants/roles";

import type {
  UserInfo
} from "../types/entity/auth";

export function isAdmin(
  user:
    UserInfo | null
){

  return (
    user?.role
    ===
    ROLE.ADMIN
  );

}