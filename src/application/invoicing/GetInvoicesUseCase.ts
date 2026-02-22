import { IInvoiceRepository } from '@/domain/invoicing';
import { InvoiceDTO } from './InvoiceDTOs';

export class GetInvoicesUseCase {
    constructor(private readonly invoiceRepository: IInvoiceRepository) { }

    async execute(companyId: string, billingPeriod?: string): Promise<InvoiceDTO[]> {
        let invoices = [];
        if (billingPeriod) {
            invoices = await this.invoiceRepository.findByPeriod(companyId, billingPeriod);
        } else {
            // Need a generic get all or we fetch for current period. For now, we'll need to add a generic method or just use raw prisma in this specific route if we want ALL.
            // Let's assume we always filter by period in the UI for performance.
            throw new Error("billingPeriod is required for fetching invoices in this MVP");
        }

        return invoices.map(invoice => ({
            id: invoice.id,
            billVersionId: invoice.billVersionId,
            houseId: invoice.houseId,
            billingPeriod: invoice.billingPeriod,
            status: invoice.status,
            totalAmount: invoice.totalAmount,
            createdAt: invoice.createdAt,
            lineItems: invoice.lineItems.map(li => ({
                id: li.id,
                houseIdentifier: li.houseIdentifier,
                ownerName: li.ownerName,
                amount: li.amount
            }))
        }));
    }
}
