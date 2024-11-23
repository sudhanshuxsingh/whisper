'use client';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import HERO_IMAGE_LIGHT from '@/assets/images/hero_image.png';
import HERO_IMAGE_DARK from '@/assets/images/hero_image_dark.png';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const directions = ['to top', 'to left', 'to right', 'to bottom'];

const randomDirection = (): Direction => {
  const index = Math.floor(Math.random() * 4);
  return directions[index] as Direction;
};

type Direction = 'to top' | 'to left' | 'to right' | 'to bottom';

type Line = {
  id: string;
  direction: Direction;
  size: number;
  duration: number;
};

const HeroImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLDivElement>, {
    amount: 0.5,
    once: true,
  });
  const [lines, setLines] = useState<Line[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const removeLine = (id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  };

  useEffect(() => {
    if (!isInView) return;

    const renderLine = (timeout: number) => {
      timeoutRef.current = setTimeout(() => {
        setLines((lines) => [
          ...lines,
          {
            direction: randomDirection(),
            duration: randomNumberBetween(1300, 3500),
            size: randomNumberBetween(10, 30),
            id: Math.random().toString(36).substring(7),
          },
        ]);

        renderLine(randomNumberBetween(700, 2000));
      }, timeout);
    };

    renderLine(randomNumberBetween(600, 1300));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isInView, setLines]);

  return (
    <div className="mt-24 [perspective:2000px]" ref={ref}>
      <div
        className={cn(
          'relative rounded-md border bg-white bg-opacity-[0.01] bg-hero-gradient before:transition-opacity dark:border-secondary/50',
          isInView ? 'animate-image-rotate' : '[transform:rotateX(30deg)]',
          'before:absolute before:left-0 before:top-0 before:z-[11] before:h-full before:w-full before:bg-hero-glow before:opacity-5 before:[filter:blur(120px)]'
        )}
      >
        <div className="absolute left-0 top-0 z-20 h-full w-full overflow-hidden">
          {lines.map((line) => (
            <span
              key={line.id}
              onAnimationEnd={() => removeLine(line.id)}
              style={
                {
                  '--direction': line.direction,
                  '--size': line.size,
                  '--animation-duration': `${line.duration}ms`,
                } as CSSProperties
              }
              className={cn(
                'absolute top-0 block h-[1px] w-[10rem] bg-glow-lines',
                line.direction === 'to left' &&
                  `left-0 h-[1px] w-[calc(var(--size)*0.5rem)] animate-glow-line-horizontal md:w-[calc(var(--size)*1rem)]`,
                line.direction === 'to top' &&
                  `right-0 h-[calc(var(--size)*0.5rem)] w-[1px] animate-glow-line-vertical md:h-[calc(var(--size)*1rem)]`,
                line.direction === 'to bottom' &&
                  `bottom-0 left-0 h-[calc(var(--size)*0.5rem)] w-[1px] animate-glow-line-vertical-reverse md:h-[calc(var(--size)*1rem)]`,
                line.direction === 'to right' &&
                  `bottom-0 top-[99.9%] h-[1px] w-[calc(var(--size)*0.5rem)] animate-glow-line-horizontal-reverse md:w-[calc(var(--size)*1rem)]`
              )}
            />
          ))}
        </div>
        <svg
          viewBox="0 0 1920 919"
          fill="none"
          className={cn(
            'absolute left-0 top-0 h-full w-full',
            '[&_path]:stroke-primary [&_path]:[stroke-dasharray:1] [&_path]:[stroke-dashoffset:1] [&_path]:[strokeOpacity:0.2]',
            isInView && '[&_path]:animate-sketch-lines'
          )}
        >
          <path d="M208.5 918.5V100.5" pathLength="1" />
          <path d="M1711.5 918.5V100.5" pathLength="1" />
          <path d="M580 918.5V414" pathLength="1" />
          <path d="M961 919V414" pathLength="1" />
          <path d="M1341 918.5V414" pathLength="1" />
          <path d="M209 349H1136" pathLength="1" />
          <path d="M1711.5 165H208.5" pathLength="1" />
          <path d="M1136 413V165" pathLength="1" />
          <path d="M0 0V919" pathLength="1" />
          <path d="M1920 0V919" pathLength="1" />
          <path d="M0 0H1919.5" pathLength="1" />
          <path d="M0 918.5H1920" pathLength="1" />
          <path d="M0 100.5H1919.5" pathLength="1" />
          <path d="M-0.5 55.5H1920" pathLength="1" />
          <path d="M0 413.5H1920" pathLength="1" />
        </svg>
        <Image
          src={HERO_IMAGE_LIGHT}
          alt="Hero Image"
          className={cn(
            'relative z-10 block rounded-inherit transition-opacity delay-680 dark:hidden',
            isInView ? 'opacity-100' : 'opacity-0'
          )}
        />
        <Image
          src={HERO_IMAGE_DARK}
          alt="Hero Image"
          className={cn(
            'relative z-10 hidden rounded-inherit transition-opacity delay-680 dark:block',
            isInView ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    </div>
  );
};

export default HeroImage;
