import { describe, it, expect } from 'vitest';
import { BillingType } from '../BillingType';
import { Discount } from '../Discount';

describe('BillingType', () => {
    it('should create with initial version', () => {
        const bt = BillingType.create('bt-1', {
            companyId: 'c-1', name: '物业管理费', currentVersionId: null,
        }, {
            versionId: 'v1',
            versionProps: { feeModel: 'AREA', pricePerSqm: 3.5, usageType: 'PERSONAL', effectiveFrom: new Date('2024-01-01') },
        });
        expect(bt.name).toBe('物业管理费');
        expect(bt.versions).toHaveLength(1);
        expect(bt.currentVersion!.pricePerSqm).toBe(3.5);
        expect(bt.currentVersion!.feeModel).toBe('AREA');
    });

    it('should add new version superseding current', () => {
        const bt = BillingType.create('bt-1', { companyId: 'c-1', name: '物业管理费', currentVersionId: null }, {
            versionId: 'v1', versionProps: { feeModel: 'AREA', pricePerSqm: 3.5, usageType: 'PERSONAL', effectiveFrom: new Date('2024-01-01') },
        });
        bt.addVersion('v2', { feeModel: 'AREA', pricePerSqm: 4.0, usageType: 'PERSONAL', effectiveFrom: new Date('2024-07-01') });
        expect(bt.versions).toHaveLength(2);
        expect(bt.currentVersion!.pricePerSqm).toBe(4.0);
        const old = bt.versions.find((v) => v.id === 'v1');
        expect(old!.isLatest).toBe(false);
    });

    it('should update name', () => {
        const bt = BillingType.create('bt-1', { companyId: 'c-1', name: 'Old', currentVersionId: null });
        bt.updateName('New Name');
        expect(bt.name).toBe('New Name');
    });
});

describe('Discount', () => {
    it('should create a valid discount', () => {
        const d = Discount.create('d-1', { companyId: 'c-1', houseId: 'h-1', percentage: 10, oneTime: true, createdAt: new Date() });
        expect(d.percentage).toBe(10);
        expect(d.oneTime).toBe(true);
    });

    it('should reject invalid percentage (<= 0)', () => {
        expect(() => Discount.create('d-1', { companyId: 'c-1', houseId: 'h-1', percentage: 0, oneTime: false, createdAt: new Date() })).toThrow();
    });

    it('should reject percentage > 100', () => {
        expect(() => Discount.create('d-1', { companyId: 'c-1', houseId: 'h-1', percentage: 101, oneTime: false, createdAt: new Date() })).toThrow();
    });
});
