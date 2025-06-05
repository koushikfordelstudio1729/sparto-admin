import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { DashBoardEntity } from "../../domain/entities/DashBoardEntity";
import type { DashBoardRepository } from "../../domain/repository/DashBoardRepository";
import { DashBoardApiDatasource } from "../datasource/DashBoardApiDatasource";
import { DashBoardModelMapper } from "../mappers/DashBoardModelMapper";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
// import type { StorageService } from "@/commons/storage/StorageService";
import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import type { PaymentStatus } from "../dtos/UpdatePaymentStatusDTO";

export class DashBoardRepositoryImpl implements DashBoardRepository {
  private readonly dataSource: DashBoardApiDatasource;
  // private readonly localStorageService: StorageService;

  constructor(
    dataSource: DashBoardApiDatasource
    // localStorageService: StorageService
  ) {
    this.dataSource = dataSource;
    // this.localStorageService = localStorageService;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const models = await this.dataSource.getAllUsers();
    return models.map((model) => model.toEntity());
  }

  async createUser(entity: UserEntity): Promise<DashBoardEntity> {
    const dto = DashBoardModelMapper.toCreateDTO(entity);
    const model = await this.dataSource.createUser(dto);
    return model.toEntity();
  }

  async updateUser(id: string, entity: UserEntity): Promise<void> {
    const dto = DashBoardModelMapper.toUpdateDTO(entity);
    await this.dataSource.updateUser(id, dto);
  }
  async updateUserStatus(id: string, entity: UserEntity): Promise<void> {
    const dto = DashBoardModelMapper.toUpdateUserStatusDTO(entity);
    await this.dataSource.updateUserStatus(id, dto);
  }
  async updateUserRole(id: string, entity: UserEntity): Promise<void> {
    const dto = DashBoardModelMapper.toUpdateUserRoleDTO(entity);
    await this.dataSource.updateUserRole(id, dto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.dataSource.deleteUser(id);
  }

  async getOrderById(id: string): Promise<OrderEntity> {
    const model = await this.dataSource.getOrderById(id);
    return model.toEntity();
  }
  async getAllOrders(): Promise<OrderEntity[]> {
    const models = await this.dataSource.getAllOrders();
    const orders = models.map((model) => model.toEntity());
    return orders;
  }
  async getAllPayments(): Promise<PaymentEntity[]> {
    const models = await this.dataSource.getAllPayments();
    return models.map((model) => model.toEntity());
  }
  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<void> {
    const dto = DashBoardModelMapper.toUpdatePaymentStatusDTO(status);
    await this.dataSource.updatePaymentStatus(id, dto);
  }
}
