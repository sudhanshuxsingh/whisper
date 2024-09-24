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

export async function submitFeedback(request: FeedbackSubmissionProps) {
  try {
    await dbConnect();
    const requestPayload = {
      ...request,
      sphere: new mongoose.Types.ObjectId(request.sphereId),
    };
    console.log(requestPayload);
    const feedback = await FeedbackModel.create(requestPayload);
    return JSON.parse(JSON.stringify(feedback));
  } catch (error) {
    console.error(error);
    throw Error('Failed to submit feedback');
  }
}

export async function getAllFeedback({
  page = 1,
  pageSize = 10,
  sphereId,
}: FeedbackPaginatedQueryProps): Promise<FeedbackPaginatedResponse> {
  try {
    const { userId }: { userId: string | null } = auth();
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
      currentPageNumber: page + 1,
      totalPageCount,
      hasNextPage,
      pageSize,
      feedbacks: JSON.parse(JSON.stringify(feedbacks)),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch feedbacks');
  }
}
