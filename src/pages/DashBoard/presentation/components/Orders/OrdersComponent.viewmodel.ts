import type { AppDispatch } from "@/app/store/store";
import {
  setSubmitting,
  setNameInput,
  setActiveSample,
} from "./OrdersComponent.slice";

export class OrdersComponentViewModel {
  private readonly dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  updateNameInput(value: string): void {
    this.dispatch(setNameInput(value));
  }

  setActiveSample(sample: null): void {
    this.dispatch(setActiveSample(sample));
  }

  async submit(): Promise<void> {
    try {
      this.dispatch(setSubmitting(true));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      this.dispatch(setSubmitting(false));
    }
  }
}
