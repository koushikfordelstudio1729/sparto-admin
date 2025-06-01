import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { DashBoardEntity } from "../entities/DashBoardEntity";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";

export interface DashBoardRepository {
  getAllUsers(): Promise<UserEntity[]>;

  createUser(entity: UserEntity): Promise<DashBoardEntity>;

  updateUser(id: string, entity: UserEntity): Promise<void>;
  updateUserStatus(id: string, entity: UserEntity): Promise<void>;
  updateUserRole(id: string, entity: UserEntity): Promise<void>;
  deleteUser(id: string): Promise<void>;

  getOrderById(id: string): Promise<OrderEntity>;
  getAllOrders(): Promise<OrderEntity[]>;
}
