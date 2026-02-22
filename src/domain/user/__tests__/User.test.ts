import { describe, it, expect } from 'vitest';
import { User, UserRole } from '../User';

function makeUser(overrides: Partial<Record<string, unknown>> = {}) {
    return User.create('user-1', {
        username: 'admin',
        email: 'admin@example.com',
        password: 'hashed-password',
        role: 'COMPANY_ADMIN' as UserRole,
        companyId: 'company-1',
        ...overrides,
    });
}

describe('User', () => {
    it('should create a user with correct properties', () => {
        const user = makeUser();
        expect(user.id).toBe('user-1');
        expect(user.username).toBe('admin');
        expect(user.email).toBe('admin@example.com');
        expect(user.role).toBe('COMPANY_ADMIN');
        expect(user.companyId).toBe('company-1');
    });

    it('should update role', () => {
        const user = makeUser();
        user.updateRole('FINANCE');
        expect(user.role).toBe('FINANCE');
    });

    it('should update email', () => {
        const user = makeUser();
        user.updateEmail('new@example.com');
        expect(user.email).toBe('new@example.com');
    });

    it('should support identity equality', () => {
        const u1 = makeUser();
        const u2 = User.create('user-1', {
            username: 'different',
            email: 'diff@example.com',
            password: 'xxx',
            role: 'READ_ONLY',
            companyId: 'company-2',
        });
        expect(u1.equals(u2)).toBe(true); // same ID = same entity
    });

    it('should not be equal to user with different ID', () => {
        const u1 = makeUser();
        const u2 = User.create('user-2', {
            username: 'admin',
            email: 'admin@example.com',
            password: 'hashed-password',
            role: 'COMPANY_ADMIN',
            companyId: 'company-1',
        });
        expect(u1.equals(u2)).toBe(false);
    });

    it('should reconstitute from persistence data', () => {
        const user = User.reconstitute('existing-id', {
            username: 'operator',
            email: 'op@test.com',
            password: 'hash',
            role: 'OPERATOR',
            companyId: 'c-1',
        });
        expect(user.id).toBe('existing-id');
        expect(user.role).toBe('OPERATOR');
    });
});
