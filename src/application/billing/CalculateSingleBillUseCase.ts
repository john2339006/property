import { IHouseRepository } from '@/domain/house/IHouseRepository';
import { IBillingTypeRepository, IDiscountRepository } from '@/domain/billing';
import { FeeCalculationService } from '@/domain/billing/FeeCalculationService';
import { CalculateSingleBillInput, CalculateSingleBillOutput } from './BillGenerationDTOs';

export class CalculateSingleBillUseCase {
    constructor(
        private readonly houseRepo: IHouseRepository,
        private readonly billingTypeRepo: IBillingTypeRepository,
        private readonly discountRepo: IDiscountRepository,
    ) { }

    async execute(input: CalculateSingleBillInput): Promise<CalculateSingleBillOutput> {
        try {
            const house = await this.houseRepo.findById(input.houseId);
            if (!house) {
                return { isSuccess: false, calculatedAmount: 0, discountApplied: 0, finalAmount: 0, error: 'House not found' };
            }

            if (house.status !== 'ACTIVE') {
                return { isSuccess: false, calculatedAmount: 0, discountApplied: 0, finalAmount: 0, error: 'House is not active' };
            }

            const billingTypes = await this.billingTypeRepo.findByCompanyId(house.companyId);
            const activeBillingType = billingTypes.length > 0 ? billingTypes[0] : null; // Typically there is one active default or specific to house.

            if (!activeBillingType) {
                return { isSuccess: false, calculatedAmount: 0, discountApplied: 0, finalAmount: 0, error: 'No active billing type found for the company' };
            }

            const activeDiscounts = await this.discountRepo.findByHouseId(input.houseId);

            const calcResult = FeeCalculationService.calculateSingleBill(house, activeBillingType, activeDiscounts);

            if (calcResult.isFailure) {
                return { isSuccess: false, calculatedAmount: 0, discountApplied: 0, finalAmount: 0, error: calcResult.getError().message };
            }

            const calcValues = calcResult.getValue();

            return {
                isSuccess: true,
                calculatedAmount: calcValues.calculatedAmount,
                discountApplied: calcValues.discountApplied,
                finalAmount: calcValues.finalAmount,
            };

        } catch (error: any) {
            return { isSuccess: false, calculatedAmount: 0, discountApplied: 0, finalAmount: 0, error: error.message || 'Unknown error occurred' };
        }
    }
}
