import { PrismaClient } from "@prisma/client";

export async function seedRoles(prisma: PrismaClient) {
  let roles = [
    { id: 1, name: "User" },
    { id: 2, name: "Member" },
  ].map((r) => prisma.role.upsert({ where: { id: r.id }, update: {}, create: r }));

  await Promise.all(roles);

  console.log("Roles are successfully set");
}
