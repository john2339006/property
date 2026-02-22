import { expect, test, describe } from 'vitest';
import { FeeCalculationService } from '../FeeCalculationService';
import { House } from '@/domain/house/House';
import { BillingType } from '../BillingType';
import { Discount } from '../Discount';

describe('FeeCalculationService', () => {
    test('calculates area-based fee without discounts', () => {
        // Arrange
        const house = House.create('h1', {
            companyId: 'comp1',
            status: 'ACTIVE',
            managementStartDate: new Date(),
            managementEndDate: null,
            currentVersionId: null,
        }, {
            versionId: 'hv1',
            versionProps: {
                buildingNo: 'A',
                unitNo: '1',
                levelNo: '1',
                doorNo: '101',
                areaSqm: 100, // 100 sqm
                effectiveFrom: new Date(),
            }
        });

        const billingType = BillingType.create('bt1', {
            companyId: 'comp1',
            name: 'Property Management Fee',
            currentVersionId: null,
        }, {
            versionId: 'btv1',
            versionProps: {
                feeModel: 'AREA',
                pricePerSqm: 5, // $5 per sqm
                usageType: 'PERSONAL',
                effectiveFrom: new Date(),
            }
        });

        // Act
        const result = FeeCalculationService.calculateSingleBill(house, billingType, []);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().calculatedAmount).toBe(500); // 100 sqm * $5
        expect(result.getValue().discountApplied).toBe(0);
        expect(result.getValue().finalAmount).toBe(500);
    });

    test('calculates area-based fee with discounts', () => {
        // Arrange
        const house = House.create('h1', {
            companyId: 'comp1',
            status: 'ACTIVE',
            managementStartDate: new Date(),
            managementEndDate: null,
            currentVersionId: null,
        }, {
            versionId: 'hv1',
            versionProps: {
                buildingNo: 'A',
                unitNo: '1',
                levelNo: '1',
                doorNo: '101',
                areaSqm: 100,
                effectiveFrom: new Date(),
            }
        });

        const billingType = BillingType.create('bt1', {
            companyId: 'comp1',
            name: 'Property Management Fee',
            currentVersionId: null,
        }, {
            versionId: 'btv1',
            versionProps: {
                feeModel: 'AREA',
                pricePerSqm: 5,
                usageType: 'PERSONAL',
                effectiveFrom: new Date(),
            }
        });

        const discount1 = Discount.create('d1', {
            companyId: 'comp1',
            houseId: 'h1',
            percentage: 10, // 10%
            oneTime: false,
            createdAt: new Date(),
        });

        const discount2 = Discount.create('d2', {
            companyId: 'comp1',
            houseId: 'h1',
            percentage: 5, // 5%
            oneTime: true,
            createdAt: new Date(),
        });

        // Act
        const result = FeeCalculationService.calculateSingleBill(house, billingType, [discount1, discount2]);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().calculatedAmount).toBe(500);
        expect(result.getValue().discountApplied).toBe(75); // 15% of 500
        expect(result.getValue().finalAmount).toBe(425);
    });

    test('fails if AREA fee model lacks pricePerSqm', () => {
        const house = House.create('h1', {
            companyId: 'comp1',
            status: 'ACTIVE',
            managementStartDate: new Date(),
            managementEndDate: null,
            currentVersionId: null,
        }, {
            versionId: 'hv1',
            versionProps: {
                buildingNo: 'A',
                unitNo: '1',
                levelNo: '1',
                doorNo: '101',
                areaSqm: 100,
                effectiveFrom: new Date(),
            }
        });

        const billingType = BillingType.create('bt1', {
            companyId: 'comp1',
            name: 'Broken Fee',
            currentVersionId: null,
        }, {
            versionId: 'btv1',
            versionProps: {
                feeModel: 'AREA',
                pricePerSqm: null,
                usageType: 'PERSONAL',
                effectiveFrom: new Date(),
            }
        });

        const result = FeeCalculationService.calculateSingleBill(house, billingType, []);

        expect(result.isFailure).toBe(true);
        expect(result.getError().message).toBe('Billing type uses AREA fee model but lacks pricePerSqm');
    });
});
