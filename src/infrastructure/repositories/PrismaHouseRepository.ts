import { prisma } from '@/infrastructure/database/prisma';
import { House, HouseStatus, HouseVersion, OwnershipRecord, IHouseRepository } from '@/domain/house';

export class PrismaHouseRepository implements IHouseRepository {
    async findById(id: string): Promise<House | null> {
        const data = await prisma.house.findUnique({
            where: { id },
            include: {
                versions: { orderBy: { effective_from: 'asc' } },
                ownerships: true,
            },
        });
        if (!data) return null;
        return this.toDomain(data);
    }

    async findByCompanyId(companyId: string): Promise<House[]> {
        const records = await prisma.house.findMany({
            where: { company_id: companyId },
            include: {
                versions: { orderBy: { effective_from: 'asc' } },
                ownerships: true,
            },
        });
        return records.map((data) => this.toDomain(data));
    }

    async save(house: House): Promise<void> {
        await prisma.$transaction(async (tx) => {
            await tx.house.upsert({
                where: { id: house.id },
                update: {
                    status: house.status,
                    management_end_date: house.managementEndDate,
                    current_version_id: house.currentVersionId,
                },
                create: {
                    id: house.id,
                    company_id: house.companyId,
                    status: house.status,
                    management_start_date: house.managementStartDate,
                    management_end_date: house.managementEndDate,
                    current_version_id: house.currentVersionId,
                },
            });

            for (const version of house.versions) {
                await tx.houseVersion.upsert({
                    where: { id: version.id },
                    update: { is_latest: version.isLatest, effective_to: version.effectiveTo },
                    create: {
                        id: version.id,
                        house_id: version.houseId,
                        building_no: version.buildingNo,
                        unit_no: version.unitNo,
                        level_no: version.levelNo,
                        door_no: version.doorNo,
                        area_sqm: version.areaSqm,
                        effective_from: version.effectiveFrom,
                        effective_to: version.effectiveTo,
                        is_latest: version.isLatest,
                    },
                });
            }

            // Sync ownerships: delete removed, upsert current
            const currentOwnerIds = house.ownerships.map((o) => o.id);
            await tx.ownership.deleteMany({
                where: { house_id: house.id, id: { notIn: currentOwnerIds } },
            });
            for (const ownership of house.ownerships) {
                await tx.ownership.upsert({
                    where: { id: ownership.id },
                    update: {},
                    create: {
                        id: ownership.id,
                        house_id: ownership.houseId,
                        owner_id: ownership.ownerId,
                    },
                });
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.$transaction(async (tx) => {
            await tx.ownership.deleteMany({ where: { house_id: id } });
            await tx.houseVersion.deleteMany({ where: { house_id: id } });
            await tx.house.delete({ where: { id } });
        });
    }

    private toDomain(data: {
        id: string;
        company_id: string;
        status: string;
        management_start_date: Date;
        management_end_date: Date | null;
        current_version_id: string | null;
        versions: Array<{
            id: string; house_id: string; building_no: string; unit_no: string;
            level_no: string; door_no: string; area_sqm: number;
            effective_from: Date; effective_to: Date | null; is_latest: boolean;
        }>;
        ownerships: Array<{ id: string; house_id: string; owner_id: string }>;
    }): House {
        const versions = data.versions.map((v) =>
            HouseVersion.reconstitute(v.id, {
                houseId: v.house_id, buildingNo: v.building_no, unitNo: v.unit_no,
                levelNo: v.level_no, doorNo: v.door_no, areaSqm: v.area_sqm,
                effectiveFrom: v.effective_from, effectiveTo: v.effective_to, isLatest: v.is_latest,
            })
        );
        const ownerships: OwnershipRecord[] = data.ownerships.map((o) => ({
            id: o.id, houseId: o.house_id, ownerId: o.owner_id,
        }));
        return House.reconstitute(data.id, {
            companyId: data.company_id,
            status: data.status as HouseStatus,
            managementStartDate: data.management_start_date,
            managementEndDate: data.management_end_date,
            currentVersionId: data.current_version_id,
        }, versions, ownerships);
    }
}
