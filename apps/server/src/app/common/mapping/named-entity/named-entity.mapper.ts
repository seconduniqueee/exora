import { Injectable } from "@nestjs/common";
import { NamedEntityModel } from "@exora/shared-models";

@Injectable()
export class NamedEntityMapper {
  map<T extends NamedEntityModel>(entity: T): NamedEntityModel {
    return this.mapEntity(entity);
  }

  mapMany<T extends NamedEntityModel>(entities: T[]): NamedEntityModel[] {
    return entities.map((e) => this.mapEntity(e));
  }

  private mapEntity<T extends NamedEntityModel>(entity: T): NamedEntityModel {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
