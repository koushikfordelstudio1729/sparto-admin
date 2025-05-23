import type { AppDispatch } from "@/app/store/store";
import { setLoading } from "./PaymentsComponent.slice";

export class PaymentsComponentViewModel {
  private readonly dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  async initialize(): Promise<void> {
    this.dispatch(setLoading(true));

    this.dispatch(setLoading(false));
  }
}
