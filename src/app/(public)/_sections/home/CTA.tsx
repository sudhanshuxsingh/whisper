import WhisperIcon from '@/components/logo/whisper';
import { BackgroundBeamsWithCollision } from '@/components/ui/beam-collision';
import { Button, buttonVariants } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { HeroSubtitle } from '../../_features/Hero';

export default function CTA() {
  return (
    <BackgroundBeamsWithCollision className="from-[rgba(120,_119,_198,_0.2)] to-background py-8 pb-48">
      <Container className="grid place-items-center">
        <div className="relative h-32 w-32">
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-indigo-500 opacity-50 [--animation-delay:0.12s]"></div>
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-indigo-500 opacity-70 [--animation-delay:0.06s]"></div>
          <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-ripple place-items-center rounded-full bg-indigo-500">
            <WhisperIcon className="text-white" />
          </div>
        </div>
        <p className="my-6 mt-12 text-center text-4xl text-gradient md:text-6xl">
          Listen Anonymously <br className="hidden md:block" /> Improve
          Authentically
        </p>
        <HeroSubtitle>
          Empowering growth with genuine insights—anonymous or personalized
        </HeroSubtitle>
        <div className="mt-4 flex items-center gap-4">
          <Link
            className={cn(
              buttonVariants({
                variant: 'primary',
              }),
              'translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]'
            )}
            href="/overview"
          >
            Get Started
          </Link>
          <Button
            variant="link"
            className="translate-y-[-1rem] animate-fade-in gap-2 rounded-full opacity-0 [--animation-delay:600ms]"
          >
            <PlayIcon className="h-4 w-4 fill-primary" />
            View Demo
          </Button>
        </div>
      </Container>
    </BackgroundBeamsWithCollision>
  );
}
