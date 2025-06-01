import type { AppDispatch } from "@/app/store/store";
import type { GetAllOrdersUseCase } from "@/pages/DashBoard/domain/usecases/GetAllOrdersUseCase";
import { setAllOrders, setLoading } from "./OrdersComponent.slice";

export class OrdersComponentViewModel {
  private readonly dispatch: AppDispatch;
  private readonly getAllOrdersUseCase: GetAllOrdersUseCase;

  constructor(dispatch: AppDispatch, getAllOrdersUseCase: GetAllOrdersUseCase) {
    this.dispatch = dispatch;
    this.getAllOrdersUseCase = getAllOrdersUseCase;
  }

  async initialize(): Promise<void> {
    await this.getAllOrders();
  }

  async getAllOrders(): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      const orders = await this.getAllOrdersUseCase.execute();
      this.dispatch(setAllOrders(orders));
    } finally {
      this.dispatch(setLoading(false));
    }
  }
}
