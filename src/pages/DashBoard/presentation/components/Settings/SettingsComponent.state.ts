import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";

export interface SettingsComponentState {
  isSubmitting: boolean;

  nameInput: string;

  activeSample: DashBoardEntity | null;
}
