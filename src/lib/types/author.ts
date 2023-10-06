import { z } from "zod";

const Author = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    bio: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    email: z.string().email(),
    image: z.string().url().optional()
});

export type Author = z.infer<typeof Author>;
