import { UserRole } from '@/domain/user';

/**
 * Role-based permission configuration.
 * Maps each capability to the roles allowed to perform it.
 */
export const PERMISSIONS: Record<string, UserRole[]> = {
    'company:read': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE', 'OPERATOR', 'READ_ONLY'],
    'company:write': ['PLATFORM_ADMIN', 'COMPANY_ADMIN'],
    'owner:read': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE', 'OPERATOR', 'READ_ONLY'],
    'owner:write': ['PLATFORM_ADMIN', 'COMPANY_ADMIN'],
    'house:read': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE', 'OPERATOR', 'READ_ONLY'],
    'house:write': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'OPERATOR'],
    'billing:configure': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE'],
    'billing:override': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE'],
    'invoice:read': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE', 'OPERATOR', 'READ_ONLY'],
    'invoice:write': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE'],
    'user:manage': ['PLATFORM_ADMIN', 'COMPANY_ADMIN'],
    'audit:read': ['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE', 'OPERATOR', 'READ_ONLY'],
};

/**
 * Check if a role has a specific permission.
 */
export function hasPermission(role: UserRole, permission: string): boolean {
    const allowedRoles = PERMISSIONS[permission];
    if (!allowedRoles) return false;
    return allowedRoles.includes(role);
}

/**
 * Check if a role has ALL of the specified permissions.
 */
export function hasAllPermissions(role: UserRole, permissions: string[]): boolean {
    return permissions.every((p) => hasPermission(role, p));
}

/**
 * Check if a role has ANY of the specified permissions.
 */
export function hasAnyPermission(role: UserRole, permissions: string[]): boolean {
    return permissions.some((p) => hasPermission(role, p));
}
