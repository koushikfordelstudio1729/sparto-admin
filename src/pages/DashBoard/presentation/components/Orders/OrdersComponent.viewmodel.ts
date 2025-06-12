import type { AppDispatch } from "@/app/store/store";
import type { GetAllOrdersUseCase } from "@/pages/DashBoard/domain/usecases/GetAllOrdersUseCase";
import {
  setAllOrders,
  setLoading,
  updateOrderInList,
} from "./OrdersComponent.slice";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import type { RootState } from "@/app/store/store";
import type { UpdateOrderStatusUseCase } from "@/pages/DashBoard/domain/usecases/UpdateOrderStatusUseCase";

export class OrdersComponentViewModel {
  private readonly dispatch: AppDispatch;
  private readonly getState: () => RootState;
  private readonly getAllOrdersUseCase: GetAllOrdersUseCase;
  private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase;

  constructor(
    dispatch: AppDispatch,
    getState: () => RootState,
    getAllOrdersUseCase: GetAllOrdersUseCase,
    updateOrderStatusUseCase: UpdateOrderStatusUseCase
  ) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.getAllOrdersUseCase = getAllOrdersUseCase;
    this.updateOrderStatusUseCase = updateOrderStatusUseCase;
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
  async updateOrderStatus(
    orderId: string,
    newStatus: OrderEntity["status"]
  ): Promise<void> {
    // 🔍 pull orders from the correct slice
    const currentOrder = this.getState()
      .OrdersComponentslice // ← use the slice that owns orders
      .allOrders.find((o) => o.id === orderId);

    if (!currentOrder) return;

    // 🟢 optimistic update
    const optimisticOrder: OrderEntity = { ...currentOrder, status: newStatus };
    this.dispatch(updateOrderInList(optimisticOrder));
    this.dispatch(setLoading(true));

    try {
      // 🌐 persist to backend
      await this.updateOrderStatusUseCase.execute(orderId, newStatus);
      // API returns only a success message, so nothing else to do
    } catch (err) {
      console.error("Failed to update order status", err);
      // 🔄 revert on failure
      this.dispatch(updateOrderInList(currentOrder));
    } finally {
      this.dispatch(setLoading(false));
    }
  }
}
