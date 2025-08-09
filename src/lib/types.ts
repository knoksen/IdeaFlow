import { type z } from 'zod';
import { type ideaSchema, type categories, type statuses } from '@/lib/validators';

export type Idea = z.infer<typeof ideaSchema>;

export type Category = (typeof categories)[number];
export type Status = (typeof statuses)[number];
