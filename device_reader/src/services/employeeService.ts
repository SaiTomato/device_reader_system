import { requestGas } from "../types/api/client";
import type { GetEmployeeRequest, GetEmployeeResponse } from "../types/api/empInfoDto";

export function getEmployeeByEmail(
    request: GetEmployeeRequest
){
    return requestGas<GetEmployeeResponse>(
        "getEmployeeByEmail",
        request
    );
}