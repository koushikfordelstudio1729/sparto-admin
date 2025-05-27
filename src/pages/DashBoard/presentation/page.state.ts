import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export interface PageState {
  isLoading: boolean;
  users: UserEntity[];
}
