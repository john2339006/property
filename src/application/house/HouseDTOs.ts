import { z } from 'zod';

export const RegisterHouseDTO = z.object({
    companyId: z.string().uuid(),
    buildingNo: z.string().min(1),
    unitNo: z.string().min(1),
    levelNo: z.string().min(1),
    doorNo: z.string().min(1),
    areaSqm: z.number().positive('Area must be positive'),
});
export type RegisterHouseInput = z.infer<typeof RegisterHouseDTO>;

export const UpdateHouseSpecsDTO = z.object({
    buildingNo: z.string().min(1),
    unitNo: z.string().min(1),
    levelNo: z.string().min(1),
    doorNo: z.string().min(1),
    areaSqm: z.number().positive(),
});
export type UpdateHouseSpecsInput = z.infer<typeof UpdateHouseSpecsDTO>;

export const AssignOwnerDTO = z.object({
    ownerId: z.string().uuid(),
});
export type AssignOwnerInput = z.infer<typeof AssignOwnerDTO>;
