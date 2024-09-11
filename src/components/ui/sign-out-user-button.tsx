'use client';
import React from 'react';
import { Button } from './button';
import { ExitIcon } from '@radix-ui/react-icons';
import { useClerk } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
const SignOutUser = ({
  className,
  variant,
}: {
  className?: string;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'rounded'
    | null
    | undefined;
}) => {
  const { signOut } = useClerk();
  return (
    <Button
      variant={variant ?? 'secondary'}
      className={cn(
        'h-10 hover:bg-background/20 w-full gap-4 px-7 justify-start font-normal',
        className
      )}
      onClick={() => signOut({ redirectUrl: '/' })}
    >
      <ExitIcon />
      Sign out
    </Button>
  );
};

export default SignOutUser;
