import type { UserRole, UserSummary } from "../types/ticket.types";

const USER_ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Admin",
  DEVELOPER: "Developer",
  SUPPORT: "Support",
  MANAGER: "Manager",
  QA: "QA",
};

export const formatUserRole = (role: UserRole): string => USER_ROLE_LABELS[role];

export const SEED_USERS: UserSummary[] = [
  {
    id: "user-alice-admin",
    name: "Alice Admin",
    email: "admin@example.com",
    role: "ADMIN",
  },
  {
    id: "user-bob-developer",
    name: "Bob Developer",
    email: "developer@example.com",
    role: "DEVELOPER",
  },
  {
    id: "user-carol-support",
    name: "Carol Support",
    email: "support@example.com",
    role: "SUPPORT",
  },
  {
    id: "user-david-manager",
    name: "David Manager",
    email: "manager@example.com",
    role: "MANAGER",
  },
  {
    id: "user-eve-qa",
    name: "Eve QA",
    email: "qa@example.com",
    role: "QA",
  },
];

export const formatUserLabel = (user: UserSummary): string =>
  `${user.name} — ${user.email} (${user.role})`;

export const formatUserWithId = (user: UserSummary): string =>
  `${formatUserLabel(user)} | ID: ${user.id}`;

export const mergeUsers = (...userGroups: UserSummary[][]): UserSummary[] => {
  const userMap = new Map<string, UserSummary>();

  userGroups.forEach((group) => {
    group.forEach((user) => {
      userMap.set(user.id, user);
    });
  });

  return Array.from(userMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
};
