import { z } from 'zod';

export const CreateCompanyDTO = z.object({
    legalName: z.string().min(1, 'Legal name is required'),
    registrationLicenseId: z.string().min(1, 'Registration license ID is required'),
    contactInformation: z.string().min(1, 'Contact information is required'),
    billingInformation: z.string().min(1, 'Billing information is required'),
    defaultBillingPeriod: z.enum(['MONTHLY', 'ANNUAL']),
    currency: z.string().length(3, 'Currency must be a 3-letter ISO code'),
});

export type CreateCompanyInput = z.infer<typeof CreateCompanyDTO>;

export const UpdateCompanyDTO = z.object({
    legalName: z.string().min(1).optional(),
    contactInformation: z.string().min(1).optional(),
    billingInformation: z.string().min(1).optional(),
    defaultBillingPeriod: z.enum(['MONTHLY', 'ANNUAL']).optional(),
});

export type UpdateCompanyInput = z.infer<typeof UpdateCompanyDTO>;
