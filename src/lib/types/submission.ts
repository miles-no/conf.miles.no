import { z } from "zod";

const Keyword = z.string();

const Submission = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    //author
    submissionType: z.string(),
    description: z.string(),
    duration: z.number(),
    keywords: z.array(Keyword)
});

export type Submission = z.infer<typeof Submission>;