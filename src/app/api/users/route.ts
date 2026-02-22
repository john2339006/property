import { NextResponse } from 'next/server';
import { UserService } from '@/application/user/UserService';
import { CreateUserDTO } from '@/application/user/UserDTOs';
import { PrismaUserRepository } from '@/infrastructure/repositories/PrismaUserRepository';

const userService = new UserService(new PrismaUserRepository());

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');
        if (!companyId) {
            return NextResponse.json({ error: 'companyId query parameter is required' }, { status: 400 });
        }
        const users = await userService.getUsersByCompany(companyId);
        return NextResponse.json(
            users.map((u) => ({
                id: u.id,
                username: u.username,
                email: u.email,
                role: u.role,
                companyId: u.companyId,
            }))
        );
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = CreateUserDTO.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }
        const user = await userService.createUser(validation.data);
        return NextResponse.json(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                companyId: user.companyId,
            },
            { status: 201 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create user';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
