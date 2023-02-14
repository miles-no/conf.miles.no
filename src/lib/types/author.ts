import { z } from "zod";

const Author = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    bio: z.string(),
    twitter: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    linkedin: z.string(),
    email: z.string().email(),
    image: z.string().url()
});

export type Author = z.infer<typeof Author>;