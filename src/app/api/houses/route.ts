import { NextResponse } from 'next/server';
import { HouseService } from '@/application/house/HouseService';
import { RegisterHouseDTO } from '@/application/house/HouseDTOs';
import { PrismaHouseRepository } from '@/infrastructure/repositories/PrismaHouseRepository';

const houseService = new HouseService(new PrismaHouseRepository());

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');
        if (!companyId) {
            return NextResponse.json({ error: 'companyId query parameter is required' }, { status: 400 });
        }
        const houses = await houseService.getHousesByCompany(companyId);
        return NextResponse.json(houses.map((h) => ({
            id: h.id, status: h.status, companyId: h.companyId,
            currentVersion: h.currentVersion ? {
                buildingNo: h.currentVersion.buildingNo, unitNo: h.currentVersion.unitNo,
                doorNo: h.currentVersion.doorNo, areaSqm: h.currentVersion.areaSqm,
                identifier: h.currentVersion.identifier,
            } : null,
            ownerCount: h.ownerships.length,
        })));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch houses' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = RegisterHouseDTO.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }
        const house = await houseService.registerHouse(validation.data);
        return NextResponse.json({
            id: house.id, status: house.status,
            currentVersion: house.currentVersion ? {
                identifier: house.currentVersion.identifier,
                areaSqm: house.currentVersion.areaSqm,
            } : null,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to register house' }, { status: 500 });
    }
}
