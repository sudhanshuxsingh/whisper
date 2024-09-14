'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import useScrollPosition from '@react-hook/window-scroll';
import { useRange } from '../hooks/useRange';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import usePathActive from '../hooks/usePathActive';
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

export default function ChipTabNavigation() {
  const y = useScrollPosition(60);
  const ulRef = useRef<any>(null);
  const navX = useRange(y, 0, 50, 0, 44);
  const isSphereRoute = usePathActive('/sphere');
  const [tabListItems, setTabListItems] = useState<TabItemProp>([]);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (isSphereRoute) {
      setTabListItems(
        DASHBOARD_HOME_TAB_LIST_SPHERE.map((el)=>{
          if(el.href.includes('/sphere')){
            return {
              content:el.content,
              href:`/sphere/${params.id}`
            }
          }
          return el;
        })
      );
    } else {
      setTabListItems(DASHBOARD_HOME_TAB_LIST);
    }
  }, [isSphereRoute]);
  useLayoutEffect(() => {
    if (ulRef.current) {
      if (!ulRef.current?.style) return;
      ulRef.current.style.transform = `translateX(${navX}px)`;
    }
  }, [navX]);
  return (
    <nav className="dark:border-dark-border sticky top-0 z-[99] -mt-4 flex w-full flex-col border-b border-border/90 bg-background/90 px-6 text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <ul ref={ulRef} className="relative flex text-sm">
        {tabListItems.map(({ content, href }) => (
          <Chip text={content} key={content} href={href} />
        ))}
      </ul>
    </nav>
  );
}

const Chip = ({ text, href }: { text: string; href: string }) => {
  const isActive = usePathActive(href);
  return (
    <Link href={href} className="relative px-4 py-4">
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
};
