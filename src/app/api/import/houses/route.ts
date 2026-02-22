import { NextResponse } from 'next/server';
import { ProcessHouseImportUseCase } from '@/application/import-export';
import { PrismaHouseRepository } from '@/infrastructure/repositories/PrismaHouseRepository';

const houseRepo = new PrismaHouseRepository();
const processHouseImport = new ProcessHouseImportUseCase(houseRepo);

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        let companyId = formData.get('companyId') as string;
        if (!companyId) companyId = 'comp1';

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const csvData = await file.text();
        const result = await processHouseImport.execute(companyId, csvData);

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Import failed' }, { status: 500 });
    }
}
