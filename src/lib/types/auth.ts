import { z } from "zod";

const auth = z.object({
    isAuthenticated: z.boolean(),
    id: z.string(),
    name: z.string(),
    profileImage: z.string().url(),
    cvpartnerUserId: z.string(),
    cvpartnerOfficeId: z.string(),
    access_token: z.string(),
    expires_in: z.number(),
    refresh_token: z.string(),
    scope: z.string(),// Possible array of string?
    token_type: z.string(),
    id_token: z.string()
});

export type Auth = z.infer<typeof auth>;