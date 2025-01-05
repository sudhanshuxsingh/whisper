import React from 'react';
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';

import Container from './container';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from './button';
import { cn } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import UserProfileButton from './user-profile-button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { MENU_ITEM_LIST } from '../data/header-data';

import { ThemeSwitcher } from './theme-switcher';
import { HeaderSheet } from './header-sheet';
const Header = async () => {
  const { userId } = await auth();
  return (
    <header className="dark:border-dark-border fixed left-0 top-0 z-[100] flex w-full flex-col border-b border-border/90 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-[--header-height]">
        <Container className="flex w-full items-center justify-between px-6">
          <nav className="relative z-[1] flex items-center">
            <Logo />
            <ul className="hidden flex-1 justify-center gap-0.5 px-4 md:flex lg:flex-row">
              {MENU_ITEM_LIST.map(({ content, href, openInNew }) => (
                <li key={content}>
                  <MenuItem
                    content={content}
                    href={href}
                    openInNew={openInNew}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-4 justify-self-end text-sm md:flex">
            {!userId && (
              <Link
                className={cn(
                  buttonVariants({ variant: 'rounded' }),
                  'hidden h-8 border border-secondary-foreground/10 px-3.5 lg:flex'
                )}
                href="/sign-in"
              >
                Sign In
              </Link>
            )}
            <Link
              className={cn(
                buttonVariants({
                  variant: !userId ? 'primary' : 'link',
                  size: 'sm',
                }),
                !userId ? '' : 'gap-1 px-0'
              )}
              href="/overview"
            >
              {!userId ? (
                'Get Started'
              ) : (
                <>
                  <span className="text-sm">Dashboard</span>
                  <ArrowRightIcon />
                </>
              )}
            </Link>
            <UserProfileButton />
            <ThemeSwitcher />
          </div>
          <HeaderSheet menuItems={MENU_ITEM_LIST} userId={userId} />
        </Container>
      </div>
    </header>
  );
};

export type MenuItemPropsType = {
  content: string;
  href: string;
  className?: string;
  openInNew?: boolean;
};

export const MenuItem = ({
  content,
  href,
  className,
  openInNew,
}: MenuItemPropsType) => {
  return (
    <Link
      href={href}
      className={cn(
        'ring-control inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full px-3 pb-px text-sm tracking-tight text-primary outline-none outline-0 hover:bg-secondary/20 hover:text-primary/80 focus-visible:ring-2 lg:h-7',
        className
      )}
      target={openInNew ? '_blank' : '_self'}
    >
      {content}
    </Link>
  );
};

export const Logo = () => (
  <Link href="/" about="home" className="flex items-center -space-x-1">
    <Image
      alt="Whisper Logo"
      src={WHISPER_LOGO_WHITE}
      className="hidden h-7 dark:block"
    />
    <Image
      alt="Whisper Logo"
      src={WHISPER_LOGO_BLACK}
      className="h-7 dark:hidden"
    />
    <p className="text-[1.1rem] font-bold">Whisper</p>
  </Link>
);

export const LogoIcon = ({ className }: { className?: string }) => (
  <Link href="/" about="home" className={className}>
    <Image
      alt="Whisper"
      src={WHISPER_LOGO_WHITE}
      className="hidden h-7 dark:block"
    />
    <Image alt="Whisper" src={WHISPER_LOGO_BLACK} className="h-7 dark:hidden" />
  </Link>
);

export default Header;
