import { PrismaClient } from "@prisma/client";

if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient({
    log: ["info"],
  });
}
prisma = globalThis.prisma;

export default prisma;
