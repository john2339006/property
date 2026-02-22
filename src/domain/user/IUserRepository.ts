import { User } from './User';

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByCompanyId(companyId: string): Promise<User[]>;
    save(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
