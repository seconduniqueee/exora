import { PrismaClient } from "@prisma/client";

export async function seedServiceTypes(prisma: PrismaClient) {
  let serviceTypes = [
    { id: 1, name: "catering" },
    { id: 2, name: "photography" },
    { id: 3, name: "venue" },
    { id: 4, name: "decorations" },
    { id: 5, name: "entertainment" },
    { id: 6, name: "other" },
  ].map((st) => prisma.serviceType.upsert({ where: { id: st.id }, update: {}, create: st }));

  await Promise.all(serviceTypes);

  console.log("Service types are successfully set");
}
