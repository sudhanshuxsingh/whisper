import { z } from 'zod';

export const feedbackSchema = z.object({
  content: z
    .string({
      message: "Description can't be empty",
    })
    .min(10, 'Message must be of at least 10 character')
    .max(300, 'Message can be of at max 300 characters'),
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  rating: z.optional(z.number()),
});
