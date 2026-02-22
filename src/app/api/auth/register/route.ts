import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/database/prisma';
import { hashPassword } from '@/lib/password';
import { z } from 'zod';

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(1, 'Name is required'),
    companyId: z.string().optional(),
    role: z.enum(['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE', 'OPERATOR', 'READ_ONLY']).optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = RegisterSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const { email, password, name, companyId, role } = validation.data;

        // Check if email already exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
        }

        const hashedPassword = await hashPassword(password);

        // If no companyId provided, use the first company or create a default one (bootstrap).
        let resolvedCompanyId = companyId;
        if (!resolvedCompanyId) {
            const firstCompany = await prisma.managementCompany.findFirst();
            if (firstCompany) {
                resolvedCompanyId = firstCompany.id;
            } else {
                // First-time bootstrap: create a default company
                const defaultCompany = await prisma.managementCompany.create({
                    data: {
                        id: crypto.randomUUID(),
                        legal_name: '默认公司 Default Company',
                        registration_license_id: 'PENDING',
                        contact_information: '',
                        billing_information: '',
                        default_billing_period: 'MONTHLY',
                        currency: 'CNY',
                    },
                });
                resolvedCompanyId = defaultCompany.id;
            }
        }

        const user = await prisma.user.create({
            data: {
                id: crypto.randomUUID(),
                username: email,
                password: hashedPassword,
                email,
                name,
                role: role ?? 'READ_ONLY',
                status: 'ACTIVE',
                company_id: resolvedCompanyId,
            },
        });

        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: user.company_id,
        }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Registration failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
