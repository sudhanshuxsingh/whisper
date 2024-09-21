'use server';
import dbConnect from '@/lib/db/dbConnect';
import { SphereModel } from '@/model/sphere.model';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { sphereSchema } from '@/schema/sphereSchema';
import { nanoid } from 'nanoid';
import { SphereProps } from '@/types/sphere.types';
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
    const { userId } = await auth();
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
