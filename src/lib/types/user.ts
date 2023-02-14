import { z } from 'zod';

const user = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    profileImage: z.string().url(),
    office: z.string(),
    cvid: z.string()
});

export type User = z.infer<typeof user>;