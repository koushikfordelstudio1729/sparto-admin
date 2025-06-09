import type { AppDispatch } from "@/app/store/store";
import { setRequestedOrders, setLoading } from "./ReuestOrderComponent.slice";
import type { GetRequestedOrdersUseCase } from "@/pages/DashBoard/domain/usecases/GetRequestedOrdersUseCase";

export class RequestOrdersComponentViewModel {
  private readonly dispatch: AppDispatch;
  private readonly getRequestedOrdersUseCase: GetRequestedOrdersUseCase;

  constructor(
    dispatch: AppDispatch,
    getRequestedOrdersUseCase: GetRequestedOrdersUseCase
  ) {
    this.dispatch = dispatch;
    this.getRequestedOrdersUseCase = getRequestedOrdersUseCase;
  }

  /** Call this from your component (e.g. useEffect) to kick off the load */
  async initialize(): Promise<void> {
    await this.loadRequestedOrders();
  }

  /** Fetch & dispatch into the slice */
  async loadRequestedOrders(): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      const orders = await this.getRequestedOrdersUseCase.execute();
      this.dispatch(setRequestedOrders(orders));
    } finally {
      this.dispatch(setLoading(false));
    }
  }
}
