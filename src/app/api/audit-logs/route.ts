import { NextResponse } from 'next/server';
import { GetRecentLogsUseCase } from '@/application/audit';
import { PrismaAuditLogRepository } from '@/infrastructure/repositories/PrismaAuditLogRepository';
import { prisma } from '@/infrastructure/database/prisma';
const auditRepo = new PrismaAuditLogRepository(prisma);
const getRecentLogsUseCase = new GetRecentLogsUseCase(auditRepo);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get('limit');
        const limit = limitParam ? parseInt(limitParam, 10) : 50;

        const logs = await getRecentLogsUseCase.execute(limit);
        return NextResponse.json(logs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch audit logs' }, { status: 500 });
    }
}
