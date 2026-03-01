import { z } from 'zod';

export const createPostSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
});
