import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string(),
	profileImage: z.string().url(),
	office: z.string(),
	officeId: z.string(),
	cvId: z.string(),
	isAuthenticated: z.boolean(),
	title: z.string()
});

export type User = z.infer<typeof userSchema>;
