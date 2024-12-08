import WhisperIcon from '@/components/logo/whisper';
import { BackgroundBeamsWithCollision } from '@/components/ui/beam-collision';
import { Button, buttonVariants } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { HeroSubtitle } from '../../_features/Hero';
import StarIllustration from '@/components/illutstration/star';

export default function CTA() {
  return (
    <>
      <Container>
        <div
          className={cn(
            'pointer-events-none relative z-[-1] -my-72 h-[60rem] overflow-hidden mask-radial-faded',
            '[--home-page-gradient-color:120,_119,_198,_1] before:absolute before:inset-0 before:bg-radial-faded before:opacity-[0.4]',
            'after:absolute after:-left-1/2 after:top-1/2 after:h-[142.8%] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgba(120,_119,_198,_0.4)] after:bg-background',
            'rotate-180'
          )}
        >
          <StarIllustration />
        </div>
      </Container>
      <BackgroundBeamsWithCollision className="h-auto from-[rgba(120,_119,_198,_0.2)] to-background py-8 pb-48">
        <Container className="grid place-items-center">
          <div className="relative h-32 w-32">
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-indigo-500 opacity-20 [animation-delay:0.18s]"></div>
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-indigo-500 opacity-40 [animation-delay:0.12s]"></div>
            <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-ripple place-items-center rounded-full bg-indigo-500/60">
              <WhisperIcon className="text-white" />
            </div>
          </div>
          <p className="my-6 mt-12 text-balance text-center text-4xl text-gradient md:text-6xl">
            Listen Anonymously <br className="hidden md:block" /> Improve
            Authentically
          </p>
          <HeroSubtitle className="text-balance text-center">
            Empowering growth with genuine insights—anonymous or personalized
          </HeroSubtitle>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              className={cn(
                buttonVariants({
                  variant: 'primary',
                })
              )}
              href="/overview"
            >
              Get Started
            </Link>
            <Button variant="link" className="gap-2 rounded-full">
              <PlayIcon className="h-4 w-4 fill-primary" />
              View Demo
            </Button>
          </div>
        </Container>
      </BackgroundBeamsWithCollision>
    </>
  );
}
