import Container from '@/components/ui/container';
import React from 'react';
import FeedbackForm from '../../../../components/ui/FeedbackForm';
import FeedbackHeader from '../../../../components/ui/FeedbackHeader';
import { getMinimalSphereDetailAction } from '@/lib/actions/sphere.actions';
import { SphereProps } from '@/types/sphere.types';
type Params = {
  id: string;
};
type Props = {
  params: Promise<Params>;
};
const Whisper = async (props: Props) => {
  const params = await props.params;
  const { data, error } = await getMinimalSphereDetailAction(params.id);

  if (error) {
    return error;
  }

  const {
    _id: sphereId,
    title,
    description,
    type,
    showSuggestionToUser,
    isAcceptingMessage,
  }: SphereProps = data;

  if (!isAcceptingMessage) {
    return 'User not accepting any messages for now';
  }

  return (
    <div className="py-8 pt-36">
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
