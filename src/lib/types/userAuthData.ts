import { z } from "zod";
import { userSchema } from "./user";

const userAuthSchema = z.object({
    user: userSchema,
    token: z.object({
        access_token: z.string(),
        refresh_token: z.string(),
        scope: z.string(),
        token_type: z.string(),
        expire_timestamp: z.number()
    })
});

export type UserAuthData = z.infer<typeof userAuthSchema>;