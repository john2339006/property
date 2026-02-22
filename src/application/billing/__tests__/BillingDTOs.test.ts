import { describe, it, expect } from 'vitest';
import { CreateBillingTypeDTO, UpdateBillingTypeDTO, CreateDiscountDTO } from '../BillingDTOs';

describe('CreateBillingTypeDTO', () => {
    const valid = {
        companyId: '550e8400-e29b-41d4-a716-446655440000',
        name: '物业管理费', feeModel: 'AREA', pricePerSqm: 3.5, usageType: 'PERSONAL',
    };
    it('should validate correct input', () => { expect(CreateBillingTypeDTO.safeParse(valid).success).toBe(true); });
    it('should reject invalid fee model', () => { expect(CreateBillingTypeDTO.safeParse({ ...valid, feeModel: 'FLAT' }).success).toBe(false); });
    it('should accept null pricePerSqm', () => { expect(CreateBillingTypeDTO.safeParse({ ...valid, pricePerSqm: null }).success).toBe(true); });
});

describe('UpdateBillingTypeDTO', () => {
    it('should validate correct input', () => {
        expect(UpdateBillingTypeDTO.safeParse({ feeModel: 'TIERED', pricePerSqm: null, usageType: 'BUSINESS' }).success).toBe(true);
    });
});

describe('CreateDiscountDTO', () => {
    const valid = {
        companyId: '550e8400-e29b-41d4-a716-446655440000',
        houseId: '660e8400-e29b-41d4-a716-446655440000',
        percentage: 10, oneTime: true,
    };
    it('should validate correct input', () => { expect(CreateDiscountDTO.safeParse(valid).success).toBe(true); });
    it('should reject zero percentage', () => { expect(CreateDiscountDTO.safeParse({ ...valid, percentage: 0 }).success).toBe(false); });
    it('should reject > 100 percentage', () => { expect(CreateDiscountDTO.safeParse({ ...valid, percentage: 101 }).success).toBe(false); });
});
