import { IInvoiceRepository, InvoiceStatus } from '@/domain/invoicing';
import { Result } from '@/domain/shared/Result';
import { DomainError } from '@/domain/shared/DomainError';
import { InvoiceDTO } from './InvoiceDTOs';

export interface ChangeInvoiceStatusRequest {
    invoiceId: string;
    newStatus: 'ISSUED' | 'PAID' | 'VOIDED';
}

export class ChangeInvoiceStatusUseCase {
    constructor(private readonly invoiceRepository: IInvoiceRepository) { }

    async execute(request: ChangeInvoiceStatusRequest): Promise<Result<InvoiceDTO>> {
        const invoice = await this.invoiceRepository.findById(request.invoiceId);
        if (!invoice) {
            return Result.fail(new DomainError('Invoice not found', 'NOT_FOUND'));
        }

        let changeResult: Result<void>;

        switch (request.newStatus) {
            case 'ISSUED':
                changeResult = invoice.issue();
                break;
            case 'PAID':
                changeResult = invoice.markPaid();
                break;
            case 'VOIDED':
                changeResult = invoice.voidInvoice();
                break;
            default:
                return Result.fail(new DomainError('Invalid target status', 'INVALID_OPERATION'));
        }

        if (!changeResult.isSuccess) {
            return Result.fail(changeResult.getError());
        }

        await this.invoiceRepository.save(invoice);

        return Result.ok(this.mapToDTO(invoice));
    }

    private mapToDTO(invoice: any): InvoiceDTO {
        return {
            id: invoice.id,
            billVersionId: invoice.billVersionId,
            houseId: invoice.houseId,
            billingPeriod: invoice.billingPeriod,
            status: invoice.status,
            totalAmount: invoice.totalAmount,
            createdAt: invoice.createdAt,
            lineItems: invoice.lineItems.map((li: any) => ({
                id: li.id,
                houseIdentifier: li.houseIdentifier,
                ownerName: li.ownerName,
                amount: li.amount
            }))
        };
    }
}
