'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import useScrollPosition from '@react-hook/window-scroll';
import { useRange } from '../../hooks/useRange';
import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useMemo,
  memo,
} from 'react';
import usePathActive from '../../hooks/usePathActive';
import { useParams } from 'next/navigation';
import {
  DASHBOARD_HOME_TAB_LIST,
  DASHBOARD_HOME_TAB_LIST_SPHERE,
} from '@/app/(protected)/_data/home-navigation-tab-data';
import { cn } from '@/lib/utils';

type TabItemProp = {
  content: string;
  href: string;
}[];

type Position = {
  left: number;
  width: number;
  opacity: number;
};

const Chip = memo(
  ({
    text,
    href,
    setPosition,
  }: {
    text: string;
    href: string;
    setPosition: (pos: Position) => void;
  }) => {
    const isActive = usePathActive(href);
    const ref = useRef<null | HTMLAnchorElement>(null);

    const handleMouseEnter = () => {
      if (!ref?.current) return;
      const { width } = ref.current.getBoundingClientRect();
      setPosition({
        left: ref.current.offsetLeft,
        width,
        opacity: 1,
      });
    };

    return (
      <Link
        ref={ref}
        onMouseEnter={handleMouseEnter}
        href={href}
        className="z-1 relative text-nowrap px-4 py-4"
      >
        <span className={cn('relative z-10', isActive ? 'text-primary' : '')}>
          {text}
        </span>
        {isActive && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: 'spring', duration: 0.5 }}
            className="absolute bottom-0 left-0 z-0 h-[2px] w-full rounded-md bg-primary"
          ></motion.span>
        )}
      </Link>
    );
  }
);

Chip.displayName = 'Chip';

const Cursor = memo(({ position }: { position: Position }) => {
  return (
    <motion.div
      animate={position}
      className="pointer-events-none absolute top-1/2 z-0 h-8 -translate-y-1/2 rounded bg-secondary"
    />
  );
});

Cursor.displayName = 'Cursor';

export default function ChipTabNavigation() {
  const y = useScrollPosition(60);
  const chipWrapperRef = useRef<HTMLDivElement | null>(null);
  const navX = useRange(y, 0, 50, 0, 44);
  const isSphereRoute = usePathActive('/sphere');
  const [tabListItems, setTabListItems] = useState<TabItemProp>([]);
  const params = useParams<{ id: string }>();
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    if (isSphereRoute) {
      setTabListItems(
        DASHBOARD_HOME_TAB_LIST_SPHERE.map((el) => ({
          content: el.content,
          href: el.href.includes('/sphere') ? `/sphere/${params.id}` : el.href,
        }))
      );
    } else {
      setTabListItems(DASHBOARD_HOME_TAB_LIST);
    }
  }, [isSphereRoute, params.id]);

  useLayoutEffect(() => {
    if (chipWrapperRef.current?.style) {
      chipWrapperRef.current.style.transform = `translateX(${navX}px)`;
    }
  }, [navX]);

  const handleMouseLeave = () => {
    setPosition((pv) => ({
      ...pv,
      opacity: 0,
    }));
  };

  const memoizedChips = useMemo(
    () =>
      tabListItems.map(({ content, href }) => (
        <Chip
          text={content}
          key={content}
          href={href}
          setPosition={setPosition}
        />
      )),
    [tabListItems, setPosition]
  );

  return (
    <nav className="dark:border-dark-border sticky top-0 z-40 -mt-4 flex w-full flex-col overflow-x-scroll border-b border-border/90 bg-background/90 px-6 text-muted-foreground backdrop-blur no-scrollbar supports-[backdrop-filter]:bg-background/90">
      <div
        ref={chipWrapperRef}
        onMouseLeave={handleMouseLeave}
        className="relative flex text-sm"
      >
        {memoizedChips}
        <Cursor position={position} />
      </div>
    </nav>
  );
}
