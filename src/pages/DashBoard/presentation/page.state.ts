import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export interface PageState {
  isLoading: boolean;
  users: UserEntity[];
  totalUsers: number;
  /** Number of active users */
  activeUsers: number;
  /** Number of deleted users */
  deletedUsers: number;
  inactiveUsers: number;
}
