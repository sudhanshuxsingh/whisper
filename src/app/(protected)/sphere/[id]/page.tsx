import FeedbackContainer from '../_features/FeedbackContainer';

type SphereProps = {
  params: {
    id: string;
  };
};

const Sphere = ({ params }: SphereProps) => {
  return (
    <>
      <FeedbackContainer sphereId={params.id} />
    </>
  );
};

export default Sphere;
