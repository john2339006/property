import { IBillRepository } from '@/domain/billing';
import { GetBillsByPeriodInput, BillDTO } from './BillReviewDTOs';

export class GetBillsByPeriodUseCase {
    constructor(private readonly billRepo: IBillRepository) { }

    async execute(input: GetBillsByPeriodInput): Promise<BillDTO[]> {
        const bills = await this.billRepo.findByPeriod(input.companyId, input.billingPeriod);

        return bills.map(bill => {
            const latestVersion = bill.currentVersion!;
            return {
                id: bill.id,
                houseId: bill.houseId,
                billingPeriod: bill.billingPeriod,
                calculatedAmount: latestVersion.calculatedAmount,
                discountApplied: latestVersion.discountApplied,
                overriddenAmount: latestVersion.overriddenAmount,
                finalAmount: latestVersion.finalAmount,
                isOverridden: latestVersion.overriddenAmount !== null
            };
        });
    }
}
