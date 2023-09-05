import { z } from "zod";

const userProfileSchema = z.object({
    id: z.string(),
    email: z.string(),
    verified_email: z.boolean(),
    name: z.string(),
    given_name: z.string(),
    family_name: z.string(),
    picture: z.string(),
    locale: z.string(),
    hd: z.string()
});

export type UserProfileResponse = z.infer<typeof userProfileSchema>;