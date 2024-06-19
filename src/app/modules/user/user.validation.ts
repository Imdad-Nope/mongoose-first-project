import { z } from "zod";

const userValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20, {message: 'Password cannot be more than 20 characters'}),
    needsPasswordChange: z.boolean().default(true).optional(),
    role: z.enum(['student', 'admin', 'faculty']),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted: z.boolean().default(false).optional()
});

export const userValidation = {
    userValidationSchema
}