import { IBillingTypeRepository, IDiscountRepository, BillingType, Discount, BillingTypeVersion } from '@/domain/billing';
import { PrismaClient } from '@prisma/client';

export class PrismaBillingTypeRepository implements IBillingTypeRepository {
    constructor(private readonly prisma: PrismaClient) { }

    private mapToDomain(model: any): BillingType {
        const versions = model.versions.map((v: any) =>
            BillingTypeVersion.reconstitute(v.id, {
                billingTypeId: v.billing_type_id,
                feeModel: v.fee_model,
                pricePerSqm: v.price_per_sqm,
                usageType: v.usage_type,
                effectiveFrom: v.effective_from,
                effectiveTo: v.effective_to,
                isLatest: v.is_latest
            })
        );
        return BillingType.reconstitute(model.id, {
            companyId: model.company_id,
            name: model.name,
            currentVersionId: model.current_version_id
        }, versions);
    }

    async findById(id: string): Promise<BillingType | null> {
        const model = await this.prisma.billingType.findUnique({
            where: { id },
            include: { versions: true }
        });
        if (!model) return null;
        return this.mapToDomain(model);
    }

    async findByCompanyId(companyId: string): Promise<BillingType[]> {
        const models = await this.prisma.billingType.findMany({
            where: { company_id: companyId },
            include: { versions: true }
        });
        return models.map(m => this.mapToDomain(m));
    }

    async save(billingType: BillingType): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            const data = {
                id: billingType.id,
                company_id: billingType.companyId,
                name: billingType.name,
                current_version_id: billingType.currentVersionId,
            };

            await tx.billingType.upsert({
                where: { id: billingType.id },
                create: data,
                update: data
            });

            for (const version of billingType.versions) {
                const versionData = {
                    id: version.id,
                    billing_type_id: version.billingTypeId,
                    fee_model: version.feeModel,
                    price_per_sqm: version.pricePerSqm,
                    usage_type: version.usageType,
                    effective_from: version.effectiveFrom,
                    effective_to: version.effectiveTo,
                    is_latest: version.isLatest
                };

                await tx.billingTypeVersion.upsert({
                    where: { id: version.id },
                    create: versionData,
                    update: versionData
                });
            }
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            await tx.billingTypeVersion.deleteMany({ where: { billing_type_id: id } });
            await tx.billingType.delete({ where: { id } });
        });
    }
}

export class PrismaDiscountRepository implements IDiscountRepository {
    constructor(private readonly prisma: PrismaClient) { }

    private mapToDomain(model: any): Discount {
        return Discount.reconstitute(model.id, {
            companyId: model.company_id,
            houseId: model.house_id,
            percentage: model.percentage,
            oneTime: model.one_time,
            createdAt: model.created_at
        });
    }

    async findById(id: string): Promise<Discount | null> {
        const model = await this.prisma.discount.findUnique({ where: { id } });
        if (!model) return null;
        return this.mapToDomain(model);
    }

    async findByHouseId(houseId: string): Promise<Discount[]> {
        const models = await this.prisma.discount.findMany({ where: { house_id: houseId } });
        return models.map(m => this.mapToDomain(m));
    }

    async findByCompanyId(companyId: string): Promise<Discount[]> {
        const models = await this.prisma.discount.findMany({ where: { company_id: companyId } });
        return models.map(m => this.mapToDomain(m));
    }

    async save(discount: Discount): Promise<void> {
        const data = {
            id: discount.id,
            company_id: discount.companyId,
            house_id: discount.houseId,
            percentage: discount.percentage,
            one_time: discount.oneTime,
            created_at: discount.createdAt
        };

        await this.prisma.discount.upsert({
            where: { id: discount.id },
            create: data,
            update: data
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.discount.delete({ where: { id } });
    }
}
