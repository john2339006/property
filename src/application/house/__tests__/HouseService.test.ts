import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HouseService } from '../HouseService';
import { House, IHouseRepository, HouseStatus } from '@/domain/house';

function createMockRepo(): IHouseRepository {
    const store = new Map<string, House>();
    return {
        findById: vi.fn(async (id: string) => store.get(id) ?? null),
        findByCompanyId: vi.fn(async (cid: string) =>
            Array.from(store.values()).filter((h) => h.companyId === cid)
        ),
        save: vi.fn(async (house: House) => { store.set(house.id, house); }),
        delete: vi.fn(async (id: string) => { store.delete(id); }),
    };
}

const validInput = {
    companyId: '550e8400-e29b-41d4-a716-446655440000',
    buildingNo: 'A',
    unitNo: '101',
    levelNo: '1',
    doorNo: '101',
    areaSqm: 85.5,
};

describe('HouseService', () => {
    let service: HouseService;
    let repo: IHouseRepository;

    beforeEach(() => {
        repo = createMockRepo();
        service = new HouseService(repo);
    });

    it('should register a house', async () => {
        const house = await service.registerHouse(validInput);
        expect(house.status).toBe('NOT_SOLD');
        expect(house.versions).toHaveLength(1);
        expect(house.currentVersion!.buildingNo).toBe('A');
        expect(repo.save).toHaveBeenCalledOnce();
    });

    it('should get a house by id', async () => {
        const created = await service.registerHouse(validInput);
        const found = await service.getHouse(created.id);
        expect(found).not.toBeNull();
    });

    it('should update house specs (creates new version)', async () => {
        const house = await service.registerHouse(validInput);
        const updated = await service.updateHouseSpecs(house.id, {
            buildingNo: 'A', unitNo: '101', levelNo: '1', doorNo: '101', areaSqm: 95.0,
        });
        expect(updated!.versions).toHaveLength(2);
        expect(updated!.currentVersion!.areaSqm).toBe(95.0);
    });

    it('should assign an owner', async () => {
        const house = await service.registerHouse(validInput);
        const updated = await service.assignOwner(house.id, 'owner-uuid');
        expect(updated!.ownerships).toHaveLength(1);
        expect(updated!.ownerships[0].ownerId).toBe('owner-uuid');
    });

    it('should remove an owner', async () => {
        const house = await service.registerHouse(validInput);
        await service.assignOwner(house.id, 'owner-uuid');
        const updated = await service.removeOwner(house.id, 'owner-uuid');
        expect(updated!.ownerships).toHaveLength(0);
    });

    it('should update status', async () => {
        const house = await service.registerHouse(validInput);
        const updated = await service.updateStatus(house.id, 'ACTIVE');
        expect(updated!.status).toBe('ACTIVE');
    });

    it('should delete a house', async () => {
        const house = await service.registerHouse(validInput);
        await service.deleteHouse(house.id);
        expect(repo.delete).toHaveBeenCalledWith(house.id);
    });

    it('should list houses by company', async () => {
        await service.registerHouse(validInput);
        await service.registerHouse({ ...validInput, doorNo: '102' });
        const houses = await service.getHousesByCompany(validInput.companyId);
        expect(houses).toHaveLength(2);
    });
});
