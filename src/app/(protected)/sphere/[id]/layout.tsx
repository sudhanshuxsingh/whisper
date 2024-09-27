import SphereDetailsHero from '../_features/SphereDetailsHero';

type SphereLayoutProps = {
  params: {
    id: string;
  };
  children: React.ReactNode;
};
const Layout = ({ children, params }: SphereLayoutProps) => {
  console.log({ params });
  return (
    <>
      <SphereDetailsHero sphereId={params.id} />
      {children}
    </>
  );
};
export default Layout;
