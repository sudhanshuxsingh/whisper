import WhisperLogoIllustration from '@/components/illutstration/whisper';
import { LightningIllustration } from '@/components/illutstration/lightning';
import Container from '@/components/ui/container';
import React from 'react';
import { Browser } from '@/components/ui/browser-mock';
import APICodeBlock from '../../_features/APICodeBlock';

const UnlockFeedback = () => {
  return (
    <Container className="z-10">
      <h3 className="my-6 text-center text-4xl text-gradient md:text-6xl">
        Unlock Powerful
        <br className="hidden md:block" /> Feedback Capabilities
      </h3>
      <p className="text-md mt-4 text-center text-muted-foreground md:text-xl">
        Experience Seamless Integration for Effortless User Engagement.
      </p>
      <div className="mt-14 grid grid-cols-3 gap-6 [--home-page-gradient-color:120,_119,_198,_0.1]">
        <div className="relative col-span-full flex h-[28rem] flex-col items-center overflow-hidden rounded-xl border bg-secondary/10 bg-gradient-to-tr from-transparent p-8 text-center after:absolute dark:to-[rgba(var(--home-page-gradient-color))] md:col-span-2">
          <div className="absolute top-[38%] -z-[2] h-full w-[120%] from-transparent to-primary">
            <Browser
              url="whisher.com"
              className="size-full"
              src="/feedback_light.webp"
              srcDark="/feedback_dark.webp"
            />
          </div>
          <p className="mb-2 text-xl">Gorgeous out of the box</p>
          <p className="text-md text-muted-foreground">
            Opinionated when you&apos;re lazy, but infinitely flexible when you
            need it to be
          </p>
        </div>
        <div className="relative col-span-full flex h-[28rem] flex-col items-center justify-end overflow-hidden rounded-xl border bg-secondary/10 bg-gradient-to-tr from-transparent p-8 text-center dark:to-[rgba(var(--home-page-gradient-color))] md:col-span-1">
          <div className="absolute flex h-[130%] w-[130%] items-center justify-center mask-radial-faded">
            <LightningIllustration className="h-full" />
          </div>
          <p className="mb-2 text-xl">Lightning Fast</p>
          <p className="text-md text-muted-foreground">
            Optimized for speed and performance
          </p>
        </div>
        <div className="relative col-span-full flex h-[28rem] flex-col items-center justify-end overflow-hidden rounded-xl border bg-secondary/10 bg-gradient-to-tr from-transparent p-8 text-center dark:to-[rgba(var(--home-page-gradient-color))] md:col-span-1">
          <div className="absolute -bottom-[1%] flex h-[190%] w-[190%] items-end justify-center mask-radial-faded">
            <WhisperLogoIllustration className="w-full" />
          </div>
          <p className="mb-2 text-xl">Built for everyone</p>
          <p className="text-md text-muted-foreground">
            Developers, everyday users, and businesses alike.
          </p>
        </div>
        <div className="relative col-span-full flex h-[28rem] flex-col items-center overflow-hidden rounded-xl border bg-secondary/10 bg-gradient-to-tr from-transparent p-8 after:absolute dark:to-[rgba(var(--home-page-gradient-color))] md:col-span-2">
          <div className="absolute top-[38%] -z-[2] h-full w-9/12 from-transparent to-primary mask-linear-faded">
            <APICodeBlock />
          </div>
          <p className="mb-2 text-center text-xl">
            Seamless Integration Options
          </p>
          <p className="text-md text-center text-muted-foreground">
            Choose from a live link, embeddable widget, or API to easily
            integrate feedback into any app or website.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default UnlockFeedback;
