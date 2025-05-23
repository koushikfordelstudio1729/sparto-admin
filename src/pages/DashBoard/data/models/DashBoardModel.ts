import type { DashBoardEntity } from "../../domain/entities/DashBoardEntity";

export class DashBoardModel {
  id: string;

  name: string;

  description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  toEntity(): DashBoardEntity {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }

  static fromJson(obj: Record<string, string>): DashBoardModel {
    return new DashBoardModel(obj.id, obj.name, obj.description);
  }
}
