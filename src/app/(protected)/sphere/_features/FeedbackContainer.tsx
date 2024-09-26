'use client';
import Container from '@/components/ui/container';
import React from 'react';
import FeedbackCard from './FeedbackCard';
import { useQuery } from '@tanstack/react-query';
import { FeedbackPaginatedResponse } from '@/types/feedback.types';
import { getAllFeedback } from '@/lib/actions/feedback.actions';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/ui/Pagination';
import EmptyFeedback from './EmptyFeedback';
type FeedbackContainerProps = {
  sphereId: string;
};
const FEEDBACK_PAGE_SIZE = 12;
const FeedbackContainer = ({ sphereId }: FeedbackContainerProps) => {
  const searchParams = useSearchParams();
  const currentPageNumber = searchParams.get('page') ?? 1;
  const { data, error, isLoading } = useQuery({
    queryKey: [`feedback`, { sphereId, currentPageNumber }],
    queryFn: async (): Promise<FeedbackPaginatedResponse> => {
      console.log({ currentPageNumber });
      return await getAllFeedback({
        page: Number(currentPageNumber),
        pageSize: FEEDBACK_PAGE_SIZE,
        sphereId,
      });
    },
  });
  if (isLoading) {
    return 'loading....';
  }
  if (error || !data) {
    return JSON.stringify(error);
  }
  const { totalPageCount, feedbacks, hasNextPage, totalElements } = data;
  console.log({ data, error, isLoading, currentPageNumber });
  return (
    <div className="py-24 pt-44 lg:pt-28 xl:pt-[6.8rem]">
      <Container className="space-y-6">
        {feedbacks?.length > 0 ? (
          <>
            <h4 className="text-lg">Feedbacks</h4>
            <div className="grid grid-cols-[repeat(1,_minmax(16rem,_1fr))] gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {feedbacks.map((feedback) => (
                <FeedbackCard
                  key={feedback._id}
                  content={feedback.content}
                  email={feedback.email}
                  userName={feedback.name}
                />
              ))}
            </div>
            {totalElements > FEEDBACK_PAGE_SIZE && (
              <div className="flex justify-end">
                <Pagination
                  hasNext={hasNextPage}
                  currentPage={Number(currentPageNumber)}
                  totalPage={Number(totalPageCount)}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyFeedback />
        )}
      </Container>
    </div>
  );
};

export default FeedbackContainer;
