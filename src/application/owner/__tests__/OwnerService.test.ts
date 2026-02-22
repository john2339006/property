import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OwnerService } from '../OwnerService';
import { Owner, IOwnerRepository, OwnerVersion } from '@/domain/owner';

function createMockRepo(): IOwnerRepository {
    const store = new Map<string, Owner>();
    return {
        findById: vi.fn(async (id: string) => store.get(id) ?? null),
        findByCompanyId: vi.fn(async (companyId: string) =>
            Array.from(store.values()).filter((o) => o.companyId === companyId)
        ),
        save: vi.fn(async (owner: Owner) => {
            store.set(owner.id, owner);
        }),
        delete: vi.fn(async (id: string) => {
            store.delete(id);
        }),
    };
}

const validInput = {
    companyId: '550e8400-e29b-41d4-a716-446655440000',
    entityType: 'INDIVIDUAL' as const,
    fullLegalName: '张三',
    idNumber: '110101199001010011',
    taxId: null,
    invoicingName: '张三',
    phone: '13800138000',
    email: 'zhang@example.com',
    mailingAddress: '北京市朝阳区',
    preferredContactMethod: 'phone',
};

describe('OwnerService', () => {
    let service: OwnerService;
    let repo: IOwnerRepository;

    beforeEach(() => {
        repo = createMockRepo();
        service = new OwnerService(repo);
    });

    it('should create an owner with initial version', async () => {
        const owner = await service.createOwner(validInput);
        expect(owner).toBeDefined();
        expect(owner.entityType).toBe('INDIVIDUAL');
        expect(owner.versions).toHaveLength(1);
        expect(owner.currentVersion!.fullLegalName).toBe('张三');
        expect(repo.save).toHaveBeenCalledOnce();
    });

    it('should get an owner by id', async () => {
        const created = await service.createOwner(validInput);
        const found = await service.getOwner(created.id);
        expect(found).not.toBeNull();
        expect(found!.id).toBe(created.id);
    });

    it('should return null for unknown id', async () => {
        const found = await service.getOwner('non-existent');
        expect(found).toBeNull();
    });

    it('should list owners by company', async () => {
        await service.createOwner(validInput);
        await service.createOwner({ ...validInput, fullLegalName: '李四', idNumber: '220202199002020022', email: 'li@test.com' });
        const owners = await service.getOwnersByCompany(validInput.companyId);
        expect(owners).toHaveLength(2);
    });

    it('should update owner (creates new version)', async () => {
        const owner = await service.createOwner(validInput);
        const updated = await service.updateOwner(owner.id, {
            fullLegalName: '张三(更新)',
            idNumber: '110101199001010011',
            invoicingName: '张三更新',
            phone: '13900139000',
            email: 'zhang_new@example.com',
            mailingAddress: '北京市海淀区',
            preferredContactMethod: 'email',
        });
        expect(updated).not.toBeNull();
        expect(updated!.versions).toHaveLength(2);
        expect(updated!.currentVersion!.fullLegalName).toBe('张三(更新)');
    });

    it('should retain version history after update', async () => {
        const owner = await service.createOwner(validInput);
        await service.updateOwner(owner.id, {
            fullLegalName: 'V2',
            idNumber: '123',
            invoicingName: 'V2',
            phone: '000',
            email: 'v2@test.com',
            mailingAddress: 'addr',
            preferredContactMethod: 'phone',
        });
        const history = await service.getOwnerHistory(owner.id);
        expect(history).not.toBeNull();
        expect(history!.versions).toHaveLength(2);
        const superseded = history!.versions.find((v) => !v.isLatest);
        expect(superseded).toBeDefined();
        expect(superseded!.effectiveTo).toBeDefined();
    });

    it('should return null when updating non-existent owner', async () => {
        const result = await service.updateOwner('no-id', {
            fullLegalName: 'X',
            idNumber: '1',
            invoicingName: 'X',
            phone: '0',
            email: 'x@test.com',
            mailingAddress: 'a',
            preferredContactMethod: 'phone',
        });
        expect(result).toBeNull();
    });

    it('should delete an owner', async () => {
        const owner = await service.createOwner(validInput);
        await service.deleteOwner(owner.id);
        expect(repo.delete).toHaveBeenCalledWith(owner.id);
    });
});
