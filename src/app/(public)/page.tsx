import Container from '@/components/ui/container';
import BuildToolShowCase from './_sections/home/BuildToolShowCase';
import LandingHero from './_sections/home/LandingHero';
import StarIllustration from '@/components/illutstration/star';
import { cn } from '@/lib/utils';
import UnlockFeedback from './_sections/home/UnlockFeedback';
import WhyWhisper from './_sections/home/WhyWhisper';
import Testimonial from './_sections/home/Testimonial';
import CTA from './_sections/home/CTA';
import { Metadata } from 'next';
const title = 'Whisper | Go-to platform for anonymous feedback collection';
const description =
  'Organize feedback with spheres, get AI-driven suggestions, and integrate seamlessly into your website or app.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: '/og/home.webp',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
};
export default function Home() {
  return (
    <main className="">
      <LandingHero />
      <BuildToolShowCase />
      <Container>
        <div
          className={cn(
            'pointer-events-none relative z-[-1] -my-72 h-[60rem] overflow-hidden mask-radial-faded',
            '[--home-page-gradient-color:120,_119,_198,_1] before:absolute before:inset-0 before:bg-radial-faded before:opacity-[0.4]',
            'after:absolute after:-left-1/2 after:top-1/2 after:h-[142.8%] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgba(120,_119,_198,_0.4)] after:bg-background'
          )}
        >
          <StarIllustration />
        </div>
      </Container>
      <div className="[background:linear-gradient(180deg,transparent,rgba(97,106,115,.12) 40%,rgba(97,106,115,.12) 60%,rgba(97,106,115,0))]">
        <UnlockFeedback />
      </div>
      <WhyWhisper />
      <Testimonial />
      <CTA />
    </main>
  );
}
