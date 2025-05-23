import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";

export interface ProfileComponentState {
  isSubmitting: boolean;

  nameInput: string;

  activeSample: DashBoardEntity | null;
}
