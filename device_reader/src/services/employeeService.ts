import { requestGas } from "../types/api/client";
import type { GetEmployeeRequest } from "../types/api/empInfoDto";

export function getEmployeeByEmail(
    request: GetEmployeeRequest
){
    return requestGas(
        "getEmployeeByEmail",
        request
    );
}