import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { DashBoardEntity } from "../entities/DashBoardEntity";

export interface DashBoardRepository {
  getAllUsers(): Promise<UserEntity[]>;

  create(entity: DashBoardEntity): Promise<DashBoardEntity>;

  update(id: string, entity: DashBoardEntity): Promise<DashBoardEntity>;

  delete(id: string): Promise<void>;
}
