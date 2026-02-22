import { IInvoiceRepository, Invoice, InvoiceStatus } from '@/domain/invoicing';
import { IBillRepository } from '@/domain/billing';
import { IHouseRepository } from '@/domain/house';
import { IOwnerRepository } from '@/domain/owner';
import { Result } from '@/domain/shared/Result';
import { DomainError } from '@/domain/shared/DomainError';
import { InvoiceDTO } from './InvoiceDTOs';

export interface GenerateInvoiceRequest {
    billId: string;
}

export class GenerateInvoiceUseCase {
    constructor(
        private readonly invoiceRepository: IInvoiceRepository,
        private readonly billRepository: IBillRepository,
        private readonly houseRepository: IHouseRepository,
        private readonly ownerRepository: IOwnerRepository
    ) { }

    async execute(request: GenerateInvoiceRequest): Promise<Result<InvoiceDTO>> {
        const bill = await this.billRepository.findById(request.billId);
        if (!bill) {
            return Result.fail(new DomainError('Bill not found', 'NOT_FOUND'));
        }

        const latestVersion = bill.currentVersion;
        if (!latestVersion) {
            return Result.fail(new DomainError('Bill has no versions to invoice', 'INVALID_STATE'));
        }

        // Check if an invoice already exists for this bill version
        const existingInvoice = await this.invoiceRepository.findByBillVersionId(latestVersion.id);
        if (existingInvoice && existingInvoice.status !== InvoiceStatus.VOIDED) {
            return Result.fail(new DomainError('An active invoice already exists for this bill version', 'DUPLICATE_INVOICE'));
        }

        // Fetch House to get identifier and owner
        const house = await this.houseRepository.findById(bill.houseId);
        if (!house || !house.currentVersion) {
            return Result.fail(new DomainError('House or house version not found', 'NOT_FOUND'));
        }

        const houseIdentifier = `${house.currentVersion.buildingNo}-${house.currentVersion.unitNo}`;
        let ownerName = 'Unknown Owner';

        // Find active ownership
        const activeOwnership = house.ownerships[0]; // Assuming first is active for simplicity in this MVP
        if (activeOwnership) {
            const owner = await this.ownerRepository.findById(activeOwnership.ownerId);
            if (owner && owner.currentVersion) {
                ownerName = owner.currentVersion.fullLegalName;
            }
        }

        const finalAmount = latestVersion.overriddenAmount !== null
            ? latestVersion.overriddenAmount
            : (latestVersion.calculatedAmount - latestVersion.discountApplied);

        const invoiceResult = Invoice.create({
            billVersionId: latestVersion.id,
            houseId: bill.houseId,
            billingPeriod: bill.billingPeriod,
            lineItemsData: [
                {
                    houseIdentifier,
                    ownerName,
                    amount: finalAmount
                }
            ]
        });

        if (!invoiceResult.isSuccess) {
            return Result.fail(invoiceResult.getError());
        }

        const invoice = invoiceResult.getValue();
        await this.invoiceRepository.save(invoice);

        return Result.ok(this.mapToDTO(invoice));
    }

    private mapToDTO(invoice: Invoice): InvoiceDTO {
        return {
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
        };
    }
}
