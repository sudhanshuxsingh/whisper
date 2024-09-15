'use server';
import dbConnect from '@/lib/db/dbConnect';
import { SphereModel } from '@/model/sphere.model';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { sphereSchema } from '@/schema/sphereSchema';

export async function createSphereAction(
  request: z.infer<typeof sphereSchema>
) {
  try {
    const { userId } = await auth();
    throw new Error('Invalid data');
    if (!userId) {
      throw new Error('User not authenticated');
    }
    await dbConnect();

    const parsedRequest = sphereSchema.safeParse(request);
    if (!parsedRequest.success) {
      throw new Error('Invalid data');
    }

    const sphere = await SphereModel.create({
      userId,
      ...parsedRequest.data,
    });
    return {
      res: sphere.toJSON(),
    };
  } catch (error) {
    console.log('Error creating user', error);
    throw Error('Failed to create sphere.');
  }
}

export async function getAllSphereAction() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }
    await dbConnect();

    const spheres = await SphereModel.find({ userId }).sort('createdAt').lean();
    return {
      res: spheres,
    };
  } catch (error) {
    console.log('Error fetching spheres', error);
    throw Error('Failed to fetch sphere');
  }
}
