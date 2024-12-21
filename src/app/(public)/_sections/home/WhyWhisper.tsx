'use client';
import React from 'react';
import { Features } from '@/components/ui/features';

import {
  MixIcon,
  OpenInNewWindowIcon,
  Half2Icon,
  ColorWheelIcon,
  ValueNoneIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
export default function WhyWhisper() {
  return (
    <Features
      topColor="hsl(var(--background))"
      bottomColor="rgba(var(--home-page-gradient-color))"
      className="[--home-page-gradient-color:120,_119,_198,_0.2] dark:[--home-page-gradient-color:120,_119,_198,_0.2]"
    >
      <Features.Main
        text="Discover the key features that set Whisper apart.
Designed to simplify and enhance your feedback collection process."
        title={
          <>
            What Makes <br className="hidden md:block" /> Whisper Stand Out?
          </>
        }
        image={
          <>
            <Image
              src="/why_whisper_dark.webp"
              alt="why-whisper"
              height={624}
              width={2331}
              className="hidden dark:block"
            />
            <Image
              src="/why_whisper_light.webp"
              alt="why-whisper"
              height={624}
              width={2331}
              className="block dark:hidden"
            />
          </>
        }
      />
      <Features.Grid
        features={[
          {
            icon: <EyeNoneIcon />,
            title: 'Anonymous Feedback Collection',
            description:
              'Get valuable feedback without revealing identities to maintain honesty and transparency.',
          },
          {
            icon: <ValueNoneIcon />,
            title: 'Spheres for Organizing Feedback',
            description:
              'Group feedback into spheres for better management and categorization.',
          },
          {
            icon: <MixIcon />,
            title: 'Multiple Integration Options',
            description:
              'Embeddable widget, live link, and API options to collect feedback.',
          },
          {
            icon: <OpenInNewWindowIcon />,
            title: 'Live Link for Instant Feedback',
            description:
              'Automatically generated live link for easy feedback sharing.',
          },
          {
            icon: <Half2Icon />,
            title: 'AI-Powered Suggestions',
            description:
              'Provide suggestions to users for seamless feadback submissions.',
          },
          {
            icon: <ColorWheelIcon />,
            title: 'Advanced Customization',
            description:
              'Modify the appearance and behavior of the feedback component.',
          },
        ]}
      />
    </Features>
  );
}
