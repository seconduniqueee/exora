import { Injectable } from "@nestjs/common";
import { ClassTransformOptions, plainToInstance } from "class-transformer";

@Injectable()
export class MappingService {
  defaultOptions: ClassTransformOptions = { excludeExtraneousValues: true };

  map<T, V>(dtoClass: new () => T, entity: V, options?: ClassTransformOptions): T {
    let mappingOptions = { ...this.defaultOptions, ...options };
    return plainToInstance(dtoClass, entity, mappingOptions);
  }

  mapMany<T, V>(dtoClass: new () => T, entities: V[], options?: ClassTransformOptions): T[] {
    let mappingOptions = { ...this.defaultOptions, ...options };
    return entities.map((entity) => plainToInstance(dtoClass, entity, mappingOptions));
  }
}
