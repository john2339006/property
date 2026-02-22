import { NextResponse } from 'next/server';
import { CompanyService } from '@/application/company/CompanyService';
import { CreateCompanyDTO } from '@/application/company/CompanyDTOs';
import { PrismaCompanyRepository } from '@/infrastructure/repositories/PrismaCompanyRepository';

const companyService = new CompanyService(new PrismaCompanyRepository());

export async function GET() {
    try {
        const companies = await companyService.getAllCompanies();
        return NextResponse.json(
            companies.map((c) => ({
                id: c.id,
                legalName: c.legalName,
                registrationLicenseId: c.registrationLicenseId,
                contactInformation: c.contactInformation,
                billingInformation: c.billingInformation,
                defaultBillingPeriod: c.defaultBillingPeriod,
                currency: c.currency,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
            }))
        );
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = CreateCompanyDTO.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }
        const company = await companyService.createCompany(validation.data);
        return NextResponse.json(
            {
                id: company.id,
                legalName: company.legalName,
                registrationLicenseId: company.registrationLicenseId,
                contactInformation: company.contactInformation,
                billingInformation: company.billingInformation,
                defaultBillingPeriod: company.defaultBillingPeriod,
                currency: company.currency,
                createdAt: company.createdAt,
                updatedAt: company.updatedAt,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
    }
}
