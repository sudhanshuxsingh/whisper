'use server';
import { streamObject } from 'ai';
import { createStreamableValue, StreamableValue } from 'ai/rsc';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

type AISuggestionActionResponse = {
  message: string;
};

export async function getAISuggestions(
  title: string,
  description: string,
  partial: string
): Promise<{
  object: StreamableValue<AISuggestionActionResponse>;
}> {
  const prompt = `Generate/complete a feedbak/message for an annonymus feedback form with the title ${title} and desription ${description}. User have already filled a partial text - ${partial}`;
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: google('gemini-1.5-pro'),
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
    console.log('streaming');
    stream.done();
  })();

  return { object: stream.value };
}
