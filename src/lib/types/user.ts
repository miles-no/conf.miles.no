import { z } from 'zod';

const user = z.object({
    isAuthenticated: z.boolean(),
    id: z.string().optional(),
    email: z.string().email().optional(),
    name: z.string().optional(),
    profileImage: z.string().url().optional(),
    office: z.string().optional(),
    cvid: z.string().optional()
});

export type User = z.infer<typeof user>;