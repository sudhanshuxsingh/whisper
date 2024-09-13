import AutorizedHeader from '@/components/ui/authorized-header';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AutorizedHeader />
      {children}
    </>
  );
}
