import { z } from 'zod';

export const CreateOwnerDTO = z.object({
    companyId: z.string().uuid(),
    entityType: z.enum(['INDIVIDUAL', 'ORGANIZATION']),
    fullLegalName: z.string().min(1, 'Legal name is required'),
    idNumber: z.string().min(1, 'ID number is required'),
    taxId: z.string().nullable().optional(),
    invoicingName: z.string().min(1, 'Invoicing name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email(),
    mailingAddress: z.string().min(1, 'Mailing address is required'),
    preferredContactMethod: z.string().min(1),
});

export type CreateOwnerInput = z.infer<typeof CreateOwnerDTO>;

export const UpdateOwnerDTO = z.object({
    fullLegalName: z.string().min(1),
    idNumber: z.string().min(1),
    taxId: z.string().nullable().optional(),
    invoicingName: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    mailingAddress: z.string().min(1),
    preferredContactMethod: z.string().min(1),
});

export type UpdateOwnerInput = z.infer<typeof UpdateOwnerDTO>;
