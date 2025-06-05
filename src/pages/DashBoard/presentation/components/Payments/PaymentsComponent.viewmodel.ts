import type { AppDispatch } from "@/app/store/store";
import { store } from "@/app/store/store";
import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import type { GetAllPaymentsUseCase } from "@/pages/DashBoard/domain/usecases/GetAllPaymentsUseCase";
import type { UpdatePaymentStatusUseCase } from "@/pages/DashBoard/domain/usecases/UpdatePaymentStatusUseCase";
import { setLoading, setPayments } from "./PaymentsComponent.slice";

export class PaymentsComponentViewModel {
  private readonly dispatch: AppDispatch;
  private readonly getAllPaymentsUseCase: GetAllPaymentsUseCase;
  private readonly updatePaymentStatusUseCase: UpdatePaymentStatusUseCase;

  constructor(
    dispatch: AppDispatch,
    getAllPaymentsUseCase: GetAllPaymentsUseCase,
    updatePaymentStatusUseCase: UpdatePaymentStatusUseCase // ✅ include here
  ) {
    this.dispatch = dispatch;
    this.getAllPaymentsUseCase = getAllPaymentsUseCase;
    this.updatePaymentStatusUseCase = updatePaymentStatusUseCase; // ✅ correct assignment
  }

  async initialize(): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      const payments = await this.getAllPaymentsUseCase.execute();
      this.dispatch(setPayments(payments));
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  async handleStatusChange(
    paymentId: string,
    newStatus: PaymentEntity["status"]
  ): Promise<void> {
    try {
      if (!newStatus) {
        console.warn("Payment status is undefined.");
        return;
      }
      await this.updatePaymentStatusUseCase.execute(paymentId, newStatus);

      const state = store.getState();
      const updatedPayments = state.paymentsComponentSlice.payments.map((p) =>
        p._id === paymentId ? { ...p, status: newStatus } : p
      );

      this.dispatch(setPayments(updatedPayments));
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  }
}
