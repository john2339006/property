import { describe, it, expect } from 'vitest';
import { RegisterHouseDTO, UpdateHouseSpecsDTO, AssignOwnerDTO } from '../HouseDTOs';

describe('RegisterHouseDTO', () => {
    const valid = {
        companyId: '550e8400-e29b-41d4-a716-446655440000',
        buildingNo: 'A', unitNo: '101', levelNo: '1', doorNo: '101', areaSqm: 85.5,
    };

    it('should validate correct input', () => {
        expect(RegisterHouseDTO.safeParse(valid).success).toBe(true);
    });

    it('should reject negative area', () => {
        expect(RegisterHouseDTO.safeParse({ ...valid, areaSqm: -10 }).success).toBe(false);
    });

    it('should reject missing fields', () => {
        expect(RegisterHouseDTO.safeParse({}).success).toBe(false);
    });
});

describe('UpdateHouseSpecsDTO', () => {
    it('should validate correct input', () => {
        expect(UpdateHouseSpecsDTO.safeParse({
            buildingNo: 'B', unitNo: '202', levelNo: '2', doorNo: '202', areaSqm: 100,
        }).success).toBe(true);
    });
});

describe('AssignOwnerDTO', () => {
    it('should validate UUID ownerId', () => {
        expect(AssignOwnerDTO.safeParse({ ownerId: '550e8400-e29b-41d4-a716-446655440000' }).success).toBe(true);
    });
    it('should reject non-UUID', () => {
        expect(AssignOwnerDTO.safeParse({ ownerId: 'not-uuid' }).success).toBe(false);
    });
});
