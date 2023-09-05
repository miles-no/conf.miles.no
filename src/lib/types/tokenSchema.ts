import { z } from "zod";

const tokenResponse = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    token_type: z.string(),
    scope: z.string(),
    refresh_token: z.string(),
    id_token: z.string()
});

export type TokenResponse = z.infer<typeof tokenResponse>;