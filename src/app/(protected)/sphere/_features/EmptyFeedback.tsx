'use client';
import WhisperIcon from '@/components/logo/whisper';
import { buttonVariants } from '@/components/ui/button';
import { CopyToClipButtonV2 } from '@/components/ui/copy-to-clipboard-button';
import { cn, getAbsoutePath } from '@/lib/utils';
import {
  CodeIcon,
  CodeSandboxLogoIcon,
  Component1Icon,
} from '@radix-ui/react-icons';
import { Link2Icon } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

const EmptyFeedback = () => {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id as string | undefined;
  return (
    <div className="mt-14 grid place-items-center space-y-6 lg:mt-28">
      <div className="grid aspect-square h-16 w-16 place-items-center rounded-md border bg-secondary/20">
        <WhisperIcon className="h-full text-muted-foreground" />
      </div>
      <div className="space-y-2 text-center">
        <p>Start collecting feedback/messages</p>
        <p className="text-sm text-muted-foreground">
          Choose from the options below to begin
        </p>
      </div>
      <div className="rounded-sm border text-sm text-muted-foreground">
        <div className="flex gap-6 border-b p-4">
          <div className="grid aspect-square h-8 place-items-center rounded bg-secondary/40">
            <Link2Icon className="h-4 w-4 -rotate-45" />
          </div>
          <div className="">
            <p className="text-base text-primary">Link</p>
            <p>Share the provided link</p>
          </div>
          <CopyToClipButtonV2
            className="ml-auto"
            text={getAbsoutePath(`whisper/${id}`)}
            duration={2000}
          />
        </div>
        <div className="flex gap-6 border-b p-4">
          <div className="grid aspect-square h-8 place-items-center rounded bg-secondary/40">
            <CodeSandboxLogoIcon className="h-4 w-4 -rotate-45" />
          </div>
          <div className="">
            <p className="text-base text-primary">Web Embedd</p>
            <p>Easily integrate widget into your web or app</p>
          </div>
          <Link
            href={`${pathname}/embedd`}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'my-auto ml-auto h-full rounded-sm border'
            )}
          >
            View
          </Link>
        </div>
        <div className="flex gap-6 border-b p-4">
          <div className="grid aspect-square h-8 place-items-center rounded bg-secondary/40">
            <CodeIcon className="h-4 w-4" />
          </div>
          <div className="">
            <p className="text-base text-primary">API</p>
            <p>Integrate using our flexible and easy-to-use API</p>
          </div>
          <Link
            href={`${pathname}/api`}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'my-auto ml-auto h-full rounded-sm border'
            )}
          >
            View
          </Link>
        </div>
        <div className="flex gap-6 p-4">
          <div className="grid aspect-square h-8 place-items-center rounded bg-secondary/40">
            <Component1Icon className="h-4 w-4" />
          </div>
          <div className="">
            <p className="text-base text-primary">Primitive Component</p>
            <p>Integrate using our flexible and easy-to-use API</p>
          </div>
          <Link
            href={`${pathname}/component`}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'my-auto ml-auto h-full rounded-sm border'
            )}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyFeedback;
