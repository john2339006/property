import { NextResponse } from 'next/server';
import { GenerateInvoiceUseCase, GetInvoicesUseCase } from '@/application/invoicing';
import { PrismaInvoiceRepository } from '@/infrastructure/repositories/PrismaInvoiceRepository';
import { PrismaBillRepository } from '@/infrastructure/repositories/PrismaBillRepository';
import { PrismaHouseRepository } from '@/infrastructure/repositories/PrismaHouseRepository';
import { PrismaOwnerRepository } from '@/infrastructure/repositories/PrismaOwnerRepository';
import { prisma } from '@/infrastructure/database/prisma';

const invoiceRepo = new PrismaInvoiceRepository(prisma);
const billRepo = new PrismaBillRepository(prisma);
const houseRepo = new PrismaHouseRepository();
const ownerRepo = new PrismaOwnerRepository();

const getInvoicesUseCase = new GetInvoicesUseCase(invoiceRepo);
const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepo, billRepo, houseRepo, ownerRepo);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');
        const billingPeriod = searchParams.get('billingPeriod');

        if (!companyId || !billingPeriod) {
            return NextResponse.json({ error: 'companyId and billingPeriod are required' }, { status: 400 });
        }

        const invoices = await getInvoicesUseCase.execute(companyId, billingPeriod);
        return NextResponse.json(invoices);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch invoices' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { billId } = body;

        if (!billId) {
            return NextResponse.json({ error: 'billId is required' }, { status: 400 });
        }

        const result = await generateInvoiceUseCase.execute({ billId });

        if (!result.isSuccess) {
            return NextResponse.json({ error: result.getError() }, { status: 400 });
        }

        return NextResponse.json(result.getValue(), { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to generated invoice' }, { status: 500 });
    }
}
