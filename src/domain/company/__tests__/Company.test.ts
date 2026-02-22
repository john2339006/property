import { describe, it, expect } from 'vitest';
import { Company, BillingPeriodType } from '../Company';

function makeCompany(overrides: Partial<Record<string, unknown>> = {}) {
    return Company.create('company-1', {
        legalName: '兴业物业管理有限公司',
        registrationLicenseId: 'REG-12345',
        contactInformation: '021-12345678',
        billingInformation: 'Bank: ABC, Account: 123456',
        defaultBillingPeriod: 'MONTHLY' as BillingPeriodType,
        currency: 'CNY',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        ...overrides,
    });
}

describe('Company', () => {
    it('should create a company with correct properties', () => {
        const company = makeCompany();
        expect(company.id).toBe('company-1');
        expect(company.legalName).toBe('兴业物业管理有限公司');
        expect(company.registrationLicenseId).toBe('REG-12345');
        expect(company.currency).toBe('CNY');
        expect(company.defaultBillingPeriod).toBe('MONTHLY');
    });

    it('should update profile fields', () => {
        const company = makeCompany();
        company.updateProfile({
            legalName: '新兴业物业管理有限公司',
            defaultBillingPeriod: 'ANNUAL',
        });
        expect(company.legalName).toBe('新兴业物业管理有限公司');
        expect(company.defaultBillingPeriod).toBe('ANNUAL');
    });

    it('should update the updatedAt timestamp on profile update', () => {
        const company = makeCompany();
        const before = company.updatedAt;
        company.updateProfile({ legalName: 'Updated Name' });
        expect(company.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });

    it('should support identity equality', () => {
        const c1 = makeCompany();
        const c2 = Company.create('company-1', {
            legalName: 'Different Name',
            registrationLicenseId: 'REG-99999',
            contactInformation: '000',
            billingInformation: 'None',
            defaultBillingPeriod: 'ANNUAL',
            currency: 'USD',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        expect(c1.equals(c2)).toBe(true); // same ID = same entity
    });

    it('should reconstitute from persistence data', () => {
        const company = Company.reconstitute('existing-id', {
            legalName: 'Existing Company',
            registrationLicenseId: 'REG-000',
            contactInformation: 'info',
            billingInformation: 'billing',
            defaultBillingPeriod: 'MONTHLY',
            currency: 'CNY',
            createdAt: new Date('2023-06-15'),
            updatedAt: new Date('2023-12-01'),
        });
        expect(company.id).toBe('existing-id');
        expect(company.legalName).toBe('Existing Company');
    });
});
