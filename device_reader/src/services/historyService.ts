import { useQuery } from "@tanstack/react-query";
import { requestGas } from "../types/api/client";
import type { HistorySearchRequest, HistorySearchResponse } from "../types/api/pcHistoryDto";


export function useHistoryList(
  request: HistorySearchRequest
){
  return useQuery<HistorySearchResponse>({
    queryKey: [
      "history-list",
      request
    ],
    queryFn: () =>
      requestGas("getHistoryList", request),
  });
}