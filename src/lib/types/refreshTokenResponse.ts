import { z } from "zod";

const refreshTokenSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    scope: z.string(),
    token_type: z.string(),
    id_token: z.string()
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenSchema>;