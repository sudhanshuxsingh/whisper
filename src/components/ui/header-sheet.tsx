import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button, buttonVariants } from './button';
import { UserProfileCard } from './user-profile-button';
import SignOutUser from './sign-out-user-button';
import { Logo, MenuItemPropsType } from './header';
import { ArrowRightIcon, EnterIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
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
        {menuItems.map(({ content, href, openInNew }) => (
          <SheetClose asChild key={href}>
            <Link
              href={href}
              className="text-muted-foreground hover:text-foreground"
              target={openInNew ? '_blank' : '_self'}
            >
              {content}
            </Link>
          </SheetClose>
        ))}
        <SheetClose asChild>
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
        </SheetClose>
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
