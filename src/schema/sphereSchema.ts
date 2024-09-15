import { z } from 'zod';

export const sphereSchema = z.object({
  title: z
    .string()
    .trim()
    .min(6, { message: 'Title should be of atleast 6 characters' })
    .max(200, { message: "Title can't be more than 200 characters" }),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Description should be of atlest 10 characters' })
    .max(1000, { message: "Description can't be more than 1000 characters" }),
  showSuggestionToUser: z.boolean(),
  type: z.enum(['message', 'feedback'], {
    message: "Sphere type can't be empty",
  }),
});
