import { z } from 'zod';

const UserRoleEnum = z.enum(['PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE', 'OPERATOR', 'READ_ONLY']);

export const CreateUserDTO = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: UserRoleEnum,
    companyId: z.string().uuid('Invalid company ID'),
});

export type CreateUserInput = z.infer<typeof CreateUserDTO>;

export const UpdateUserDTO = z.object({
    email: z.string().email().optional(),
    role: UserRoleEnum.optional(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserDTO>;
