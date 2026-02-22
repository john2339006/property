import { IBillRepository, Bill, BillVersion } from '@/domain/billing';
import { PrismaClient } from '@prisma/client';

export class PrismaBillRepository implements IBillRepository {
    constructor(private readonly prisma: PrismaClient) { }

    private mapToDomain(model: any): Bill {
        const versions = model.versions.map((v: any) =>
            BillVersion.reconstitute(v.id, {
                billId: v.bill_id,
                calculatedAmount: v.calculated_amount,
                discountApplied: v.discount_applied,
                overriddenAmount: v.overridden_amount,
                createdBy: v.created_by,
                createdAt: v.created_at,
                reason: v.reason,
                isLatest: v.is_latest
            })
        );
        return Bill.reconstitute(model.id, {
            houseId: model.house_id,
            billingPeriod: model.billing_period,
            currentVersionId: model.current_version_id
        }, versions);
    }

    async findById(id: string): Promise<Bill | null> {
        const model = await this.prisma.bill.findUnique({
            where: { id },
            include: { versions: true }
        });
        if (!model) return null;
        return this.mapToDomain(model);
    }

    async findByHouseId(houseId: string): Promise<Bill[]> {
        const models = await this.prisma.bill.findMany({
            where: { house_id: houseId },
            include: { versions: true }
        });
        return models.map(m => this.mapToDomain(m));
    }

    async findByPeriod(companyId: string, billingPeriod: string): Promise<Bill[]> {
        const models = await this.prisma.bill.findMany({
            where: {
                billing_period: billingPeriod,
                house: {
                    company_id: companyId
                }
            },
            include: { versions: true }
        });
        return models.map(m => this.mapToDomain(m));
    }

    async save(bill: Bill): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            const data = {
                id: bill.id,
                house_id: bill.houseId,
                billing_period: bill.billingPeriod,
                current_version_id: bill.currentVersionId,
            };

            await tx.bill.upsert({
                where: { id: bill.id },
                create: data,
                update: data
            });

            for (const version of bill.versions) {
                const versionData = {
                    id: version.id,
                    bill_id: version.billId,
                    calculated_amount: version.calculatedAmount,
                    discount_applied: version.discountApplied,
                    overridden_amount: version.overriddenAmount,
                    created_by: version.createdBy,
                    created_at: version.createdAt,
                    reason: version.reason,
                    is_latest: version.isLatest
                };

                await tx.billVersion.upsert({
                    where: { id: version.id },
                    create: versionData,
                    update: versionData
                });
            }

            // Unset is_latest for old versions if doing updates (handled efficiently by upsert, but just explicitly setting here if needed).
            // Actually the Domain Model emits the current states. We just sync the db.
            // Since we upsert all versions, the domain logic ensures only one has isLatest = true.
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            await tx.billVersion.deleteMany({ where: { bill_id: id } });
            await tx.bill.delete({ where: { id } });
        });
    }
}
