import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";

export interface OrdersComponentState {
  isSubmitting: boolean;

  nameInput: string;

  activeSample: DashBoardEntity | null;
}
