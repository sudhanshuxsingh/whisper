import { z } from 'zod';

export const feedbackSchema = z.object({
  content: z
    .string({
      message: "Description can't be empty",
    })
    .min(10, 'Message must be of at least 10 character')
    .max(300, 'Message can be of at max 300 characters'),
  name: z
    .string()
    .min(3, {
      message: 'Name must be of atleast 3 character',
    })
    .max(50, {
      message: 'Name can be of at max 50 character',
    })
    .optional(),
  email: z.string().email({ message: 'Invalid Email' }).optional(),
  rating: z
    .number()
    .min(1, { message: "Rating value can't be less than 1" })
    .max(5, { message: "Rating value can't be more than 5" })
    .optional(),
  _id: z.string().optional(),
});
