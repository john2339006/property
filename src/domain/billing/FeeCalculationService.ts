import { House } from '@/domain/house/House';
import { BillingType } from './BillingType';
import { Discount } from './Discount';
import { Result } from '@/domain/shared/Result';
import { DomainError } from '@/domain/shared/DomainError';

export interface FeeCalculationResult {
    calculatedAmount: number;
    discountApplied: number;
    finalAmount: number;
}

export class FeeCalculationService {
    /**
     * Calculates the bill amount for a given house, applying a billing type and any active discounts.
     */
    static calculateSingleBill(
        house: House,
        billingType: BillingType,
        activeDiscounts: Discount[]
    ): Result<FeeCalculationResult> {
        const latestHouseVersion = house.currentVersion;
        if (!latestHouseVersion) {
            return Result.fail(new DomainError('House has no active version'));
        }

        const latestBillingVersion = billingType.currentVersion;
        if (!latestBillingVersion) {
            return Result.fail(new DomainError('Billing type has no active version'));
        }

        let calculatedAmount = 0;

        if (latestBillingVersion.feeModel === 'AREA') {
            const pricePerSqm = latestBillingVersion.pricePerSqm;
            if (pricePerSqm === null || pricePerSqm === undefined) {
                return Result.fail(new DomainError('Billing type uses AREA fee model but lacks pricePerSqm'));
            }
            calculatedAmount = latestHouseVersion.areaSqm * pricePerSqm;
        } else if (latestBillingVersion.feeModel === 'TIERED') {
            // Placeholder: TIERED is more complex. Currently we just fail since it's not implemented yet.
            return Result.fail(new DomainError('TIERED fee calculation is not yet implemented'));
        }

        let discountApplied = 0;

        // Apply all applicable discounts
        for (const discount of activeDiscounts) {
            // In a real scenario, we might have rules on how multiple percentage discounts compound
            // For now, let's treat it as a straight percentage of the base calculate amount.
            // Example: 10% discount = calculatedAmount * 0.1
            const discountAmount = calculatedAmount * (discount.percentage / 100);
            discountApplied += discountAmount;
        }

        // Make sure discount doesn't exceed the total amount
        if (discountApplied > calculatedAmount) {
            discountApplied = calculatedAmount;
        }

        return Result.ok({
            calculatedAmount,
            discountApplied,
            finalAmount: calculatedAmount - discountApplied
        });
    }
}
