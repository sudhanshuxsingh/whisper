'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { MENU_ITEM_LIST } from '../data/header-data';
import useScrollPosition from '@react-hook/window-scroll';
// import { usePathname } from 'next/navigation';  Dispatch, SetStateAction,
import { useRange } from '../hooks/useRange';
import { useRef, useLayoutEffect } from 'react';
export default function ChipTabNavigation() {
  const y = useScrollPosition(60);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ulRef = useRef<any>(null);
  const navX = useRange(y, 0, 50, 0, 44);
  useLayoutEffect(() => {
    if (ulRef.current) {
      if (!ulRef.current?.style) return;
      ulRef.current.style.transform = `translateX(${navX}px)`;
    }
  }, [navX]);
  return (
    <nav className="dark:border-dark-border sticky top-0 z-[99] -mt-4 flex w-full flex-col border-b border-border/90 bg-background/90 px-6 text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <ul ref={ulRef} className="relative flex gap-4 text-sm">
        {MENU_ITEM_LIST.map(({ content, href }) => (
          <Chip text={content} key={content} href={href} />
        ))}
      </ul>
    </nav>
  );
}

// <li key={content} className="py-4">
//   <Link href={href}>{content}</Link>

// </li>
const selected = false;
const setSelected = (input: string) => input;
const Chip = ({
  text,
  // selected,
  href,
  // setSelected,
}: {
  text: string;
  // selected: boolean;
  href: string;
  // setSelected: Dispatch<SetStateAction<string>>;
}) => {
  // const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={() => setSelected(text)}
      className="relative py-4"
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: 'spring', duration: 0.5 }}
          className="absolute bottom-0 left-0 z-0 h-[2px] w-full rounded-md bg-primary"
        ></motion.span>
      )}
    </Link>
  );
};
