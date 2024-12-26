import React from 'react';
import CTA from '../_sections/home/CTA';
import UnlockFeedback from '../_sections/home/UnlockFeedback';
import FeaturesHero from './_section/FeaturesHero';
import WhisperIcon from '@/components/logo/whisper';
import { Metadata } from 'next';
const title = 'Whisper | Feature';
const description =
  'Experience Seamless Integration for Effortless User Engagement';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: '/og/feature.webp',
      },
    ],
  },
  alternates: {
    canonical: '/feature',
  },
};
const Features = () => {
  return (
    <section className="mt-16">
      <FeaturesHero />
      <div className="relative mx-auto mb-16 h-16 w-16 rounded-md bg-secondary/80 from-transparent p-[6px] dark:bg-gradient-to-tr dark:to-[rgba(var(--home-page-gradient-color))]">
        <div className="relative z-20 flex h-full w-full items-center justify-center overflow-hidden rounded-[5px] bg-background/70">
          <WhisperIcon className="w-8 text-indigo-500 dark:text-indigo-100" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-30 mx-auto h-4 w-full rounded-full bg-neutral-600 opacity-50 blur-lg" />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-[8px] w-[60%] bg-gradient-to-r from-transparent via-indigo-600 to-transparent blur-sm" />
      </div>

      <div className="[background:linear-gradient(180deg,transparent,rgba(97,106,115,.12) 40%,rgba(97,106,115,.12) 60%,rgba(97,106,115,0))]">
        <UnlockFeedback />
      </div>
      <CTA />
    </section>
  );
};

export default Features;
