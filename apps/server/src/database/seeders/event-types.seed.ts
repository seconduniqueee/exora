import { PrismaClient } from "@prisma/client";

export async function seedEventTypes(prisma: PrismaClient) {
  let eventTypes = [
    { id: 1, name: "Wedding" },
    { id: 2, name: "Corporate" },
    { id: 3, name: "Party" },
    { id: 6, name: "Other" },
  ].map((et) => prisma.eventType.upsert({ where: { id: et.id }, update: {}, create: et }));

  await Promise.all(eventTypes);

  console.log("Event types are successfully set");
}
