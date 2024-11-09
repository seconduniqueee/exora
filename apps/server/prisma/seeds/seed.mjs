import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
  await seedEventTypes();
  await seedServiceTypes();
}

async function seedRoles() {
  let roles = [
    { id: 1, name: "User" },
    { id: 2, name: "Member" },
  ].map((r) => prisma.role.upsert({ where: { id: r.id }, update: {}, create: r }));

  await Promise.all(roles);

  console.log("Roles are successfully set");
}

async function seedServiceTypes() {
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

async function seedEventTypes() {
  let eventTypes = [
    { id: 1, name: "wedding" },
    { id: 2, name: "corporate" },
    { id: 3, name: "party" },
    { id: 6, name: "other" },
  ].map((et) => prisma.eventType.upsert({ where: { id: et.id }, update: {}, create: et }));

  await Promise.all(eventTypes);

  console.log("Event types are successfully set");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
