import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { UserRole } from "../../src/infrastructure/prisma/generated/enums.js";
import { prisma } from "../../src/infrastructure/database/prisma.js";
import { hashPassword } from "../../src/utils/password.js";

const testUsers = [
  {
    name: "Test Admin",
    email: "test-admin@example.com",
    password: "password123",
    role: UserRole.ADMIN,
  },
  {
    name: "Test Support",
    email: "test-support@example.com",
    password: "password123",
    role: UserRole.SUPPORT,
  },
  {
    name: "Test Developer",
    email: "test-developer@example.com",
    password: "password123",
    role: UserRole.DEVELOPER,
  },
  {
    name: "Test QA",
    email: "test-qa@example.com",
    password: "password123",
    role: UserRole.QA,
  },
  {
    name: "Test Manager",
    email: "test-manager@example.com",
    password: "password123",
    role: UserRole.MANAGER,
  },
] as const;

const removeTestDatabaseFiles = (): void => {
  const testDbPath = path.resolve(process.cwd(), "test.db");

  for (const filePath of [testDbPath, `${testDbPath}-journal`]) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export const initializeTestDatabase = async (): Promise<void> => {
  removeTestDatabaseFiles();

  execSync("npx prisma db push", {
    cwd: process.cwd(),
    env: process.env,
    stdio: "pipe",
  });

  for (const user of testUsers) {
    await prisma.user.create({
      data: {
        ...user,
        password: await hashPassword(user.password),
      },
    });
  }
};

export const getTestUserIds = async (): Promise<{
  creatorId: string;
  assigneeId: string;
}> => {
  const users = await prisma.user.findMany({
    where: {
      email: {
        in: testUsers.map((user) => user.email),
      },
    },
    orderBy: { email: "asc" },
  });

  const creator = users.find((user) => user.email === testUsers[0].email);
  const assignee = users.find((user) => user.email === testUsers[1].email);

  if (!creator || !assignee) {
    throw new Error("Test users were not seeded");
  }

  return {
    creatorId: creator.id,
    assigneeId: assignee.id,
  };
};

export const disconnectTestDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
};

export const TEST_USER_CREDENTIALS = {
  email: testUsers[0].email,
  password: testUsers[0].password,
} as const;

export const TEST_ROLE_CREDENTIALS = {
  admin: {
    email: testUsers[0].email,
    password: testUsers[0].password,
  },
  support: {
    email: testUsers[1].email,
    password: testUsers[1].password,
  },
  developer: {
    email: testUsers[2].email,
    password: testUsers[2].password,
  },
  qa: {
    email: testUsers[3].email,
    password: testUsers[3].password,
  },
  manager: {
    email: testUsers[4].email,
    password: testUsers[4].password,
  },
} as const;

export const getTestUserIdByEmail = async (email: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    throw new Error(`Test user not found: ${email}`);
  }

  return user.id;
};
