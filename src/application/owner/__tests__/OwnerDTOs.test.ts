import { describe, it, expect } from 'vitest';
import { CreateOwnerDTO, UpdateOwnerDTO } from '../OwnerDTOs';

describe('CreateOwnerDTO', () => {
    const valid = {
        companyId: '550e8400-e29b-41d4-a716-446655440000',
        entityType: 'INDIVIDUAL',
        fullLegalName: '张三',
        idNumber: '110101199001010011',
        invoicingName: '张三',
        phone: '13800138000',
        email: 'zhang@example.com',
        mailingAddress: '北京市朝阳区',
        preferredContactMethod: 'phone',
    };

    it('should validate correct input', () => {
        expect(CreateOwnerDTO.safeParse(valid).success).toBe(true);
    });

    it('should accept optional taxId', () => {
        expect(CreateOwnerDTO.safeParse({ ...valid, taxId: 'TAX-001' }).success).toBe(true);
        expect(CreateOwnerDTO.safeParse({ ...valid, taxId: null }).success).toBe(true);
    });

    it('should reject invalid entity type', () => {
        expect(CreateOwnerDTO.safeParse({ ...valid, entityType: 'COMPANY' }).success).toBe(false);
    });

    it('should reject invalid email', () => {
        expect(CreateOwnerDTO.safeParse({ ...valid, email: 'not-email' }).success).toBe(false);
    });

    it('should reject missing required fields', () => {
        expect(CreateOwnerDTO.safeParse({}).success).toBe(false);
    });
});

describe('UpdateOwnerDTO', () => {
    const valid = {
        fullLegalName: '张三(更新)',
        idNumber: '110101199001010011',
        invoicingName: '张三',
        phone: '13900139000',
        email: 'new@example.com',
        mailingAddress: '北京市海淀区',
        preferredContactMethod: 'email',
    };

    it('should validate correct input', () => {
        expect(UpdateOwnerDTO.safeParse(valid).success).toBe(true);
    });

    it('should reject missing required fields', () => {
        expect(UpdateOwnerDTO.safeParse({ fullLegalName: 'X' }).success).toBe(false);
    });
});
