import { z } from 'zod';

export const CreateBillingTypeDTO = z.object({
    companyId: z.string().uuid(),
    name: z.string().min(1, 'Name is required'),
    feeModel: z.enum(['AREA', 'TIERED']),
    pricePerSqm: z.number().positive().nullable(),
    usageType: z.enum(['PERSONAL', 'BUSINESS', 'PUBLIC']),
});
export type CreateBillingTypeInput = z.infer<typeof CreateBillingTypeDTO>;

export const UpdateBillingTypeDTO = z.object({
    feeModel: z.enum(['AREA', 'TIERED']),
    pricePerSqm: z.number().positive().nullable(),
    usageType: z.enum(['PERSONAL', 'BUSINESS', 'PUBLIC']),
});
export type UpdateBillingTypeInput = z.infer<typeof UpdateBillingTypeDTO>;

export const CreateDiscountDTO = z.object({
    companyId: z.string().uuid(),
    houseId: z.string().uuid(),
    percentage: z.number().min(0.01).max(100),
    oneTime: z.boolean(),
});
export type CreateDiscountInput = z.infer<typeof CreateDiscountDTO>;
