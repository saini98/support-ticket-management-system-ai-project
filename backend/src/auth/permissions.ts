import { UserRole } from "../infrastructure/prisma/generated/enums.js";

export const Permission = {
  TICKETS_READ: "tickets:read",
  TICKETS_CREATE: "tickets:create",
  TICKETS_UPDATE: "tickets:update",
  TICKETS_UPDATE_ASSIGNED: "tickets:update:assigned",
  TICKETS_DELETE: "tickets:delete",
  COMMENTS_READ: "comments:read",
  COMMENTS_CREATE: "comments:create",
  COMMENTS_CREATE_ASSIGNED: "comments:create:assigned",
  DASHBOARD_READ: "dashboard:read",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

const ALL_PERMISSIONS = Object.values(Permission);

const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  [UserRole.ADMIN]: ALL_PERMISSIONS,
  [UserRole.SUPPORT]: [
    Permission.TICKETS_READ,
    Permission.TICKETS_CREATE,
    Permission.TICKETS_UPDATE,
    Permission.COMMENTS_READ,
    Permission.COMMENTS_CREATE,
    Permission.DASHBOARD_READ,
  ],
  [UserRole.DEVELOPER]: [
    Permission.TICKETS_READ,
    Permission.TICKETS_UPDATE_ASSIGNED,
    Permission.COMMENTS_READ,
    Permission.COMMENTS_CREATE_ASSIGNED,
    Permission.DASHBOARD_READ,
  ],
  [UserRole.QA]: [
    Permission.TICKETS_READ,
    Permission.COMMENTS_READ,
    Permission.DASHBOARD_READ,
  ],
  [UserRole.MANAGER]: [
    Permission.DASHBOARD_READ,
    Permission.TICKETS_READ,
    Permission.COMMENTS_READ,
  ],
};

export const roleHasPermission = (
  role: UserRole,
  permission: Permission,
): boolean => {
  if (role === UserRole.ADMIN) {
    return true;
  }

  return ROLE_PERMISSIONS[role].includes(permission);
};

export const roleHasAnyPermission = (
  role: UserRole,
  permissions: readonly Permission[],
): boolean => permissions.some((permission) => roleHasPermission(role, permission));
