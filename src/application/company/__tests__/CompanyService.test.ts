import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CompanyService } from '../CompanyService';
import { Company, ICompanyRepository, BillingPeriodType } from '@/domain/company';

// Create a mock repository
function createMockRepo(): ICompanyRepository {
    const store = new Map<string, Company>();
    return {
        findById: vi.fn(async (id: string) => store.get(id) ?? null),
        findAll: vi.fn(async () => Array.from(store.values())),
        save: vi.fn(async (company: Company) => {
            store.set(company.id, company);
        }),
        delete: vi.fn(async (id: string) => {
            store.delete(id);
        }),
    };
}

const validInput = {
    legalName: '兴业物业管理有限公司',
    registrationLicenseId: 'REG-12345',
    contactInformation: '021-12345678',
    billingInformation: 'Bank: ABC',
    defaultBillingPeriod: 'MONTHLY' as const,
    currency: 'CNY',
};

describe('CompanyService', () => {
    let service: CompanyService;
    let repo: ICompanyRepository;

    beforeEach(() => {
        repo = createMockRepo();
        service = new CompanyService(repo);
    });

    it('should create a company', async () => {
        const company = await service.createCompany(validInput);
        expect(company).toBeDefined();
        expect(company.legalName).toBe('兴业物业管理有限公司');
        expect(company.currency).toBe('CNY');
        expect(repo.save).toHaveBeenCalledOnce();
    });

    it('should get a company by id', async () => {
        const created = await service.createCompany(validInput);
        const found = await service.getCompany(created.id);
        expect(found).not.toBeNull();
        expect(found!.id).toBe(created.id);
    });

    it('should return null for unknown id', async () => {
        const found = await service.getCompany('non-existent');
        expect(found).toBeNull();
    });

    it('should list all companies', async () => {
        await service.createCompany(validInput);
        await service.createCompany({ ...validInput, legalName: 'Second Company' });
        const all = await service.getAllCompanies();
        expect(all).toHaveLength(2);
    });

    it('should update a company', async () => {
        const company = await service.createCompany(validInput);
        const updated = await service.updateCompany(company.id, {
            legalName: 'Updated Name',
            defaultBillingPeriod: 'ANNUAL',
        });
        expect(updated).not.toBeNull();
        expect(updated!.legalName).toBe('Updated Name');
        expect(updated!.defaultBillingPeriod).toBe('ANNUAL');
    });

    it('should return null when updating non-existent company', async () => {
        const result = await service.updateCompany('no-such-id', { legalName: 'No' });
        expect(result).toBeNull();
    });

    it('should delete a company', async () => {
        const company = await service.createCompany(validInput);
        await service.deleteCompany(company.id);
        expect(repo.delete).toHaveBeenCalledWith(company.id);
    });

    it('should uppercase the currency code', async () => {
        const company = await service.createCompany({ ...validInput, currency: 'cny' });
        expect(company.currency).toBe('CNY');
    });
});
