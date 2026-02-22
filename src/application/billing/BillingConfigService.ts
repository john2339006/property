import { BillingType, IBillingTypeRepository, FeeModel, UsageType, Discount, IDiscountRepository } from '@/domain/billing';
import { CreateBillingTypeInput, UpdateBillingTypeInput, CreateDiscountInput } from './BillingDTOs';

export class BillingConfigService {
    constructor(
        private readonly billingTypeRepo: IBillingTypeRepository,
        private readonly discountRepo: IDiscountRepository,
    ) { }

    async createBillingType(input: CreateBillingTypeInput): Promise<BillingType> {
        const bt = BillingType.create(crypto.randomUUID(), {
            companyId: input.companyId,
            name: input.name,
            currentVersionId: null,
        }, {
            versionId: crypto.randomUUID(),
            versionProps: {
                feeModel: input.feeModel as FeeModel,
                pricePerSqm: input.pricePerSqm,
                usageType: input.usageType as UsageType,
                effectiveFrom: new Date(),
            },
        });
        await this.billingTypeRepo.save(bt);
        return bt;
    }

    async getBillingType(id: string): Promise<BillingType | null> {
        return this.billingTypeRepo.findById(id);
    }

    async getBillingTypesByCompany(companyId: string): Promise<BillingType[]> {
        return this.billingTypeRepo.findByCompanyId(companyId);
    }

    async updateBillingType(id: string, input: UpdateBillingTypeInput): Promise<BillingType | null> {
        const bt = await this.billingTypeRepo.findById(id);
        if (!bt) return null;
        bt.addVersion(crypto.randomUUID(), {
            feeModel: input.feeModel as FeeModel,
            pricePerSqm: input.pricePerSqm,
            usageType: input.usageType as UsageType,
            effectiveFrom: new Date(),
        });
        await this.billingTypeRepo.save(bt);
        return bt;
    }

    async deleteBillingType(id: string): Promise<void> {
        await this.billingTypeRepo.delete(id);
    }

    async createDiscount(input: CreateDiscountInput): Promise<Discount> {
        const discount = Discount.create(crypto.randomUUID(), {
            companyId: input.companyId,
            houseId: input.houseId,
            percentage: input.percentage,
            oneTime: input.oneTime,
            createdAt: new Date(),
        });
        await this.discountRepo.save(discount);
        return discount;
    }

    async getDiscountsByHouse(houseId: string): Promise<Discount[]> {
        return this.discountRepo.findByHouseId(houseId);
    }

    async deleteDiscount(id: string): Promise<void> {
        await this.discountRepo.delete(id);
    }
}
