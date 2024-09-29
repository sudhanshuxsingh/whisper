import { z } from 'zod';

const titleSchema = z
  .string()
  .trim()
  .min(6, { message: 'Title should be of atleast 6 characters' })
  .max(200, { message: "Title can't be more than 200 characters" });

const descriptionSchema = z
  .string()
  .trim()
  .min(10, { message: 'Description should be of atlest 10 characters' })
  .max(1000, { message: "Description can't be more than 1000 characters" });

const typeSchema = z.enum(['message', 'feedback'], {
  message: "Sphere type can't be empty",
});

export const sphereSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  showSuggestionToUser: z.boolean(),
  type: typeSchema,
  isAcceptingMessage: z.boolean(),
});

export const updateSphereSchema = z.object({
  title: z
    .string()
    .trim()
    .min(6, { message: 'Title should be of atleast 6 characters' })
    .max(200, { message: "Title can't be more than 200 characters" })
    .optional(),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Description should be of atlest 10 characters' })
    .max(1000, { message: "Description can't be more than 1000 characters" })
    .optional(),
  showSuggestionToUser: z.boolean().optional(),
  type: z
    .enum(['message', 'feedback'], {
      message: "Sphere type can't be other than message and feedbackF",
    })
    .optional(),
  isAcceptingMessage: z.boolean().optional(),
});

export const sphereTitleSchema = z.object({
  title: titleSchema,
});

export const sphereDescriptionSchema = z.object({
  description: descriptionSchema,
});

export const sphereTypeSchema = z.object({
  type: typeSchema,
});

export const otherSphereConfigSchema = z.object({
  isAcceptingMessage: z.boolean(),
  showSuggestionToUser: z.boolean(),
});
