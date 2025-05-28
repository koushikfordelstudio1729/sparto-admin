import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { DashBoardEntity } from "../../domain/entities/DashBoardEntity";
import type { DashBoardRepository } from "../../domain/repository/DashBoardRepository";
import { DashBoardApiDatasource } from "../datasource/DashBoardApiDatasource";
import { DashBoardModelMapper } from "../mappers/DashBoardModelMapper";

export class DashBoardRepositoryImpl implements DashBoardRepository {
  private readonly dataSource: DashBoardApiDatasource;

  constructor(dataSource: DashBoardApiDatasource) {
    this.dataSource = dataSource;
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

  async updateUser(id: string, entity: UserEntity): Promise<DashBoardEntity> {
    const dto = DashBoardModelMapper.toUpdateDTO(entity);
    const model = await this.dataSource.updateUser(id, dto);
    return model.toEntity();
  }

  async delete(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }
}
