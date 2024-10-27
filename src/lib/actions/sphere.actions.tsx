'use server';
import dbConnect from '@/lib/db/dbConnect';
import { SphereModel } from '@/model/sphere.model';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { sphereSchema, updateSphereSchema } from '@/schema/sphereSchema';
import { nanoid } from 'nanoid';
import { SphereProps, UpdateSphereProps } from '@/types/sphere.types';
import { FeedbackModel } from '@/model/feedback.model';

export async function createSphereAction(
  request: z.infer<typeof sphereSchema>
): Promise<SphereProps> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('Unauthorized Request');
    }
    await dbConnect();
    const parsedRequest = sphereSchema.safeParse(request);
    if (!parsedRequest.success) {
      throw new Error('Invalid data');
    }
    const requestPayload = {
      userId,
      ...parsedRequest.data,
      apiKey: nanoid(),
    };
    const sphere = await SphereModel.create(requestPayload);
    return JSON.parse(JSON.stringify(sphere));
  } catch (error) {
    console.log('Error creating user', error);
    throw Error('Failed to create sphere.');
  }
}

export async function getAllSphereAction(): Promise<SphereProps[]> {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized Request');
    }
    await dbConnect();
    const spheres = await SphereModel.find({ userId }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(spheres));
  } catch (error) {
    console.error('Error fetching spheres:', error);
    throw new Error('Failed to fetch spheres');
  }
}

export async function getSphereAction(sphereId: string): Promise<SphereProps> {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized Request');
    }
    await dbConnect();
    const sphere = await SphereModel.findById(sphereId);
    if (sphere == null) {
      throw new Error(`No Sphere Found for ${sphereId}`);
    }
    if (sphere.userId != userId) {
      throw new Error(`Un-authorized`);
    }
    return JSON.parse(JSON.stringify(sphere));
  } catch (error) {
    console.error('Error Fetching Sphere details for:', sphereId, error);
    throw new Error(`Failed to fetch sphere details for ${sphereId}`);
  }
}

export async function modifySphereAction(
  sphereId: string,
  payload: UpdateSphereProps
) {
  try {
    const parsedPayload = await updateSphereSchema.parseAsync(payload);
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized Request');
    }
    await dbConnect();
    const sphere = await SphereModel.findById(sphereId);
    if (sphere == null) {
      throw new Error(`No Sphere Found for ${sphereId}`);
    }
    if (sphere.userId != userId) {
      throw new Error(`Un-authorized`);
    }
    const updatedSphere = await SphereModel.findByIdAndUpdate(
      sphereId,
      parsedPayload
    );
    return JSON.parse(JSON.stringify(updatedSphere));
  } catch (error) {
    console.error(error);
  }
}

export async function generateNewApiKeyAction(sphereId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized Request');
    }
    await dbConnect();
    const newApiKey = nanoid();
    const res = await SphereModel.findByIdAndUpdate(sphereId, {
      apiKey: newApiKey,
    });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate new API Key');
  }
}

export async function getAPIKey(sphereId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized Request');
    }
    await dbConnect();
    const sphere = await SphereModel.findById(sphereId);
    if (sphere == null) {
      throw new Error(`No Sphere Found for ${sphereId}`);
    }
    if (sphere.userId != userId) {
      throw new Error(`Un-authorized`);
    }
    return JSON.parse(JSON.stringify({ apiKey: sphere.apiKey ?? null }));
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
      throw new Error(`No Sphere Found for ${sphereId}`);
    }
    return JSON.parse(JSON.stringify(sphere));
  } catch (error) {
    console.error('Error Fetching Sphere details for:', sphereId, error);
    throw new Error(`Failed to fetch sphere details for ${sphereId}`);
  }
}

export async function deleteSphereAction(sphereId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized Request');
    }
    await dbConnect();
    await FeedbackModel.deleteMany({ sphere: sphereId });
    await SphereModel.findByIdAndDelete(sphereId);
    return {
      message: 'Sphere Deleted Successfully',
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete sphere');
  }
}
