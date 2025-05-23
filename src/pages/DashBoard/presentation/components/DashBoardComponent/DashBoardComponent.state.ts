import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";

export interface DashBoardComponentState {
  isSubmitting: boolean;

  nameInput: string;

  activeSample: DashBoardEntity | null;
}
