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
import UserProfileButton, { UserProfile } from './user-profile-button';
import { ArrowRightIcon, EnterIcon } from '@radix-ui/react-icons';
import { MENU_ITEM_LIST } from '../data/header-data';
import SignOutUser from './sign-out-user-button';
const Header = () => {
  const { userId } = auth();
  return (
    <header className="dark:border-dark-border sticky left-0 top-0 z-[100] flex w-full flex-col border-b border-border/90 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="flex h-[--header-height]">
        <Container className="flex w-full items-center justify-between px-6">
          <Logo />
          <nav className="relative z-[1] hidden flex-col justify-center lg:flex">
            <ul className="flex flex-1 gap-0.5 px-4">
              {MENU_ITEM_LIST.map(({ content, href }) => (
                <li key={content}>
                  <MenuItem content={content} href={href} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-2 justify-self-end lg:flex">
            {!userId && (
              <Link
                className={cn(
                  buttonVariants({ variant: 'rounded' }),
                  'h-8 border border-secondary-foreground/10 px-3.5 text-sm font-medium'
                )}
                href="/sign-in"
              >
                Sign In
              </Link>
            )}
            <Link
              className={cn(
                buttonVariants({
                  variant: !userId ? 'rounded' : 'link',
                }),
                !userId
                  ? 'h-8 bg-indigo-500 px-3.5 text-sm font-medium text-white hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                  : 'gap-1'
              )}
              href="/dashboard"
            >
              {!userId ? (
                'Get Started Today'
              ) : (
                <>
                  <span>Get Started</span>
                  <ArrowRightIcon />
                </>
              )}
            </Link>
            <UserProfileButton />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <HamburgerMenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex h-full flex-col gap-4 font-medium">
                <Logo />
                {MENU_ITEM_LIST.map(({ content, href }) => (
                  <Link
                    href={href}
                    key={content}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {content}
                  </Link>
                ))}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  {!userId ? (
                    'Get Started Today'
                  ) : (
                    <>
                      <span>Get Started</span>
                      <ArrowRightIcon />
                    </>
                  )}
                </Link>
                <div className="mt-auto space-y-2">
                  <UserProfile className="p-2 px-0" />
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

const MenuItem = ({ content, href, className }: MenuItemPropsType) => {
  return (
    <Link
      href={href}
      className={cn(
        'ring-control inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full px-3 pb-px font-medium tracking-tight outline-none outline-0 hover:bg-secondary focus-visible:ring-2 lg:h-7',
        className
      )}
    >
      {content}
    </Link>
  );
};

const Logo = () => (
  <Link href="/" about="home" className="flex items-center">
    <Image
      alt="Whisper"
      src={WHISPER_LOGO_WHITE}
      className="hidden h-8 dark:block"
    />
    <Image alt="Whisper" src={WHISPER_LOGO_BLACK} className="dark:hidden" />
    <p className="text-2xl font-bold">Whisper</p>
  </Link>
);

export default Header;
