import type { DashBoardEntity } from "../entities/DashBoardEntity";

export interface DashBoardRepository {
  getAll(): Promise<DashBoardEntity[]>;

  create(entity: DashBoardEntity): Promise<DashBoardEntity>;

  update(id: string, entity: DashBoardEntity): Promise<DashBoardEntity>;

  delete(id: string): Promise<void>;
}
