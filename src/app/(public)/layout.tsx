import Header from '@/components/ui/header';

export const metadata = {
  title: 'Welcome to whishper',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
