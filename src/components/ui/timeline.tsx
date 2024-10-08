'use client';
import { cn } from '@/lib/utils';
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface TimelineEntry {
  date: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 26%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative w-full pb-20 md:pt-32">
        {data.map((item, index) => (
          <TimelineItem item={item} key={index} />
        ))}
        <div
          style={{
            height: height + 'px',
          }}
          className="absolute left-[130px] top-0 hidden w-[1px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700 md:block"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="timeline-line absolute inset-x-0 top-0 w-[1px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item }: { item: TimelineEntry }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['60% end', 'end 20%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log({ latest, item: item.date });
    setIsInView(latest > 0 && latest < 1);
  });

  return (
    <div
      className={cn('mt-10 grid md:grid-cols-[130px_auto] md:gap-10')}
      ref={ref}
    >
      <div className="sticky top-40 z-40 hidden w-full max-w-xs self-start px-2 text-sm text-muted-foreground md:block">
        <div
          className={cn(
            'absolute -right-[0.375rem] top-1/2 grid aspect-square h-3 -translate-y-1/2 place-items-center rounded-full',
            isInView ? 'bg-indigo-300/40' : 'bg-muted-foreground/50'
          )}
        >
          <div
            className={cn(
              'aspect-square h-1.5 rounded transition-colors duration-300',
              isInView ? 'bg-indigo-400' : 'bg-muted-foreground'
            )}
          ></div>
        </div>
        <h6
          className={cn(
            'text-right transition-colors duration-300',
            isInView ? 'text-indigo-400' : 'text-muted-foreground'
          )}
        >
          {item.date}
        </h6>
      </div>
      <div className="relative w-full">
        <h6 className="mb-4 block text-left text-2xl font-bold md:hidden">
          {item.date}
        </h6>
        {item.content}{' '}
      </div>
    </div>
  );
};
