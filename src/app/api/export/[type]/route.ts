import { NextResponse } from 'next/server';
import { GenerateExportUseCase } from '@/application/import-export';
import { prisma } from '@/infrastructure/database/prisma';
const generateExportUC = new GenerateExportUseCase(prisma);

export async function GET(request: Request, context: any) {
    try {
        const { params } = context;
        const type = await Promise.resolve(params.type);

        const { searchParams } = new URL(request.url);
        let companyId = searchParams.get('companyId');
        if (!companyId) companyId = 'comp1';

        const csvContent = await generateExportUC.execute(companyId, type);

        const response = new NextResponse(csvContent);
        response.headers.set('Content-Type', 'text/csv');
        response.headers.set('Content-Disposition', `attachment; filename="${type}-export.csv"`);
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Export failed' }, { status: 500 });
    }
}
