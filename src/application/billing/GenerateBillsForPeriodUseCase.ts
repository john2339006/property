import { IHouseRepository } from '@/domain/house/IHouseRepository';
import { IBillingTypeRepository, IDiscountRepository, IBillRepository, Bill } from '@/domain/billing';
import { FeeCalculationService } from '@/domain/billing/FeeCalculationService';
import { GenerateBillsForPeriodInput, GenerateBillsForPeriodOutput } from './BillGenerationDTOs';

export class GenerateBillsForPeriodUseCase {
    constructor(
        private readonly houseRepo: IHouseRepository,
        private readonly billingTypeRepo: IBillingTypeRepository,
        private readonly discountRepo: IDiscountRepository,
        private readonly billRepo: IBillRepository
    ) { }

    async execute(input: GenerateBillsForPeriodInput): Promise<GenerateBillsForPeriodOutput> {
        let billsGeneratedCount = 0;
        const errors: string[] = [];

        try {
            const houses = await this.houseRepo.findByCompanyId(input.companyId);
            const activeHouses = houses.filter(h => h.status === 'ACTIVE');

            const billingTypes = await this.billingTypeRepo.findByCompanyId(input.companyId);
            const activeBillingType = billingTypes.length > 0 ? billingTypes[0] : null;

            if (!activeBillingType) {
                return { billsGeneratedCount: 0, errors: ['No active billing type found for the company'] };
            }

            for (const house of activeHouses) {
                try {
                    // Check if bill already exists for this period
                    const existingBills = await this.billRepo.findByHouseId(house.id);
                    const isAlreadyBilled = existingBills.some(b => b.billingPeriod === input.billingPeriod);

                    if (isAlreadyBilled) {
                        errors.push(`House ${house.id} already has a bill for period ${input.billingPeriod}`);
                        continue;
                    }

                    const activeDiscounts = await this.discountRepo.findByHouseId(house.id);

                    const calcResult = FeeCalculationService.calculateSingleBill(house, activeBillingType, activeDiscounts);

                    if (calcResult.isFailure) {
                        errors.push(`Failed to calculate fee for house ${house.id}: ${calcResult.getError().message}`);
                        continue;
                    }

                    const calcValues = calcResult.getValue();

                    const newBill = Bill.create(crypto.randomUUID(), {
                        houseId: house.id,
                        billingPeriod: input.billingPeriod,
                        currentVersionId: null,
                    }, {
                        versionId: crypto.randomUUID(),
                        versionProps: {
                            calculatedAmount: calcValues.calculatedAmount,
                            discountApplied: calcValues.discountApplied,
                            overriddenAmount: null,
                            createdBy: input.createdBy,
                            createdAt: new Date(),
                            reason: 'System Generated'
                        }
                    });

                    await this.billRepo.save(newBill);
                    billsGeneratedCount++;

                } catch (houseError: any) {
                    errors.push(`Unexpected error for house ${house.id}: ${houseError.message}`);
                }
            }

            return { billsGeneratedCount, errors };

        } catch (error: any) {
            errors.push(error.message || 'Unknown error occurred during batch process');
            return { billsGeneratedCount, errors };
        }
    }
}
