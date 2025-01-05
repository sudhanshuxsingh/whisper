'use server';
import dbConnect from '@/lib/db/dbConnect';
import { SphereModel } from '@/model/sphere.model';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { sphereSchema, updateSphereSchema } from '@/schema/sphereSchema';
import { nanoid } from 'nanoid';
import { SphereProps, UpdateSphereProps } from '@/types/sphere.types';
import { FeedbackModel } from '@/model/feedback.model';
import { rateLimiter } from '../rate-limit';
import { ActionResponse } from '@/types/response.types';

export async function createSphereAction(
  request: z.infer<typeof sphereSchema>
): Promise<ActionResponse<SphereProps>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        code: 403,
        error: 'Unauthorized Request',
      };
    }
    const { success, reset } = await rateLimiter.limit(
      `create-sphere:${userId}`,
      {
        requests: 5,
        duration: '1 h',
      }
    );
    if (!success) {
      return {
        code: 401,
        error: `Try again after ${new Date(reset).toLocaleString()}.`,
      };
    }
    await dbConnect();
    const parsedRequest = sphereSchema.safeParse(request);
    if (!parsedRequest.success) {
      return {
        code: 300,
        error: 'Invalid data',
      };
    }
    const requestPayload = {
      userId,
      ...parsedRequest.data,
      apiKey: nanoid(),
    };
    const sphere = await SphereModel.create(requestPayload);
    return {
      code: 201,
      data: JSON.parse(JSON.stringify(sphere)),
    };
  } catch (error) {
    console.log('Error creating user', error);
    throw Error('Failed to create sphere.');
  }
}

export async function getAllSphereAction(): Promise<
  ActionResponse<SphereProps[]>
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        code: 403,
        error: 'Unauthorized Request',
      };
    }
    await dbConnect();
    const spheres = await SphereModel.find({ userId }).sort({ createdAt: -1 });
    return {
      code: 200,
      data: JSON.parse(JSON.stringify(spheres)),
    };
  } catch (error) {
    console.error('Error fetching spheres:', error);
    throw new Error('Failed to fetch spheres');
  }
}

export async function getSphereAction(
  sphereId: string
): Promise<ActionResponse<SphereProps>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        code: 403,
        error: 'Un-authorized Request',
      };
    }
    await dbConnect();
    const sphere = await SphereModel.findById(sphereId);
    if (sphere == null) {
      return {
        code: 404,
        error: `No Sphere Found for ${sphereId}`,
      };
    }
    if (sphere.userId != userId) {
      return {
        code: 403,
        error: 'Un-authorized Request',
      };
    }
    return {
      code: 200,
      data: JSON.parse(JSON.stringify(sphere)),
    };
  } catch (error) {
    console.error('Error Fetching Sphere details for:', sphereId, error);
    throw new Error(`Failed to fetch sphere details for ${sphereId}`);
  }
}

export async function modifySphereAction(
  sphereId: string,
  payload: UpdateSphereProps
): Promise<ActionResponse<SphereProps>> {
  try {
    const parsedPayload = await updateSphereSchema.parseAsync(payload);
    const { userId } = await auth();
    if (!userId) {
      return {
        code: 403,
        error: 'Un-authorized Request',
      };
    }
    await dbConnect();
    const sphere = await SphereModel.findById(sphereId);
    if (sphere == null) {
      return {
        code: 404,
        error: `No Sphere Found for ${sphereId}`,
      };
    }
    if (sphere.userId != userId) {
      return {
        code: 403,
        error: 'Un-authorized Request',
      };
    }
    const updatedSphere = await SphereModel.findByIdAndUpdate(
      sphereId,
      parsedPayload
    );
    return {
      code: 201,
      data: JSON.parse(JSON.stringify(updatedSphere)),
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch sphere details for ${sphereId}`);
  }
}
/**TODO */
export async function generateNewApiKeyAction(sphereId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        code: 403,
        error: 'Un-authorized Request',
      };
    }
    await dbConnect();
    const newApiKey = nanoid();
    const res = await SphereModel.findByIdAndUpdate(sphereId, {
      apiKey: newApiKey,
    });
    return {
      code: 201,
      data: JSON.parse(JSON.stringify(res)),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate new API Key');
  }
}

export async function getAPIKey(sphereId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        code: 403,
        error: 'Un-authorized Request',
      };
    }
    await dbConnect();
    const sphere = await SphereModel.findById(sphereId);
    if (sphere == null) {
      return {
        code: 404,
        error: `No Sphere Found for ${sphereId}`,
      };
    }
    if (sphere.userId != userId) {
      return {
        code: 403,
        error: 'Un-authorized Request',
      };
    }
    return {
      code: 200,
      data: JSON.parse(JSON.stringify({ apiKey: sphere.apiKey ?? null })),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get API Key');
  }
}

export async function getMinimalSphereDetailAction(sphereId: string) {
  try {
    await dbConnect();
    const sphere =
      await SphereModel.findById(sphereId).select('-apiKey -userId');
    if (sphere == null) {
      return {
        code: 404,
        error: `No Sphere Found for ${sphereId}`,
      };
    }
    return {
      code: 200,
      data: JSON.parse(JSON.stringify(sphere)),
    };
  } catch (error) {
    console.error('Error Fetching Sphere details for:', sphereId, error);
    return {
      code: 500,
      error: 'Internal Server Error',
    };
  }
}

export async function deleteSphereAction(sphereId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        code: 403,
        error: 'Un-authorized Request',
      };
    }
    await dbConnect();
    await FeedbackModel.deleteMany({ sphere: sphereId });
    await SphereModel.findByIdAndDelete(sphereId);
    return {
      code: 201,
      data: {
        message: 'Sphere Deleted Successfully',
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete sphere');
  }
}
