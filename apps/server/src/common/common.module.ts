import { Module } from "@nestjs/common";
import { MappingModule } from "./mapping/mapping.module";

@Module({
  imports: [MappingModule],
  exports: [MappingModule],
})
export class CommonModule {}
