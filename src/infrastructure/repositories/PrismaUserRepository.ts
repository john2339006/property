import { prisma } from '@/infrastructure/database/prisma';
import { User, UserRole, IUserRepository } from '@/domain/user';

export class PrismaUserRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        const data = await prisma.user.findUnique({ where: { id } });
        if (!data) return null;
        return User.reconstitute(data.id, {
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role as UserRole,
            companyId: data.company_id,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const data = await prisma.user.findUnique({ where: { email } });
        if (!data) return null;
        return User.reconstitute(data.id, {
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role as UserRole,
            companyId: data.company_id,
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        const data = await prisma.user.findUnique({ where: { username } });
        if (!data) return null;
        return User.reconstitute(data.id, {
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role as UserRole,
            companyId: data.company_id,
        });
    }

    async findByCompanyId(companyId: string): Promise<User[]> {
        const records = await prisma.user.findMany({ where: { company_id: companyId } });
        return records.map((data) =>
            User.reconstitute(data.id, {
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role as UserRole,
                companyId: data.company_id,
            })
        );
    }

    async save(user: User): Promise<void> {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
                company_id: user.companyId,
            },
            create: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
                company_id: user.companyId,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }
}
