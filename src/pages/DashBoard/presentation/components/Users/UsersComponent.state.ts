import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";

export interface UsersComponentState {
  isSubmitting: boolean;

  nameInput: string;

  activeSample: DashBoardEntity | null;
}
