import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/database/prisma';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = ForgotPasswordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const { email } = validation.data;

        const user = await prisma.user.findUnique({ where: { email } });

        // Always return success to prevent email enumeration
        if (!user || user.status === 'SUSPENDED') {
            return NextResponse.json({ success: true, message: 'If an account exists, a reset link will be sent.' });
        }

        const resetToken = uuidv4();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password_reset_token: resetToken,
                password_reset_expires_at: expiresAt,
            },
        });

        // In production: send email with reset link
        // For development: log to console
        const resetLink = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/login?token=${resetToken}&mode=reset`;
        console.log(`[DEV] Password reset link for ${email}:\n${resetLink}`);

        return NextResponse.json({
            success: true,
            message: 'If an account exists, a reset link will be sent.',
            // Expose in dev only:
            ...(process.env.NODE_ENV === 'development' && { devResetLink: resetLink }),
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to process request';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
