import FeedbackContainer from '../_features/FeedbackContainer';
import SphereDetailsHero from '../_features/SphereDetailsHero';

type SphereProps = {
  params: Promise<{
    id: string;
  }>;
};

const Sphere = async (props: SphereProps) => {
  const params = await props.params;
  return (
    <>
      <SphereDetailsHero sphereId={params.id} />
      <FeedbackContainer sphereId={params.id} />
    </>
  );
};

export default Sphere;
