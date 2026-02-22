import { NextResponse } from 'next/server';
import { HouseService } from '@/application/house/HouseService';
import { UpdateHouseSpecsDTO, AssignOwnerDTO } from '@/application/house/HouseDTOs';
import { PrismaHouseRepository } from '@/infrastructure/repositories/PrismaHouseRepository';
import { HouseStatus } from '@/domain/house';

const houseService = new HouseService(new PrismaHouseRepository());

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const house = await houseService.getHouse(id);
        if (!house) return NextResponse.json({ error: 'House not found' }, { status: 404 });
        return NextResponse.json({
            id: house.id, companyId: house.companyId, status: house.status,
            managementStartDate: house.managementStartDate, managementEndDate: house.managementEndDate,
            versions: house.versions.map((v) => ({
                id: v.id, buildingNo: v.buildingNo, unitNo: v.unitNo, levelNo: v.levelNo,
                doorNo: v.doorNo, areaSqm: v.areaSqm, identifier: v.identifier,
                effectiveFrom: v.effectiveFrom, effectiveTo: v.effectiveTo, isLatest: v.isLatest,
            })),
            ownerships: house.ownerships,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch house' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Check if this is a specs update or status update or owner assignment
        if (body.areaSqm !== undefined) {
            const validation = UpdateHouseSpecsDTO.safeParse(body);
            if (!validation.success) return NextResponse.json({ error: validation.error.format() }, { status: 400 });
            const house = await houseService.updateHouseSpecs(id, validation.data);
            if (!house) return NextResponse.json({ error: 'House not found' }, { status: 404 });
            return NextResponse.json({ id: house.id, totalVersions: house.versions.length });
        }

        if (body.status) {
            const house = await houseService.updateStatus(id, body.status as HouseStatus);
            if (!house) return NextResponse.json({ error: 'House not found' }, { status: 404 });
            return NextResponse.json({ id: house.id, status: house.status });
        }

        if (body.ownerId) {
            const validation = AssignOwnerDTO.safeParse(body);
            if (!validation.success) return NextResponse.json({ error: validation.error.format() }, { status: 400 });
            const house = await houseService.assignOwner(id, validation.data.ownerId);
            if (!house) return NextResponse.json({ error: 'House not found' }, { status: 404 });
            return NextResponse.json({ id: house.id, ownerCount: house.ownerships.length });
        }

        return NextResponse.json({ error: 'Invalid update request' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update house' }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await houseService.deleteHouse(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete house' }, { status: 500 });
    }
}
