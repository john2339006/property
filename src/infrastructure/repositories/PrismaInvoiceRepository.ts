import { IInvoiceRepository, Invoice, InvoiceLineItem, InvoiceStatus } from '@/domain/invoicing';
import { PrismaClient } from '@prisma/client';

export class PrismaInvoiceRepository implements IInvoiceRepository {
    constructor(private readonly prisma: PrismaClient) { }

    private mapToDomain(model: any): Invoice {
        const lineItems = model.line_items.map((li: any) =>
            InvoiceLineItem.reconstitute(li.id, {
                invoiceId: li.invoice_id,
                houseIdentifier: li.house_identifier,
                ownerName: li.owner_name,
                amount: li.amount
            })
        );

        return Invoice.reconstitute(model.id, {
            billVersionId: model.bill_version_id,
            houseId: model.house_id,
            billingPeriod: model.billing_period,
            status: model.status as InvoiceStatus,
            createdAt: model.created_at
        }, lineItems);
    }

    async findById(id: string): Promise<Invoice | null> {
        const model = await this.prisma.invoice.findUnique({
            where: { id },
            include: { line_items: true }
        });
        if (!model) return null;
        return this.mapToDomain(model);
    }

    async findByPeriod(companyId: string, billingPeriod: string): Promise<Invoice[]> {
        const models = await this.prisma.invoice.findMany({
            where: {
                billing_period: billingPeriod,
                house: {
                    company_id: companyId
                }
            },
            include: { line_items: true }
        });
        return models.map(m => this.mapToDomain(m));
    }

    async findByHouseId(houseId: string): Promise<Invoice[]> {
        const models = await this.prisma.invoice.findMany({
            where: { house_id: houseId },
            include: { line_items: true }
        });
        return models.map(m => this.mapToDomain(m));
    }

    async findByBillVersionId(billVersionId: string): Promise<Invoice | null> {
        const model = await this.prisma.invoice.findFirst({
            where: { bill_version_id: billVersionId },
            include: { line_items: true }
        });
        if (!model) return null;
        return this.mapToDomain(model);
    }

    async save(invoice: Invoice): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            const data = {
                id: invoice.id,
                bill_version_id: invoice.billVersionId,
                house_id: invoice.houseId,
                billing_period: invoice.billingPeriod,
                status: invoice.status,
                created_at: invoice.createdAt
            };

            await tx.invoice.upsert({
                where: { id: invoice.id },
                create: data,
                update: data
            });

            // For simplicity, we assume line items don't change after creation.
            // If they do, we'd need to sync them (delete removed, update existing, etc.)
            for (const item of invoice.lineItems) {
                const itemData = {
                    id: item.id,
                    invoice_id: item.invoiceId,
                    house_identifier: item.houseIdentifier,
                    owner_name: item.ownerName,
                    amount: item.amount
                };

                await tx.invoiceLineItem.upsert({
                    where: { id: item.id },
                    create: itemData,
                    update: itemData
                });
            }
        });
    }
}
