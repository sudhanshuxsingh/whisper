import React from 'react';
import Container from '@/components/ui/container';
import { buttonVariants } from '@/components/ui/button';
import { Hero, HeroSubtitle, HeroTitle } from '../../_features/Hero';
import HeroImage from '../../_features/HeroImage';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
const LandingHero = () => {
  return (
    <Container className="flex flex-col gap-4 pt-16">
      <Hero className="grid place-items-center py-12">
        <HeroTitle className="translate-y-[-1rem] animate-fade-in text-balance tracking-tighter opacity-0 [--animation-delay:200ms]">
          Go-to platform for anonymous
          <br className="hidden md:block" /> feedback collection
        </HeroTitle>
        <HeroSubtitle className="translate-y-[-1rem] animate-fade-in text-balance opacity-0 [--animation-delay:400ms]">
          Organize feedback with spheres, get AI-driven suggestions, and{' '}
          <br className="hidden md:block" />
          integrate seamlessly into your website or app.
        </HeroSubtitle>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
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
          <Link
            className={cn(
              buttonVariants({
                variant: 'link',
              }),
              'translate-y-[-1rem] animate-fade-in gap-2 rounded-full opacity-0 [--animation-delay:600ms]'
            )}
            href="https://cal.com/sudhanshuxsingh/whisper"
            target="_blank"
          >
            Book Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <HeroImage />
      </Hero>
    </Container>
  );
};

export default LandingHero;
