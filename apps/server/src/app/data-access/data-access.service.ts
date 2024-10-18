import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_CONFIG } from './data-access.model';

@Injectable()
export class DataAccessService extends PrismaClient {
  constructor() {
    super(PRISMA_CONFIG);
  }
}
