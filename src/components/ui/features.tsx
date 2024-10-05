'use client';

import {
  useMotionTemplate,
  useScroll,
  useTransform,
  motion,
  useInView,
} from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Container from './container';
import { cn } from '@/lib/utils';

type FeaturesProps = {
  children: React.ReactNode;
  topColor: string;
  bottomColor: string;
  className?: string;
};

export const Features = ({
  children,
  topColor,
  bottomColor,
  className,
}: FeaturesProps) => {
  const ref = useRef(null);
  const parentRef = useRef(null);
  const isInView = useInView(parentRef, {
    amount: 0.4,
    once: false,
  });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['60% end', '60% center'],
  });
  const gradientX = useTransform(scrollYProgress, [0, 1], [10, 100]);
  const leftGradientX = useTransform(gradientX, (value) => 100 - value);
  const background = useMotionTemplate`conic-gradient(from 90deg at ${leftGradientX}% 50%, var(--top-feature-color), var(--bottom-feature-color)), conic-gradient(from 270deg at ${gradientX}% 50%,var(--bottom-feature-color),var(--top-feature-color))`;
  return (
    <section
      className={cn(
        'relative flex flex-col items-center',
        className,
        isInView && 'is-visible'
      )}
      ref={parentRef}
      style={
        {
          '--top-feature-color': topColor,
          '--bottom-feature-color': bottomColor,
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cn(
          'pointer-events-none absolute h-[40rem] w-full rotate-180 bg-no-repeat transition-[transform,opacity] duration-1000 ease-in [mask:radial-gradient(100%_50%_at_center_center,_black,_transparent)] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-[var(--bottom-feature-color)]',
          isInView && 'is-visible opacity-100'
        )}
        ref={ref}
        style={{
          backgroundImage: background,
          backgroundPosition: '0% 0px, 100% 0px',
          backgroundSize: '50% 100%,50% 100%',
        }}
      ></motion.div>
      <div className="mb-16 mt-[12.8rem] w-full md:mb-[12.8rem] md:mt-[25.2rem]">
        {children}
      </div>
    </section>
  );
};

type FeatureMainProps = {
  imageUrl: string;
  text: string;
  imageWidth: number;
  imageHeight: number;
  title: React.ReactNode;
};

const FeatureMain = ({
  imageUrl,
  text,
  imageHeight,
  imageWidth,
  title,
}: FeatureMainProps) => {
  return (
    <>
      <div className="relative before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_50%_50%_at_center,var(--bottom-feature-color),transparent)] before:opacity-70">
        <Container className="w-[78rem] max-w-[90%] text-center">
          <h3 className="text-gradient my-6 mb-11 translate-y-[70%] text-center text-4xl [transition:transform_1000ms_cubic-bezier(0.3,_1.17,_0.55,_0.99)_0s] md:text-6xl [.is-visible_&]:translate-y-0">
            {title}
          </h3>
          <div className="before:bg-gradient relative z-10 rounded-lg to-transparent backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:from-[var(--bottom-feature-color)] before:p-[1px] before:[mask-composite:xor] before:[mask:linear-gradient(black,_black)_content-box_content-box,_linear-gradient(black,_black)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-white/20 after:[mask:linear-gradient(black,transparent)]">
            <Image
              src={imageUrl}
              alt="feature image"
              className="h-auto w-full"
              width={imageHeight}
              height={imageWidth}
            ></Image>
          </div>
        </Container>
        <Container className="flex w-[78rem] max-w-[90%] flex-col items-center text-center">
          <p className="my-14 text-center text-xl leading-tight text-muted-foreground md:w-4/5 md:text-2xl">
            {text}
          </p>
          <hr className="mb-14 h-[1px] border-none bg-gradient-to-r from-transparent via-secondary to-transparent" />
        </Container>
      </div>
    </>
  );
};

type FeatureGridProps = {
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
};

const FeatureGrid = ({ features }: FeatureGridProps) => {
  return (
    <Container className="grid w-full max-w-5xl place-items-center gap-8 text-sm sm:grid-cols-2 md:grid-cols-3">
      {features.map(({ title, icon, description }, i) => {
        return (
          <div className="max-w-80 [&_svg]:mr-2 [&_svg]:inline" key={i}>
            {icon}
            <span className="mr-2 text-primary">{title}</span>
            <span className="text-muted-foreground">{description}</span>
          </div>
        );
      })}
    </Container>
  );
};

Features.Main = FeatureMain;
Features.Grid = FeatureGrid;
