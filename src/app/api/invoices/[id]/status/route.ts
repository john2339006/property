import { NextResponse } from 'next/server';
import { ChangeInvoiceStatusUseCase } from '@/application/invoicing';
import { PrismaInvoiceRepository } from '@/infrastructure/repositories/PrismaInvoiceRepository';
import { prisma } from '@/infrastructure/database/prisma';
const invoiceRepo = new PrismaInvoiceRepository(prisma);
const changeStatusUseCase = new ChangeInvoiceStatusUseCase(invoiceRepo);

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: invoiceId } = await context.params;
        const body = await request.json();
        const { status } = body;

        if (!status || !['ISSUED', 'PAID', 'VOIDED'].includes(status)) {
            return NextResponse.json({ error: 'Valid status (ISSUED, PAID, VOIDED) is required' }, { status: 400 });
        }

        const result = await changeStatusUseCase.execute({ invoiceId, newStatus: status });

        if (!result.isSuccess) {
            return NextResponse.json({ error: result.getError() }, { status: 400 });
        }

        return NextResponse.json(result.getValue(), { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update invoice status' }, { status: 500 });
    }
}
