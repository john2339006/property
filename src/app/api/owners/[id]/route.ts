import { NextResponse } from 'next/server';
import { OwnerService } from '@/application/owner/OwnerService';
import { UpdateOwnerDTO } from '@/application/owner/OwnerDTOs';
import { PrismaOwnerRepository } from '@/infrastructure/repositories/PrismaOwnerRepository';

const ownerService = new OwnerService(new PrismaOwnerRepository());

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const owner = await ownerService.getOwner(id);
        if (!owner) {
            return NextResponse.json({ error: 'Owner not found' }, { status: 404 });
        }
        return NextResponse.json({
            id: owner.id,
            companyId: owner.companyId,
            entityType: owner.entityType,
            versions: owner.versions.map((v) => ({
                id: v.id,
                fullLegalName: v.fullLegalName,
                idNumber: v.idNumber,
                taxId: v.taxId,
                invoicingName: v.invoicingName,
                phone: v.phone,
                email: v.email,
                mailingAddress: v.mailingAddress,
                preferredContactMethod: v.preferredContactMethod,
                effectiveFrom: v.effectiveFrom,
                effectiveTo: v.effectiveTo,
                isLatest: v.isLatest,
            })),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch owner' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const validation = UpdateOwnerDTO.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }
        const owner = await ownerService.updateOwner(id, validation.data);
        if (!owner) {
            return NextResponse.json({ error: 'Owner not found' }, { status: 404 });
        }
        const cv = owner.currentVersion!;
        return NextResponse.json({
            id: owner.id,
            currentVersion: {
                id: cv.id,
                fullLegalName: cv.fullLegalName,
                effectiveFrom: cv.effectiveFrom,
                isLatest: cv.isLatest,
            },
            totalVersions: owner.versions.length,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update owner' }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await ownerService.deleteOwner(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete owner' }, { status: 500 });
    }
}
