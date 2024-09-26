import { feedbackSchema } from '@/schema/feedbackSchema';
import { z } from 'zod';
export type FeedbackSubmissionProps = z.infer<typeof feedbackSchema> & {
  sphereId: string;
};
export type FeedbackPaginatedResponse = {
  totalPageCount: number;
  pageSize: number;
  hasNextPage: boolean;
  totalElements: number;
  feedbacks: z.infer<typeof feedbackSchema>[];
};
export type FeedbackPaginatedQueryProps = {
  page: number;
  pageSize: number;
  sphereId: string;
};
