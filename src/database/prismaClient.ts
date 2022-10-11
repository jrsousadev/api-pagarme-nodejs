import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ["error", "warn", "query"],
});

export { prismaClient };