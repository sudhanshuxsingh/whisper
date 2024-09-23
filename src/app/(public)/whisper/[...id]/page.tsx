import Container from '@/components/ui/container';
import React from 'react';
import FeedbackForm from '../../../../components/ui/FeedbackForm';
import FeedbackHeader from '../../../../components/ui/FeedbackHeader';
import { getSphereAction } from '@/lib/actions/sphere.actions';
import { SphereProps } from '@/types/sphere.types';
type Params = {
  id: string;
};
type Props = {
  params: Params;
};
const Whisper = async ({ params }: Props) => {
  const {
    _id: sphereId,
    title,
    description,
    type,
    showSuggestionToUser,
  }: SphereProps = await getSphereAction(params.id);
  return (
    <div className="bg-page-gradient py-8 pt-28">
      <Container className="grid max-w-6xl gap-14 md:grid-cols-2 lg:grid-cols-[1fr_30rem]">
        <FeedbackHeader title={title} description={description} />
        <FeedbackForm
          type={type}
          showSuggestionToUser={showSuggestionToUser}
          sphereId={sphereId}
          title={title}
          description={description}
        />
      </Container>
    </div>
  );
};

export default Whisper;
