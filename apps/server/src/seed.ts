import { PrismaClient } from "@prisma/client";
import { seedEventTypes, seedRoles, seedServiceTypes } from "./database/seeders";

async function seedDatabase() {
  const prismaClient = new PrismaClient();

  await Promise.all([
    seedRoles(prismaClient),
    seedEventTypes(prismaClient),
    seedServiceTypes(prismaClient),
  ]);
}

void seedDatabase();
