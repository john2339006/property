import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/database/prisma';
import { hashPassword } from '@/lib/password';
import { z } from 'zod';

const SetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = SetPasswordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const { token, password } = validation.data;

        const user = await prisma.user.findUnique({
            where: { invitation_token: token },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired invitation token' }, { status: 400 });
        }

        if (user.invitation_expires_at && user.invitation_expires_at < new Date()) {
            return NextResponse.json({ error: 'Invitation token has expired' }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                status: 'ACTIVE',
                invitation_token: null,
                invitation_expires_at: null,
            },
        });

        return NextResponse.json({ success: true, email: user.email });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to set password';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
