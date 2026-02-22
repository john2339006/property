import { describe, it, expect } from 'vitest';
import { hasPermission, hasAllPermissions, hasAnyPermission } from '../permissions';
import { UserRole } from '@/domain/user';

describe('RBAC Permissions', () => {
    describe('hasPermission', () => {
        it('should allow PLATFORM_ADMIN full access', () => {
            expect(hasPermission('PLATFORM_ADMIN', 'company:write')).toBe(true);
            expect(hasPermission('PLATFORM_ADMIN', 'billing:override')).toBe(true);
            expect(hasPermission('PLATFORM_ADMIN', 'user:manage')).toBe(true);
        });

        it('should allow COMPANY_ADMIN most capabilities', () => {
            expect(hasPermission('COMPANY_ADMIN', 'company:write')).toBe(true);
            expect(hasPermission('COMPANY_ADMIN', 'house:write')).toBe(true);
            expect(hasPermission('COMPANY_ADMIN', 'user:manage')).toBe(true);
        });

        it('should restrict FINANCE to billing operations', () => {
            expect(hasPermission('FINANCE', 'billing:configure')).toBe(true);
            expect(hasPermission('FINANCE', 'billing:override')).toBe(true);
            expect(hasPermission('FINANCE', 'owner:write')).toBe(false);
            expect(hasPermission('FINANCE', 'house:write')).toBe(false);
        });

        it('should restrict OPERATOR to house operations', () => {
            expect(hasPermission('OPERATOR', 'house:write')).toBe(true);
            expect(hasPermission('OPERATOR', 'house:read')).toBe(true);
            expect(hasPermission('OPERATOR', 'billing:configure')).toBe(false);
            expect(hasPermission('OPERATOR', 'user:manage')).toBe(false);
        });

        it('should restrict READ_ONLY to read operations', () => {
            expect(hasPermission('READ_ONLY', 'company:read')).toBe(true);
            expect(hasPermission('READ_ONLY', 'invoice:read')).toBe(true);
            expect(hasPermission('READ_ONLY', 'company:write')).toBe(false);
            expect(hasPermission('READ_ONLY', 'owner:write')).toBe(false);
            expect(hasPermission('READ_ONLY', 'user:manage')).toBe(false);
        });

        it('should return false for unknown permission', () => {
            expect(hasPermission('PLATFORM_ADMIN', 'nonexistent:action')).toBe(false);
        });
    });

    describe('hasAllPermissions', () => {
        it('should return true when role has all permissions', () => {
            expect(
                hasAllPermissions('COMPANY_ADMIN', ['company:read', 'company:write', 'user:manage'])
            ).toBe(true);
        });

        it('should return false when role lacks one permission', () => {
            expect(
                hasAllPermissions('OPERATOR', ['house:write', 'billing:configure'])
            ).toBe(false);
        });
    });

    describe('hasAnyPermission', () => {
        it('should return true when role has at least one permission', () => {
            expect(
                hasAnyPermission('OPERATOR', ['billing:configure', 'house:write'])
            ).toBe(true);
        });

        it('should return false when role has none of the permissions', () => {
            expect(
                hasAnyPermission('READ_ONLY', ['company:write', 'owner:write'])
            ).toBe(false);
        });
    });
});
