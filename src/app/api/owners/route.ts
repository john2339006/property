import { NextResponse } from 'next/server';
import { OwnerService } from '@/application/owner/OwnerService';
import { CreateOwnerDTO } from '@/application/owner/OwnerDTOs';
import { PrismaOwnerRepository } from '@/infrastructure/repositories/PrismaOwnerRepository';

const ownerService = new OwnerService(new PrismaOwnerRepository());

function serializeOwner(o: { id: string; companyId: string; entityType: string; currentVersion?: { fullLegalName: string; phone: string; email: string } | undefined; versions: Array<{ id: string; fullLegalName: string; effectiveFrom: Date; effectiveTo: Date | null; isLatest: boolean }> }) {
    return {
        id: o.id,
        companyId: o.companyId,
        entityType: o.entityType,
        currentVersion: o.currentVersion ? {
            fullLegalName: o.currentVersion.fullLegalName,
            phone: o.currentVersion.phone,
            email: o.currentVersion.email,
        } : null,
        versionCount: o.versions.length,
    };
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');
        if (!companyId) {
            return NextResponse.json({ error: 'companyId query parameter is required' }, { status: 400 });
        }
        const owners = await ownerService.getOwnersByCompany(companyId);
        return NextResponse.json(owners.map(serializeOwner));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch owners' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = CreateOwnerDTO.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }
        const owner = await ownerService.createOwner(validation.data);
        return NextResponse.json(serializeOwner(owner), { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create owner' }, { status: 500 });
    }
}
