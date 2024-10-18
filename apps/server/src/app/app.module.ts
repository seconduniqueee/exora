import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DataAccessModule } from './data-access/data-access.module';

@Module({
  imports: [AuthModule, DataAccessModule],
})
export class AppModule {}
