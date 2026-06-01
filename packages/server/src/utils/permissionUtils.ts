export type Role = 'admin' | 'manager' | 'user' | 'viewer';

export type Permission =
  | 'portfolio:read'
  | 'portfolio:write'
  | 'portfolio:delete'
  | 'watchlist:read'
  | 'watchlist:write'
  | 'watchlist:delete'
  | 'settings:read'
  | 'settings:write'
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'apikeys:manage'
  | 'admin:access';

export const PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'portfolio:read', 'portfolio:write', 'portfolio:delete',
    'watchlist:read', 'watchlist:write', 'watchlist:delete',
    'settings:read', 'settings:write',
    'users:read', 'users:write', 'users:delete',
    'apikeys:manage',
    'admin:access',
  ],
  manager: [
    'portfolio:read', 'portfolio:write', 'portfolio:delete',
    'watchlist:read', 'watchlist:write', 'watchlist:delete',
    'settings:read', 'settings:write',
    'users:read',
    'apikeys:manage',
  ],
  user: [
    'portfolio:read', 'portfolio:write',
    'watchlist:read', 'watchlist:write',
    'settings:read', 'settings:write',
    'apikeys:manage',
  ],
  viewer: [
    'portfolio:read',
    'watchlist:read',
    'settings:read',
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  const rolePermissions = PERMISSIONS[role];
  if (!rolePermissions) return false;
  return rolePermissions.includes(permission);
}

export function requireRole(userRole: Role, requiredRole: Role): boolean {
  const hierarchy: Role[] = ['viewer', 'user', 'manager', 'admin'];
  const userLevel = hierarchy.indexOf(userRole);
  const requiredLevel = hierarchy.indexOf(requiredRole);
  return userLevel >= requiredLevel;
}
