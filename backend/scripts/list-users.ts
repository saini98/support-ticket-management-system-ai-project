import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/infrastructure/prisma/generated/client.js";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true, role: true },
  orderBy: { email: "asc" },
});

console.log(JSON.stringify(users, null, 2));

await prisma.$disconnect();
