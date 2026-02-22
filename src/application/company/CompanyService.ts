import { Company, BillingPeriodType, ICompanyRepository } from '@/domain/company';
import { CreateCompanyInput, UpdateCompanyInput } from './CompanyDTOs';

export class CompanyService {
    constructor(private readonly companyRepo: ICompanyRepository) { }

    async createCompany(input: CreateCompanyInput): Promise<Company> {
        const now = new Date();
        const company = Company.create(crypto.randomUUID(), {
            legalName: input.legalName,
            registrationLicenseId: input.registrationLicenseId,
            contactInformation: input.contactInformation,
            billingInformation: input.billingInformation,
            defaultBillingPeriod: input.defaultBillingPeriod as BillingPeriodType,
            currency: input.currency.toUpperCase(),
            createdAt: now,
            updatedAt: now,
        });
        await this.companyRepo.save(company);
        return company;
    }

    async getCompany(id: string): Promise<Company | null> {
        return this.companyRepo.findById(id);
    }

    async getAllCompanies(): Promise<Company[]> {
        return this.companyRepo.findAll();
    }

    async updateCompany(id: string, input: UpdateCompanyInput): Promise<Company | null> {
        const company = await this.companyRepo.findById(id);
        if (!company) return null;
        company.updateProfile(input);
        await this.companyRepo.save(company);
        return company;
    }

    async deleteCompany(id: string): Promise<void> {
        await this.companyRepo.delete(id);
    }
}
