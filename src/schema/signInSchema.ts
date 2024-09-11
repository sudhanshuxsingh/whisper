import { z } from 'zod';

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email address or username can't be empty" }),
  password: z.string().min(1, { message: "Password can't be empty" }),
});
