import { PrismaClient } from "@prisma/client";

export async function seedServiceTypes(prisma: PrismaClient) {
  let serviceTypes = [
    { id: 1, name: "Catering" },
    { id: 2, name: "Photography" },
    { id: 3, name: "Venue" },
    { id: 4, name: "Decorations" },
    { id: 5, name: "Entertainment" },
    { id: 6, name: "Other" },
  ].map((st) => prisma.serviceType.upsert({ where: { id: st.id }, update: {}, create: st }));

  await Promise.all(serviceTypes);

  console.log("Service types are successfully set");
}
