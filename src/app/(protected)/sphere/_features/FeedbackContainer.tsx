import Container from '@/components/ui/container';
import React from 'react';
import FeedbackCard from './FeedbackCard';
type FeedbackContainerProps = {
  sphereId: string;
};
const FeedbackContainer = ({ sphereId }: FeedbackContainerProps) => {
  console.log({ sphereId });
  return (
    <div className="bg-secondary/10 py-24 pt-44 lg:pt-28 xl:pt-[6.8rem]">
      <Container className="space-y-6">
        <h4 className="text-lg">Feedbacks</h4>
        <div className="grid auto-rows-[minmax(14rem,_1fr)] grid-cols-[repeat(1,_minmax(16rem,_1fr))] gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
        </div>
      </Container>
    </div>
  );
};

export default FeedbackContainer;
