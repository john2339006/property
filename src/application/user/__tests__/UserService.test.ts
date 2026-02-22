import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../UserService';
import { User, IUserRepository, UserRole } from '@/domain/user';

function createMockRepo(): IUserRepository {
    const store = new Map<string, User>();
    return {
        findById: vi.fn(async (id: string) => store.get(id) ?? null),
        findByEmail: vi.fn(async (email: string) => {
            for (const user of store.values()) {
                if (user.email === email) return user;
            }
            return null;
        }),
        findByUsername: vi.fn(async (username: string) => {
            for (const user of store.values()) {
                if (user.username === username) return user;
            }
            return null;
        }),
        findByCompanyId: vi.fn(async (companyId: string) => {
            return Array.from(store.values()).filter((u) => u.companyId === companyId);
        }),
        save: vi.fn(async (user: User) => {
            store.set(user.id, user);
        }),
        delete: vi.fn(async (id: string) => {
            store.delete(id);
        }),
    };
}

const validInput = {
    username: 'testadmin',
    email: 'admin@test.com',
    password: 'securePass123',
    role: 'COMPANY_ADMIN' as const,
    companyId: '550e8400-e29b-41d4-a716-446655440000',
};

describe('UserService', () => {
    let service: UserService;
    let repo: IUserRepository;

    beforeEach(() => {
        repo = createMockRepo();
        service = new UserService(repo);
    });

    it('should create a user', async () => {
        const user = await service.createUser(validInput);
        expect(user.username).toBe('testadmin');
        expect(user.email).toBe('admin@test.com');
        expect(repo.save).toHaveBeenCalledOnce();
    });

    it('should reject duplicate email', async () => {
        await service.createUser(validInput);
        await expect(
            service.createUser({ ...validInput, username: 'different' })
        ).rejects.toThrow('email already exists');
    });

    it('should reject duplicate username', async () => {
        await service.createUser(validInput);
        await expect(
            service.createUser({ ...validInput, email: 'other@test.com' })
        ).rejects.toThrow('username already exists');
    });

    it('should get a user by id', async () => {
        const created = await service.createUser(validInput);
        const found = await service.getUser(created.id);
        expect(found).not.toBeNull();
        expect(found!.id).toBe(created.id);
    });

    it('should return null for unknown id', async () => {
        const found = await service.getUser('no-such-id');
        expect(found).toBeNull();
    });

    it('should list users by company', async () => {
        await service.createUser(validInput);
        await service.createUser({ ...validInput, username: 'user2', email: 'u2@test.com' });
        const users = await service.getUsersByCompany(validInput.companyId);
        expect(users).toHaveLength(2);
    });

    it('should update user role', async () => {
        const user = await service.createUser(validInput);
        const updated = await service.updateUser(user.id, { role: 'FINANCE' });
        expect(updated!.role).toBe('FINANCE');
    });

    it('should update user email', async () => {
        const user = await service.createUser(validInput);
        const updated = await service.updateUser(user.id, { email: 'new@test.com' });
        expect(updated!.email).toBe('new@test.com');
    });

    it('should return null when updating non-existent user', async () => {
        const result = await service.updateUser('no-id', { role: 'READ_ONLY' });
        expect(result).toBeNull();
    });

    it('should delete a user', async () => {
        const user = await service.createUser(validInput);
        await service.deleteUser(user.id);
        expect(repo.delete).toHaveBeenCalledWith(user.id);
    });
});
