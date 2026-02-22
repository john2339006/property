import { User, UserRole, IUserRepository } from '@/domain/user';
import { CreateUserInput, UpdateUserInput } from './UserDTOs';

export class UserService {
    constructor(private readonly userRepo: IUserRepository) { }

    async createUser(input: CreateUserInput): Promise<User> {
        // Check for uniqueness
        const existingByEmail = await this.userRepo.findByEmail(input.email);
        if (existingByEmail) {
            throw new Error('A user with this email already exists');
        }
        const existingByUsername = await this.userRepo.findByUsername(input.username);
        if (existingByUsername) {
            throw new Error('A user with this username already exists');
        }

        const user = User.create(crypto.randomUUID(), {
            username: input.username,
            email: input.email,
            password: input.password, // In production, this should be hashed beforehand
            role: input.role as UserRole,
            companyId: input.companyId,
        });
        await this.userRepo.save(user);
        return user;
    }

    async getUser(id: string): Promise<User | null> {
        return this.userRepo.findById(id);
    }

    async getUsersByCompany(companyId: string): Promise<User[]> {
        return this.userRepo.findByCompanyId(companyId);
    }

    async updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
        const user = await this.userRepo.findById(id);
        if (!user) return null;
        if (input.email) user.updateEmail(input.email);
        if (input.role) user.updateRole(input.role as UserRole);
        await this.userRepo.save(user);
        return user;
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
}
