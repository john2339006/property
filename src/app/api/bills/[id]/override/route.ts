import { NextResponse } from 'next/server';
import { OverrideBillUseCase } from '@/application/billing';
import { PrismaBillRepository } from '@/infrastructure/repositories/PrismaBillRepository';
import { prisma } from '@/infrastructure/database/prisma';
const billRepo = new PrismaBillRepository(prisma);
const overrideBillUseCase = new OverrideBillUseCase(billRepo);

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: billId } = await context.params;
        const body = await request.json();
        const { newAmount, reason, createdBy } = body;

        if (newAmount === undefined || !reason || !createdBy) {
            return NextResponse.json({ error: 'newAmount, reason, and createdBy are required' }, { status: 400 });
        }

        const result = await overrideBillUseCase.execute({ billId, newAmount, reason, createdBy });

        if (!result.isSuccess) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({ finalAmount: result.finalAmount }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to override bill' }, { status: 500 });
    }
}
