import { PrismaClient } from "@prisma/client";

export async function seedEventTypes(prisma: PrismaClient) {
  let eventTypes = [
    { id: 1, name: "wedding" },
    { id: 2, name: "corporate" },
    { id: 3, name: "party" },
    { id: 6, name: "other" },
  ].map((et) => prisma.eventType.upsert({ where: { id: et.id }, update: {}, create: et }));

  await Promise.all(eventTypes);

  console.log("Event types are successfully set");
}
