import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { DashBoardEntity } from "../entities/DashBoardEntity";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";
import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";
export interface DashBoardRepository {
  getAllUsers(): Promise<UserEntity[]>;

  createUser(entity: UserEntity): Promise<DashBoardEntity>;

  updateUser(id: string, entity: UserEntity): Promise<void>;
  updateUserStatus(id: string, entity: UserEntity): Promise<void>;
  updateUserRole(id: string, entity: UserEntity): Promise<void>;
  deleteUser(id: string): Promise<void>;

  getOrderById(id: string): Promise<OrderEntity>;
  getAllOrders(): Promise<OrderEntity[]>;
  getAllPayments(): Promise<PaymentEntity[]>;
  updatePaymentStatus(
    paymentId: string,
    newStatus: PaymentEntity["status"]
  ): Promise<void>;
  getRequestedOrders(): Promise<RequestEntity[]>;
  getClarifications(requestId: string): Promise<ClarificationEntity[]>;
  createClarification(entity: ClarificationEntity): Promise<void>;
}
