'use server';
import { streamObject } from 'ai';
import { createStreamableValue, StreamableValue } from 'ai/rsc';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { rateLimiter } from '../rate-limit';

type AISuggestionActionResponse = {
  message: string;
};

export async function getAISuggestionsAction(
  title: string,
  description: string,
  partial: string
): Promise<{
  object: StreamableValue<AISuggestionActionResponse>;
}> {
  const prompt = `Generate/complete a feedbak/message for an annonymus feedback form with the title ${title} and desription ${description}. User may have already filled a partial text - ${partial ?? ''}`;

  const ip = await rateLimiter.getClientIp();
  const { success, reset } = await rateLimiter.limit(`ai-suggestion:${ip}`, {
    requests: 5,
    duration: '24 h',
  });

  if (!success) {
    throw new Error(
      `Rate limit exceeded. Try again after ${new Date(reset).toLocaleString()}.`
    );
  }

  const stream = createStreamableValue();

  (async () => {
    try {
      const { partialObjectStream } = await streamObject({
        model: google('gemini-1.5-flash'),
        system:
          'You generate three feedbacks/messages for a annonymus feedback form whih will suggest users what feedback/messages they can provide',
        prompt,
        schema: z.object({
          message: z.string().describe('The feedback for the form'),
        }),
      });
      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }
      stream.done();
    } catch (error) {
      stream.done();
      throw error;
    }
  })();

  return { object: stream.value };
}
