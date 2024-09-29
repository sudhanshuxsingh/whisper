import React from 'react';
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Container from './container';
import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from './button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import UserProfileButton, { UserProfileCard } from './user-profile-button';
import { ArrowRightIcon, EnterIcon } from '@radix-ui/react-icons';
import { MENU_ITEM_LIST } from '../data/header-data';
import SignOutUser from './sign-out-user-button';
import { ThemeSwitcher } from './theme-switcher';
const Header = () => {
  const { userId } = auth();
  return (
    <header className="dark:border-dark-border fixed left-0 top-0 z-[100] flex w-full flex-col border-b border-border/90 bg-transparent backdrop-blur supports-[backdrop-filter]:bg-transparent">
      <div className="flex h-[--header-height]">
        <Container className="flex w-full items-center justify-between px-6">
          <nav className="relative z-[1] flex items-center">
            <Logo />
            <ul className="hidden flex-1 justify-center gap-0.5 px-4 md:flex lg:flex-row">
              {MENU_ITEM_LIST.map(({ content, href }) => (
                <li key={content}>
                  <MenuItem content={content} href={href} />
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
                'Get Started Today'
              ) : (
                <>
                  <span className="text-sm">Get Started</span>
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

type MenuItemPropsType = {
  content: string;
  href: string;
  className?: string;
};

export const MenuItem = ({ content, href, className }: MenuItemPropsType) => {
  return (
    <Link
      href={href}
      className={cn(
        'ring-control inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full px-3 pb-px text-sm tracking-tight text-primary outline-none outline-0 hover:bg-secondary/20 hover:text-primary/80 focus-visible:ring-2 lg:h-7',
        className
      )}
    >
      {content}
    </Link>
  );
};

export const Logo = () => (
  <Link href="/" about="home" className="flex items-center -space-x-1">
    <Image
      alt="Whisper"
      src={WHISPER_LOGO_WHITE}
      className="hidden h-7 dark:block"
    />
    <Image alt="Whisper" src={WHISPER_LOGO_BLACK} className="h-7 dark:hidden" />
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

type HeaderSheetProps = {
  userId: string | null;
  menuItems: MenuItemPropsType[];
  isProtectedRoute?: boolean;
  className?: string;
};

export const HeaderSheet = ({
  menuItems,
  userId,
  isProtectedRoute = false,
  className,
}: HeaderSheetProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn('shrink-0 md:hidden', className)}
      >
        <HamburgerMenuIcon className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav className="flex h-full flex-col gap-4">
        <Logo />
        {menuItems.map(({ content, href }) => (
          <Link
            href={href}
            key={content}
            className="text-muted-foreground hover:text-foreground"
          >
            {content}
          </Link>
        ))}
        <Link
          href="/overview"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          {!userId
            ? 'Get Started Today'
            : !isProtectedRoute && (
                <>
                  <span>Get Started</span>
                  <ArrowRightIcon />
                </>
              )}
        </Link>
        <div className="mt-auto space-y-2">
          <UserProfileCard className="p-2 px-0" />
          {!userId && (
            <Link
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'h-10 w-full justify-start gap-4 px-2 font-normal hover:bg-background/20'
              )}
              href="/sign-in"
            >
              <EnterIcon />
              Sign In
            </Link>
          )}
          {userId && <SignOutUser variant="ghost" className="px-0" />}
        </div>
      </nav>
    </SheetContent>
  </Sheet>
);

export default Header;
