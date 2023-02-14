import { z } from "zod";

const visibleTo = z.string();

const conference = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    //performances
    internal: z.boolean(),
    visibleTo: z.array(visibleTo),
    image: z.string().url(),
    url: z.string().url(),
    // itinerary
});

export type Conference = z.infer<typeof conference>;