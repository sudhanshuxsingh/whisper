import { z } from 'zod';

export const userNameValidation = z
  .string()
  .min(2, 'Username must be atleast 2 characters')
  .max(20, 'Username must not be more than 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special character');
export const signUpSchema = z
  .object({
    userName: userNameValidation,
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email({ message: 'Invalid Email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be of atleast 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be of atleast 6 characters' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: "Confirm Password didn't match with password",
        path: ['confirmPassword'],
      });
    }
  });
