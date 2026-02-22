import { prisma } from '@/infrastructure/database/prisma';
import { Company, BillingPeriodType, ICompanyRepository } from '@/domain/company';

export class PrismaCompanyRepository implements ICompanyRepository {
    async findById(id: string): Promise<Company | null> {
        const data = await prisma.managementCompany.findUnique({ where: { id } });
        if (!data) return null;
        return Company.reconstitute(data.id, {
            legalName: data.legal_name,
            registrationLicenseId: data.registration_license_id,
            contactInformation: data.contact_information,
            billingInformation: data.billing_information,
            defaultBillingPeriod: data.default_billing_period as BillingPeriodType,
            currency: data.currency,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        });
    }

    async findAll(): Promise<Company[]> {
        const records = await prisma.managementCompany.findMany();
        return records.map((data) =>
            Company.reconstitute(data.id, {
                legalName: data.legal_name,
                registrationLicenseId: data.registration_license_id,
                contactInformation: data.contact_information,
                billingInformation: data.billing_information,
                defaultBillingPeriod: data.default_billing_period as BillingPeriodType,
                currency: data.currency,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            })
        );
    }

    async save(company: Company): Promise<void> {
        await prisma.managementCompany.upsert({
            where: { id: company.id },
            update: {
                legal_name: company.legalName,
                registration_license_id: company.registrationLicenseId,
                contact_information: company.contactInformation,
                billing_information: company.billingInformation,
                default_billing_period: company.defaultBillingPeriod,
                currency: company.currency,
            },
            create: {
                id: company.id,
                legal_name: company.legalName,
                registration_license_id: company.registrationLicenseId,
                contact_information: company.contactInformation,
                billing_information: company.billingInformation,
                default_billing_period: company.defaultBillingPeriod,
                currency: company.currency,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.managementCompany.delete({ where: { id } });
    }
}
