import Header from '@/components/ui/header';
import { Footer } from './_features/Footer';

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
      <Footer />
    </>
  );
}
