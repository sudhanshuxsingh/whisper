import Container from '@/components/ui/container';
import BuildToolShowCase from './_sections/home/BuildToolShowCase';
import LandingHero from './_sections/home/LandingHero';
import StarIllustration from '@/components/illutstration/star';
import { cn } from '@/lib/utils';
import UnlockFeedback from './_sections/home/UnlockFeedback';

export default function Home() {
  return (
    <main className="dark:bg-page-gradient">
      <LandingHero />
      <BuildToolShowCase />
      <Container>
        <div
          className={cn(
            'mask-radial-faded pointer-events-none relative z-[-1] -my-72 h-[60rem] overflow-hidden',
            '[--home-page-gradient-color:120,_119,_198,_1] before:absolute before:inset-0 before:bg-radial-faded before:opacity-[0.4]',
            'after:absolute after:-left-1/2 after:top-1/2 after:h-[142.8%] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgba(120,_119,_198,_0.4)] after:bg-background'
          )}
        >
          <StarIllustration />
        </div>
      </Container>
      <UnlockFeedback />
    </main>
  );
}
