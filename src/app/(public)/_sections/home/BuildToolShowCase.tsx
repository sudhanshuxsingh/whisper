import ClerkLogo from '@/components/logo/clerk';
import CloudflareLogo from '@/components/logo/cloudflare';
import NextLogo from '@/components/logo/next';
import TailwindLogo from '@/components/logo/tailwind';
import { VercelLogo } from '@/components/logo/vercel';
import Container from '@/components/ui/container';
import React from 'react';

const BuildToolShowCase = () => {
  return (
    <Container className="mt-32">
      <p className="mb-12 text-center text-xl md:text-2xl">
        <span className="text-muted-foreground">
          Built with the Latest Industry-Leading Technologies.
        </span>
        <br className="hidden md:block" /> Ensuring Reliability, Scalability,
        and Top-Notch Security.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        <ClerkLogo className="h-6 md:h-7" />
        <CloudflareLogo className="h-12 md:h-14" />
        <VercelLogo className="h-4 md:h-[1.65rem]" />
        <NextLogo className="h-4 md:h-5" />
        <TailwindLogo className="h-4 md:h-6" />
      </div>
    </Container>
  );
};

export default BuildToolShowCase;
