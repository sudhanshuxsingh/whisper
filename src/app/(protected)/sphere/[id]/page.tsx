import FeedbackContainer from '../_features/FeedbackContainer';
import SphereDetailsHero from '../_features/SphereDetailsHero';

type SphereProps = {
  params: {
    id: string;
  };
};

const Sphere = ({ params }: SphereProps) => {
  return (
    <>
      <SphereDetailsHero sphereId={params.id} />
      <FeedbackContainer sphereId={params.id} />
    </>
  );
};

export default Sphere;
