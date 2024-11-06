import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.upsert({ where: { id: 1 }, update: {}, create: { id: 1, name: "User" } });
  await prisma.role.upsert({ where: { id: 2 }, update: {}, create: { id: 2, name: "Member" } });

  console.log("SUCCESS");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
