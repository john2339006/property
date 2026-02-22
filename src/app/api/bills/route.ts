import { NextResponse } from 'next/server';
import { GenerateBillsForPeriodUseCase, GetBillsByPeriodUseCase } from '@/application/billing';
import { PrismaHouseRepository } from '@/infrastructure/repositories/PrismaHouseRepository';
import { PrismaBillingTypeRepository, PrismaDiscountRepository } from '@/infrastructure/repositories/PrismaBillingRepository';
import { PrismaBillRepository } from '@/infrastructure/repositories/PrismaBillRepository';
import { prisma } from '@/infrastructure/database/prisma';

const houseRepo = new PrismaHouseRepository();
// Realistically, the Billing config repositories should be sharing prisma but for the scope of this project we might just new them up if they create their own or pass `prisma`.
// The other repositories don't take prisma in constructor currently except Bill, let's assume they manage their own or we'll adjust.
const billingTypeRepo = new PrismaBillingTypeRepository(prisma);
const discountRepo = new PrismaDiscountRepository(prisma);
const billRepo = new PrismaBillRepository(prisma);

const generateBillsUseCase = new GenerateBillsForPeriodUseCase(houseRepo, billingTypeRepo, discountRepo, billRepo);
const getBillsUseCase = new GetBillsByPeriodUseCase(billRepo);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');
        const billingPeriod = searchParams.get('billingPeriod');

        if (!companyId || !billingPeriod) {
            return NextResponse.json({ error: 'companyId and billingPeriod are required' }, { status: 400 });
        }

        const bills = await getBillsUseCase.execute({ companyId, billingPeriod });
        return NextResponse.json(bills);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch bills' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { companyId, billingPeriod, createdBy } = body;

        if (!companyId || !billingPeriod || !createdBy) {
            return NextResponse.json({ error: 'companyId, billingPeriod, and createdBy are required' }, { status: 400 });
        }

        const result = await generateBillsUseCase.execute({ companyId, billingPeriod, createdBy });

        if (result.errors.length > 0 && result.billsGeneratedCount === 0) {
            return NextResponse.json({ error: 'Failed to generate any bills', details: result.errors }, { status: 400 });
        }

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to generate bills' }, { status: 500 });
    }
}
