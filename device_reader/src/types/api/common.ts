export interface ApiResponse<T> {

result: "success" | "error";

data?: T;

message?: string;

}
