import { describe, it, expect } from 'vitest';
import { CreateUserDTO, UpdateUserDTO } from '../UserDTOs';

describe('CreateUserDTO', () => {
    const valid = {
        username: 'testuser',
        email: 'user@example.com',
        password: 'password123',
        role: 'OPERATOR',
        companyId: '550e8400-e29b-41d4-a716-446655440000',
    };

    it('should validate correct input', () => {
        expect(CreateUserDTO.safeParse(valid).success).toBe(true);
    });

    it('should reject short username', () => {
        expect(CreateUserDTO.safeParse({ ...valid, username: 'ab' }).success).toBe(false);
    });

    it('should reject invalid email', () => {
        expect(CreateUserDTO.safeParse({ ...valid, email: 'not-email' }).success).toBe(false);
    });

    it('should reject short password', () => {
        expect(CreateUserDTO.safeParse({ ...valid, password: '123' }).success).toBe(false);
    });

    it('should reject invalid role', () => {
        expect(CreateUserDTO.safeParse({ ...valid, role: 'SUPER_ADMIN' }).success).toBe(false);
    });

    it('should reject non-UUID companyId', () => {
        expect(CreateUserDTO.safeParse({ ...valid, companyId: 'not-uuid' }).success).toBe(false);
    });
});

describe('UpdateUserDTO', () => {
    it('should accept partial updates', () => {
        expect(UpdateUserDTO.safeParse({ role: 'FINANCE' }).success).toBe(true);
        expect(UpdateUserDTO.safeParse({ email: 'new@test.com' }).success).toBe(true);
    });

    it('should accept empty object', () => {
        expect(UpdateUserDTO.safeParse({}).success).toBe(true);
    });

    it('should reject invalid role value', () => {
        expect(UpdateUserDTO.safeParse({ role: 'INVALID' }).success).toBe(false);
    });
});
