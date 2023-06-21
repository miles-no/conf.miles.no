import { z } from "zod";

const auth = z.object({
    isAuthenticated: z.boolean(),
    id: z.string().optional(),
    name: z.string().optional(),
    profileImage: z.string().url().optional(),
    cvpartnerUserId: z.string().optional(),
    cvpartnerOfficeId: z.string().optional(),
    access_token: z.string().optional(),
    expires_in: z.number().optional(),
    refresh_token: z.string().optional(),
    scope: z.string().optional(),// Possible array of string?
    token_type: z.string().optional(),
    id_token: z.string().optional()
});

export type Auth = z.infer<typeof auth>;