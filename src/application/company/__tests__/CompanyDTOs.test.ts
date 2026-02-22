import { describe, it, expect } from 'vitest';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../CompanyDTOs';

describe('CreateCompanyDTO', () => {
    const validData = {
        legalName: '兴业物业管理有限公司',
        registrationLicenseId: 'REG-12345',
        contactInformation: '021-12345678',
        billingInformation: 'Bank: ABC',
        defaultBillingPeriod: 'MONTHLY',
        currency: 'CNY',
    };

    it('should validate correct input', () => {
        const result = CreateCompanyDTO.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject empty legal name', () => {
        const result = CreateCompanyDTO.safeParse({ ...validData, legalName: '' });
        expect(result.success).toBe(false);
    });

    it('should reject invalid billing period', () => {
        const result = CreateCompanyDTO.safeParse({ ...validData, defaultBillingPeriod: 'WEEKLY' });
        expect(result.success).toBe(false);
    });

    it('should reject invalid currency length', () => {
        const result = CreateCompanyDTO.safeParse({ ...validData, currency: 'ABCD' });
        expect(result.success).toBe(false);
    });

    it('should reject missing fields', () => {
        const result = CreateCompanyDTO.safeParse({});
        expect(result.success).toBe(false);
    });
});

describe('UpdateCompanyDTO', () => {
    it('should accept partial updates', () => {
        const result = UpdateCompanyDTO.safeParse({ legalName: 'New Name' });
        expect(result.success).toBe(true);
    });

    it('should accept empty object (no changes)', () => {
        const result = UpdateCompanyDTO.safeParse({});
        expect(result.success).toBe(true);
    });

    it('should reject invalid billing period', () => {
        const result = UpdateCompanyDTO.safeParse({ defaultBillingPeriod: 'DAILY' });
        expect(result.success).toBe(false);
    });
});
