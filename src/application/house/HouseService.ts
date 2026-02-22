import { House, HouseStatus, IHouseRepository } from '@/domain/house';
import { RegisterHouseInput, UpdateHouseSpecsInput } from './HouseDTOs';

export class HouseService {
    constructor(private readonly houseRepo: IHouseRepository) { }

    async registerHouse(input: RegisterHouseInput): Promise<House> {
        const house = House.create(
            crypto.randomUUID(),
            {
                companyId: input.companyId,
                status: 'NOT_SOLD' as HouseStatus,
                managementStartDate: new Date(),
                managementEndDate: null,
                currentVersionId: null,
            },
            {
                versionId: crypto.randomUUID(),
                versionProps: {
                    buildingNo: input.buildingNo,
                    unitNo: input.unitNo,
                    levelNo: input.levelNo,
                    doorNo: input.doorNo,
                    areaSqm: input.areaSqm,
                    effectiveFrom: new Date(),
                },
            }
        );
        await this.houseRepo.save(house);
        return house;
    }

    async getHouse(id: string): Promise<House | null> {
        return this.houseRepo.findById(id);
    }

    async getHousesByCompany(companyId: string): Promise<House[]> {
        return this.houseRepo.findByCompanyId(companyId);
    }

    async updateHouseSpecs(id: string, input: UpdateHouseSpecsInput): Promise<House | null> {
        const house = await this.houseRepo.findById(id);
        if (!house) return null;
        house.addVersion(crypto.randomUUID(), {
            buildingNo: input.buildingNo,
            unitNo: input.unitNo,
            levelNo: input.levelNo,
            doorNo: input.doorNo,
            areaSqm: input.areaSqm,
            effectiveFrom: new Date(),
        });
        await this.houseRepo.save(house);
        return house;
    }

    async assignOwner(houseId: string, ownerId: string): Promise<House | null> {
        const house = await this.houseRepo.findById(houseId);
        if (!house) return null;
        house.assignOwner(crypto.randomUUID(), ownerId);
        await this.houseRepo.save(house);
        return house;
    }

    async removeOwner(houseId: string, ownerId: string): Promise<House | null> {
        const house = await this.houseRepo.findById(houseId);
        if (!house) return null;
        house.removeOwner(ownerId);
        await this.houseRepo.save(house);
        return house;
    }

    async updateStatus(id: string, status: HouseStatus): Promise<House | null> {
        const house = await this.houseRepo.findById(id);
        if (!house) return null;
        house.updateStatus(status);
        await this.houseRepo.save(house);
        return house;
    }

    async deleteHouse(id: string): Promise<void> {
        await this.houseRepo.delete(id);
    }
}
