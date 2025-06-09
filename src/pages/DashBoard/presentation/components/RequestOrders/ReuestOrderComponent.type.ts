import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";

export interface RequestOrdersState {
  requestOrders: RequestEntity[];
  loading: boolean;
  error: string | null;
}
