import { prisma } from '@/infrastructure/database/prisma';
import { Owner, EntityType, OwnerVersion, IOwnerRepository } from '@/domain/owner';

export class PrismaOwnerRepository implements IOwnerRepository {
    async findById(id: string): Promise<Owner | null> {
        const data = await prisma.owner.findUnique({
            where: { id },
            include: { versions: { orderBy: { effective_from: 'asc' } } },
        });
        if (!data) return null;
        return this.toDomain(data);
    }

    async findByCompanyId(companyId: string): Promise<Owner[]> {
        const records = await prisma.owner.findMany({
            where: { company_id: companyId },
            include: { versions: { orderBy: { effective_from: 'asc' } } },
        });
        return records.map((data) => this.toDomain(data));
    }

    async save(owner: Owner): Promise<void> {
        await prisma.$transaction(async (tx) => {
            await tx.owner.upsert({
                where: { id: owner.id },
                update: {
                    entity_type: owner.entityType,
                    current_version_id: owner.currentVersionId,
                },
                create: {
                    id: owner.id,
                    company_id: owner.companyId,
                    entity_type: owner.entityType,
                    current_version_id: owner.currentVersionId,
                },
            });

            for (const version of owner.versions) {
                await tx.ownerVersion.upsert({
                    where: { id: version.id },
                    update: {
                        is_latest: version.isLatest,
                        effective_to: version.effectiveTo,
                    },
                    create: {
                        id: version.id,
                        owner_id: version.ownerId,
                        full_legal_name: version.fullLegalName,
                        id_number: version.idNumber,
                        tax_id: version.taxId,
                        invoicing_name: version.invoicingName,
                        phone: version.phone,
                        email: version.email,
                        mailing_address: version.mailingAddress,
                        preferred_contact_method: version.preferredContactMethod,
                        effective_from: version.effectiveFrom,
                        effective_to: version.effectiveTo,
                        is_latest: version.isLatest,
                    },
                });
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.$transaction(async (tx) => {
            await tx.ownerVersion.deleteMany({ where: { owner_id: id } });
            await tx.owner.delete({ where: { id } });
        });
    }

    private toDomain(data: {
        id: string;
        company_id: string;
        entity_type: string;
        current_version_id: string | null;
        versions: Array<{
            id: string;
            owner_id: string;
            full_legal_name: string;
            id_number: string;
            tax_id: string | null;
            invoicing_name: string;
            phone: string;
            email: string;
            mailing_address: string;
            preferred_contact_method: string;
            effective_from: Date;
            effective_to: Date | null;
            is_latest: boolean;
        }>;
    }): Owner {
        const versions = data.versions.map((v) =>
            OwnerVersion.reconstitute(v.id, {
                ownerId: v.owner_id,
                fullLegalName: v.full_legal_name,
                idNumber: v.id_number,
                taxId: v.tax_id,
                invoicingName: v.invoicing_name,
                phone: v.phone,
                email: v.email,
                mailingAddress: v.mailing_address,
                preferredContactMethod: v.preferred_contact_method,
                effectiveFrom: v.effective_from,
                effectiveTo: v.effective_to,
                isLatest: v.is_latest,
            })
        );

        return Owner.reconstitute(data.id, {
            companyId: data.company_id,
            entityType: data.entity_type as EntityType,
            currentVersionId: data.current_version_id,
        }, versions);
    }
}
