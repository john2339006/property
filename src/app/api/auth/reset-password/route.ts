import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/database/prisma';
import { hashPassword } from '@/lib/password';
import { z } from 'zod';

const ResetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = ResetPasswordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const { token, password } = validation.data;

        const user = await prisma.user.findUnique({
            where: { password_reset_token: token },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
        }

        if (user.password_reset_expires_at && user.password_reset_expires_at < new Date()) {
            return NextResponse.json({ error: 'Password reset token has expired. Please request a new one.' }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                password_reset_token: null,
                password_reset_expires_at: null,
            },
        });

        return NextResponse.json({ success: true, email: user.email });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to reset password';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
