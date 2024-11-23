'use server';
import { SphereModel } from '@/model/sphere.model';
import dbConnect from '../db/dbConnect';
import { FeedbackModel } from '@/model/feedback.model';
import {
  FeedbackSubmissionProps,
  FeedbackPaginatedResponse,
  FeedbackPaginatedQueryProps,
} from '@/types/feedback.types';
import { auth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import { SphereProps } from '@/types/sphere.types';
import { feedbackSchema } from '@/schema/feedbackSchema';

export async function submitFeedbackAction(request: FeedbackSubmissionProps) {
  try {
    const { sphereId: sphere, ...feedbackPayload } = request;
    const parsedFeedbackPayload =
      await feedbackSchema.parseAsync(feedbackPayload);
    await dbConnect();
    const requestPayload = {
      ...parsedFeedbackPayload,
      sphere: new mongoose.Types.ObjectId(sphere),
    };
    const feedback = await FeedbackModel.create(requestPayload);
    return JSON.parse(JSON.stringify(feedback));
  } catch (error) {
    console.error(error);
    throw Error('Failed to submit feedback');
  }
}

export async function getAllFeedbackAction({
  page = 1,
  pageSize = 10,
  sphereId,
}: FeedbackPaginatedQueryProps): Promise<FeedbackPaginatedResponse> {
  try {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) {
      throw Error('Unauthenticated User');
    }
    await dbConnect();
    const sphere: SphereProps | null = await SphereModel.findById(sphereId);
    if (sphere?.userId != userId) {
      throw Error('Unauthorized User');
    }
    const skipCount = (page - 1) * pageSize;
    const [feedbacks, totalElements] = await Promise.all([
      FeedbackModel.find({ sphere: sphereId }).skip(skipCount).limit(pageSize),
      FeedbackModel.countDocuments({ sphere: sphereId }),
    ]);
    const totalPageCount = Math.ceil(totalElements / pageSize);
    const hasNextPage = page < totalPageCount;
    return {
      totalPageCount,
      hasNextPage,
      pageSize,
      totalElements,
      feedbacks: JSON.parse(JSON.stringify(feedbacks)),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch feedbacks');
  }
}

export async function deleteFeedbackAction(feedbackId: string) {
  try {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) {
      throw Error('Unauthenticated User');
    }
    await dbConnect();
    await FeedbackModel.findByIdAndDelete(feedbackId);
    return {
      message: 'Feedback deleted successfully',
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete feedback');
  }
}
