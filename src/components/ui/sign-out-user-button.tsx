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
        'h-10 w-full justify-start gap-4 px-7 font-normal hover:bg-background/20',
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
