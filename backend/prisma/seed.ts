import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import {
  PrismaClient,
  TicketPriority,
  TicketStatus,
  UserRole,
} from "../src/infrastructure/prisma/generated/client";
import { hashPassword } from "../src/utils/password.js";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const users = [
  {
    id: "user-alice-admin",
    name: "Alice Admin",
    email: "admin@example.com",
    password: "password123",
    role: UserRole.ADMIN,
  },
  {
    id: "user-bob-developer",
    name: "Bob Developer",
    email: "developer@example.com",
    password: "password123",
    role: UserRole.DEVELOPER,
  },
  {
    id: "user-carol-support",
    name: "Carol Support",
    email: "support@example.com",
    password: "password123",
    role: UserRole.SUPPORT,
  },
  {
    id: "user-david-manager",
    name: "David Manager",
    email: "manager@example.com",
    password: "password123",
    role: UserRole.MANAGER,
  },
  {
    id: "user-eve-qa",
    name: "Eve QA",
    email: "qa@example.com",
    password: "password123",
    role: UserRole.QA,
  },
];

const tickets = [
  {
    id: "ticket-1001",
    title: "Login page not loading",
    description: "Users report a blank screen after submitting credentials on the login page.",
    status: TicketStatus.OPEN,
    priority: TicketPriority.URGENT,
    creatorId: "user-alice-admin",
    assigneeId: "user-carol-support",
    createdAt: new Date("2026-07-14T09:15:00.000Z"),
    updatedAt: new Date("2026-07-14T09:15:00.000Z"),
  },
  {
    id: "ticket-1002",
    title: "Export report fails with timeout",
    description: "Monthly export times out for accounts with more than 10,000 records.",
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.HIGH,
    creatorId: "user-david-manager",
    assigneeId: "user-bob-developer",
    createdAt: new Date("2026-07-14T08:40:00.000Z"),
    updatedAt: new Date("2026-07-14T10:05:00.000Z"),
  },
  {
    id: "ticket-1003",
    title: "Update billing address form validation",
    description: "ZIP code validation rejects valid international postal codes.",
    status: TicketStatus.RESOLVED,
    priority: TicketPriority.MEDIUM,
    creatorId: "user-carol-support",
    assigneeId: "user-eve-qa",
    createdAt: new Date("2026-07-13T16:20:00.000Z"),
    updatedAt: new Date("2026-07-14T07:30:00.000Z"),
  },
  {
    id: "ticket-1004",
    title: "Dark mode contrast on dashboard widgets",
    description: "Chart labels are hard to read when dark mode is enabled.",
    status: TicketStatus.CLOSED,
    priority: TicketPriority.LOW,
    creatorId: "user-eve-qa",
    assigneeId: "user-alice-admin",
    createdAt: new Date("2026-07-13T11:05:00.000Z"),
    updatedAt: new Date("2026-07-13T18:45:00.000Z"),
  },
  {
    id: "ticket-1005",
    title: "Duplicate notifications on mobile app",
    description: "Push notifications are delivered twice for ticket status updates.",
    status: TicketStatus.CANCELLED,
    priority: TicketPriority.HIGH,
    creatorId: "user-bob-developer",
    assigneeId: "user-david-manager",
    createdAt: new Date("2026-07-12T14:30:00.000Z"),
    updatedAt: new Date("2026-07-12T16:00:00.000Z"),
  },
];

async function main() {
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        password: await hashPassword(user.password),
      },
    });
  }

  for (const ticket of tickets) {
    await prisma.ticket.create({ data: ticket });
  }

  console.log(`Seeded ${users.length} users and ${tickets.length} tickets with readable IDs`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
