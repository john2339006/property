import { NextResponse } from 'next/server';
import { UserService } from '@/application/user/UserService';
import { UpdateUserDTO } from '@/application/user/UserDTOs';
import { PrismaUserRepository } from '@/infrastructure/repositories/PrismaUserRepository';

const userService = new UserService(new PrismaUserRepository());

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const user = await userService.getUser(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            companyId: user.companyId,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const validation = UpdateUserDTO.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }
        const user = await userService.updateUser(id, validation.data);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            companyId: user.companyId,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await userService.deleteUser(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
