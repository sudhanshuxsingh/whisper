import { z } from 'zod';
export const otpVerificationSchema = z.object({
  code: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});
