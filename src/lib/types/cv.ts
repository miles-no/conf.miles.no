import { z } from 'zod';

const cv = z.object({
    userid: z.string(),
    cvid: z.string(),
    bio: z.string()
});

export type Cv = z.infer<typeof cv>;