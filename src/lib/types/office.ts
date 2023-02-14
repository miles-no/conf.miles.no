import { z } from "zod";

const office = z.object({
    id: z.number(),
    name: z.string(),
    num_users: z.number()
});

export type Office = z.infer<typeof office>;