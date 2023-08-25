import { z } from 'zod';

const cvPartnerSearchParams = z.object({
  from: z.number().optional(),
  size: z.number().optional(),
  sort_by: z.enum(["name", "email", "role", "country", "office", "external_unique_id"]).optional(),
  role: z.string().optional(),
  name: z.string().optional(),
  office_ids: z.array(z.number()).optional()
});

export type CvPartnerSearchParams = z.infer<typeof cvPartnerSearchParams>;