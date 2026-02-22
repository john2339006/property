import { Owner, EntityType, IOwnerRepository } from '@/domain/owner';
import { CreateOwnerInput, UpdateOwnerInput } from './OwnerDTOs';

export class OwnerService {
    constructor(private readonly ownerRepo: IOwnerRepository) { }

    async createOwner(input: CreateOwnerInput): Promise<Owner> {
        const owner = Owner.create(
            crypto.randomUUID(),
            {
                companyId: input.companyId,
                entityType: input.entityType as EntityType,
                currentVersionId: null,
            },
            {
                versionId: crypto.randomUUID(),
                versionProps: {
                    fullLegalName: input.fullLegalName,
                    idNumber: input.idNumber,
                    taxId: input.taxId ?? null,
                    invoicingName: input.invoicingName,
                    phone: input.phone,
                    email: input.email,
                    mailingAddress: input.mailingAddress,
                    preferredContactMethod: input.preferredContactMethod,
                    effectiveFrom: new Date(),
                },
            }
        );
        await this.ownerRepo.save(owner);
        return owner;
    }

    async getOwner(id: string): Promise<Owner | null> {
        return this.ownerRepo.findById(id);
    }

    async getOwnersByCompany(companyId: string): Promise<Owner[]> {
        return this.ownerRepo.findByCompanyId(companyId);
    }

    /**
     * Update creates a NEW version (immutability pattern).
     * The old version is superseded, maintaining full history.
     */
    async updateOwner(id: string, input: UpdateOwnerInput): Promise<Owner | null> {
        const owner = await this.ownerRepo.findById(id);
        if (!owner) return null;

        owner.addVersion(crypto.randomUUID(), {
            fullLegalName: input.fullLegalName,
            idNumber: input.idNumber,
            taxId: input.taxId ?? null,
            invoicingName: input.invoicingName,
            phone: input.phone,
            email: input.email,
            mailingAddress: input.mailingAddress,
            preferredContactMethod: input.preferredContactMethod,
            effectiveFrom: new Date(),
        });

        await this.ownerRepo.save(owner);
        return owner;
    }

    async getOwnerHistory(id: string): Promise<Owner | null> {
        return this.ownerRepo.findById(id); // Already includes all versions
    }

    async deleteOwner(id: string): Promise<void> {
        await this.ownerRepo.delete(id);
    }
}
