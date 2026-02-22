import { describe, it, expect } from 'vitest';
import { Owner, EntityType } from '../Owner';
import { OwnerVersion } from '../OwnerVersion';

function makeOwner() {
    return Owner.create('owner-1', {
        companyId: 'company-1',
        entityType: 'INDIVIDUAL' as EntityType,
        currentVersionId: null,
    }, {
        versionId: 'v1',
        versionProps: {
            fullLegalName: '张三',
            idNumber: '110101199001010011',
            taxId: null,
            invoicingName: '张三',
            phone: '13800138000',
            email: 'zhang@example.com',
            mailingAddress: '北京市朝阳区',
            preferredContactMethod: 'phone',
            effectiveFrom: new Date('2024-01-01'),
        },
    });
}

describe('Owner', () => {
    it('should create an owner with initial version', () => {
        const owner = makeOwner();
        expect(owner.id).toBe('owner-1');
        expect(owner.companyId).toBe('company-1');
        expect(owner.entityType).toBe('INDIVIDUAL');
        expect(owner.versions).toHaveLength(1);
        expect(owner.currentVersion).toBeDefined();
        expect(owner.currentVersion!.fullLegalName).toBe('张三');
        expect(owner.currentVersion!.isLatest).toBe(true);
    });

    it('should add a new version superseding the current', () => {
        const owner = makeOwner();
        const v1 = owner.currentVersion!;

        owner.addVersion('v2', {
            fullLegalName: '张三(更新)',
            idNumber: '110101199001010011',
            taxId: 'TAX-001',
            invoicingName: '张三',
            phone: '13900139000',
            email: 'zhang_new@example.com',
            mailingAddress: '北京市海淀区',
            preferredContactMethod: 'email',
            effectiveFrom: new Date('2024-06-01'),
        });

        expect(owner.versions).toHaveLength(2);
        expect(owner.currentVersion!.id).toBe('v2');
        expect(owner.currentVersion!.fullLegalName).toBe('张三(更新)');
        expect(owner.currentVersion!.isLatest).toBe(true);

        // Old version should be superseded
        const oldVersion = owner.versions.find((v) => v.id === 'v1');
        expect(oldVersion!.isLatest).toBe(false);
        expect(oldVersion!.effectiveTo).toEqual(new Date('2024-06-01'));
    });

    it('should track version history (immutable record)', () => {
        const owner = makeOwner();

        owner.addVersion('v2', {
            fullLegalName: 'Version 2',
            idNumber: '110101199001010011',
            taxId: null,
            invoicingName: 'V2',
            phone: '13900139000',
            email: 'v2@example.com',
            mailingAddress: '地址2',
            preferredContactMethod: 'phone',
            effectiveFrom: new Date('2024-03-01'),
        });

        owner.addVersion('v3', {
            fullLegalName: 'Version 3',
            idNumber: '110101199001010011',
            taxId: 'TAX-002',
            invoicingName: 'V3',
            phone: '13900139001',
            email: 'v3@example.com',
            mailingAddress: '地址3',
            preferredContactMethod: 'email',
            effectiveFrom: new Date('2024-06-01'),
        });

        expect(owner.versions).toHaveLength(3);
        expect(owner.currentVersionId).toBe('v3');

        // All versions retained
        const latestVersions = owner.versions.filter((v) => v.isLatest);
        expect(latestVersions).toHaveLength(1);
        expect(latestVersions[0].id).toBe('v3');
    });

    it('should support identity equality', () => {
        const o1 = makeOwner();
        const o2 = Owner.create('owner-1', {
            companyId: 'company-2',
            entityType: 'ORGANIZATION',
            currentVersionId: null,
        });
        expect(o1.equals(o2)).toBe(true); // same ID = same entity
    });

    it('should reconstitute from persistence data', () => {
        const v1 = OwnerVersion.reconstitute('v1', {
            ownerId: 'owner-x',
            fullLegalName: 'Reconstituted',
            idNumber: '123',
            taxId: null,
            invoicingName: 'Recon',
            phone: '000',
            email: 'r@test.com',
            mailingAddress: 'addr',
            preferredContactMethod: 'phone',
            effectiveFrom: new Date('2023-01-01'),
            effectiveTo: null,
            isLatest: true,
        });

        const owner = Owner.reconstitute('owner-x', {
            companyId: 'c-1',
            entityType: 'INDIVIDUAL',
            currentVersionId: 'v1',
        }, [v1]);

        expect(owner.id).toBe('owner-x');
        expect(owner.versions).toHaveLength(1);
        expect(owner.currentVersion!.fullLegalName).toBe('Reconstituted');
    });
});
