import { describe, it, expect } from 'vitest';
import { House, HouseStatus } from '../House';

function makeHouse() {
    return House.create('house-1', {
        companyId: 'company-1',
        status: 'ACTIVE' as HouseStatus,
        managementStartDate: new Date('2024-01-01'),
        managementEndDate: null,
        currentVersionId: null,
    }, {
        versionId: 'v1',
        versionProps: {
            buildingNo: 'A',
            unitNo: '101',
            levelNo: '1',
            doorNo: '101',
            areaSqm: 85.5,
            effectiveFrom: new Date('2024-01-01'),
        },
    });
}

describe('House', () => {
    it('should create a house with initial version', () => {
        const house = makeHouse();
        expect(house.id).toBe('house-1');
        expect(house.status).toBe('ACTIVE');
        expect(house.versions).toHaveLength(1);
        expect(house.currentVersion!.buildingNo).toBe('A');
        expect(house.currentVersion!.areaSqm).toBe(85.5);
        expect(house.currentVersion!.identifier).toBe('A-101-101');
    });

    it('should add version with superseding', () => {
        const house = makeHouse();
        house.addVersion('v2', {
            buildingNo: 'A',
            unitNo: '101',
            levelNo: '1',
            doorNo: '101',
            areaSqm: 90.0, // Area updated
            effectiveFrom: new Date('2024-06-01'),
        });
        expect(house.versions).toHaveLength(2);
        expect(house.currentVersion!.areaSqm).toBe(90.0);
        const old = house.versions.find((v) => v.id === 'v1');
        expect(old!.isLatest).toBe(false);
    });

    it('should update status', () => {
        const house = makeHouse();
        house.updateStatus('SOLD_NOT_ACTIVE');
        expect(house.status).toBe('SOLD_NOT_ACTIVE');
        expect(house.managementEndDate).toBeDefined();
    });

    it('should assign and remove owners', () => {
        const house = makeHouse();
        house.assignOwner('ownership-1', 'owner-1');
        house.assignOwner('ownership-2', 'owner-2');
        expect(house.ownerships).toHaveLength(2);

        // Duplicate assignment is idempotent
        house.assignOwner('ownership-3', 'owner-1');
        expect(house.ownerships).toHaveLength(2);

        house.removeOwner('owner-1');
        expect(house.ownerships).toHaveLength(1);
        expect(house.ownerships[0].ownerId).toBe('owner-2');
    });

    it('should support identity equality', () => {
        const h1 = makeHouse();
        const h2 = House.create('house-1', {
            companyId: 'company-2',
            status: 'NOT_SOLD',
            managementStartDate: new Date(),
            managementEndDate: null,
            currentVersionId: null,
        });
        expect(h1.equals(h2)).toBe(true);
    });
});
