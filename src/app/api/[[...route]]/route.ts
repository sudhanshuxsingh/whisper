import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';
import dbConnect from '@/lib/db/dbConnect';
import { SphereModel } from '@/model/sphere.model';
import { feedbackSchema } from '@/schema/feedbackSchema';
import { FeedbackModel } from '@/model/feedback.model';

const app = new Hono().basePath('/api/v1');

app.use('/api/v1/*', cors());

app.post('/feedback', async (c) => {
  try {
    const apiKey = c.req.header('X-API-KEY-WHISPER');
    if (!apiKey) {
      return c.json(
        {
          message: 'Un-authorized - Missing header X-API-KEY-WHISPER',
        },
        {
          status: 401,
        }
      );
    }
    const payLoad = await c.req.json();
    const { data, error } = await feedbackSchema.safeParseAsync(payLoad);
    if (error) {
      return c.json(
        {
          message: 'Invalid Payload',
          error,
        },
        {
          status: 400,
        }
      );
    }
    await dbConnect();
    const sphere = await SphereModel.findOne({ apiKey });
    if (!sphere) {
      return c.json(
        {
          message: 'Un-authorized - Invalid API Key',
        },
        {
          status: 401,
        }
      );
    }

    const result = await FeedbackModel.create({
      ...data,
      sphere: sphere._id,
    });

    return c.json(
      {
        message: 'Feedback Submitted Successfully',
        result,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return c.json({
      message: 'Internal Server Error',
      error,
    });
  }
});

export const POST = handle(app);
