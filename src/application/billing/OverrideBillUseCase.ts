import { IBillRepository } from '@/domain/billing';
import { OverrideBillInput, OverrideBillOutput } from './BillReviewDTOs';

export class OverrideBillUseCase {
    constructor(private readonly billRepo: IBillRepository) { }

    async execute(input: OverrideBillInput): Promise<OverrideBillOutput> {
        try {
            const bill = await this.billRepo.findById(input.billId);
            if (!bill) {
                return { isSuccess: false, error: 'Bill not found', finalAmount: 0 };
            }

            // In a real application, we would check if this bill has already been invoiced
            // Since we haven't implemented Invoice completely, we'll assume it's valid for now.

            const newVersion = bill.overrideBill(
                crypto.randomUUID(),
                input.newAmount,
                input.reason,
                input.createdBy
            );

            await this.billRepo.save(bill);

            return {
                isSuccess: true,
                finalAmount: newVersion.finalAmount,
            };

        } catch (error: any) {
            return { isSuccess: false, error: error.message || 'Failed to override bill', finalAmount: 0 };
        }
    }
}
