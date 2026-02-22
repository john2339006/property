import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BillingConfigService } from '../BillingConfigService';
import { BillingType, IBillingTypeRepository, Discount, IDiscountRepository } from '@/domain/billing';

function createMockBillingTypeRepo(): IBillingTypeRepository {
    const store = new Map<string, BillingType>();
    return {
        findById: vi.fn(async (id) => store.get(id) ?? null),
        findByCompanyId: vi.fn(async (cid) => Array.from(store.values()).filter((b) => b.companyId === cid)),
        save: vi.fn(async (bt) => { store.set(bt.id, bt); }),
        delete: vi.fn(async (id) => { store.delete(id); }),
    };
}

function createMockDiscountRepo(): IDiscountRepository {
    const store = new Map<string, Discount>();
    return {
        findById: vi.fn(async (id) => store.get(id) ?? null),
        findByHouseId: vi.fn(async (hid) => Array.from(store.values()).filter((d) => d.houseId === hid)),
        findByCompanyId: vi.fn(async (cid) => Array.from(store.values()).filter((d) => d.companyId === cid)),
        save: vi.fn(async (d) => { store.set(d.id, d); }),
        delete: vi.fn(async (id) => { store.delete(id); }),
    };
}

describe('BillingConfigService', () => {
    let service: BillingConfigService;

    beforeEach(() => {
        service = new BillingConfigService(createMockBillingTypeRepo(), createMockDiscountRepo());
    });

    it('should create a billing type', async () => {
        const bt = await service.createBillingType({
            companyId: '550e8400-e29b-41d4-a716-446655440000',
            name: '物业管理费', feeModel: 'AREA', pricePerSqm: 3.5, usageType: 'PERSONAL',
        });
        expect(bt.name).toBe('物业管理费');
        expect(bt.currentVersion!.pricePerSqm).toBe(3.5);
    });

    it('should update billing type (new version)', async () => {
        const bt = await service.createBillingType({
            companyId: '550e8400-e29b-41d4-a716-446655440000',
            name: '物业管理费', feeModel: 'AREA', pricePerSqm: 3.5, usageType: 'PERSONAL',
        });
        const updated = await service.updateBillingType(bt.id, {
            feeModel: 'AREA', pricePerSqm: 4.0, usageType: 'PERSONAL',
        });
        expect(updated!.versions).toHaveLength(2);
        expect(updated!.currentVersion!.pricePerSqm).toBe(4.0);
    });

    it('should list billing types by company', async () => {
        const cid = '550e8400-e29b-41d4-a716-446655440000';
        await service.createBillingType({ companyId: cid, name: 'A', feeModel: 'AREA', pricePerSqm: 1, usageType: 'PERSONAL' });
        await service.createBillingType({ companyId: cid, name: 'B', feeModel: 'TIERED', pricePerSqm: null, usageType: 'BUSINESS' });
        const types = await service.getBillingTypesByCompany(cid);
        expect(types).toHaveLength(2);
    });

    it('should create a discount', async () => {
        const d = await service.createDiscount({
            companyId: '550e8400-e29b-41d4-a716-446655440000',
            houseId: '660e8400-e29b-41d4-a716-446655440000',
            percentage: 15, oneTime: true,
        });
        expect(d.percentage).toBe(15);
        expect(d.oneTime).toBe(true);
    });

    it('should get discounts by house', async () => {
        const hid = '660e8400-e29b-41d4-a716-446655440000';
        await service.createDiscount({ companyId: '550e8400-e29b-41d4-a716-446655440000', houseId: hid, percentage: 10, oneTime: false });
        const discounts = await service.getDiscountsByHouse(hid);
        expect(discounts).toHaveLength(1);
    });
});
