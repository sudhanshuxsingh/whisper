import { feedbackSchema } from '@/schema/feedbackSchema';
import { z } from 'zod';
export type FeedbackSubmissionProps = z.infer<typeof feedbackSchema> & {
  sphereId: string;
};
export type FeedbackPaginatedResponse = {
  currentPageNumber: number;
  totalPageCount: number;
  pageSize: number;
  hasNextPage: boolean;
  feedbacks: z.infer<typeof feedbackSchema>;
};
export type FeedbackPaginatedQueryProps = {
  page: number;
  pageSize: number;
  sphereId: string;
};
