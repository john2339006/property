import { NextResponse } from 'next/server';
import { GetDashboardMetricsUseCase } from '@/application/reporting';
import { prisma } from '@/infrastructure/database/prisma';
const getMetricsUseCase = new GetDashboardMetricsUseCase(prisma);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // In a real app with auth, companyId comes from the session/token.
        let companyId = searchParams.get('companyId');

        if (!companyId) { // Fallback for MVP testing
            companyId = 'comp1';
        }

        const metrics = await getMetricsUseCase.execute(companyId);
        return NextResponse.json(metrics);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch dashboard metrics' }, { status: 500 });
    }
}
