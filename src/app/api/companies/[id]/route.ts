import { NextResponse } from 'next/server';
import { CompanyService } from '@/application/company/CompanyService';
import { UpdateCompanyDTO } from '@/application/company/CompanyDTOs';
import { PrismaCompanyRepository } from '@/infrastructure/repositories/PrismaCompanyRepository';

const companyService = new CompanyService(new PrismaCompanyRepository());

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const company = await companyService.getCompany(id);
        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }
        return NextResponse.json({
            id: company.id,
            legalName: company.legalName,
            registrationLicenseId: company.registrationLicenseId,
            contactInformation: company.contactInformation,
            billingInformation: company.billingInformation,
            defaultBillingPeriod: company.defaultBillingPeriod,
            currency: company.currency,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch company' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const validation = UpdateCompanyDTO.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }
        const company = await companyService.updateCompany(id, validation.data);
        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }
        return NextResponse.json({
            id: company.id,
            legalName: company.legalName,
            registrationLicenseId: company.registrationLicenseId,
            contactInformation: company.contactInformation,
            billingInformation: company.billingInformation,
            defaultBillingPeriod: company.defaultBillingPeriod,
            currency: company.currency,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update company' }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await companyService.deleteCompany(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 });
    }
}
