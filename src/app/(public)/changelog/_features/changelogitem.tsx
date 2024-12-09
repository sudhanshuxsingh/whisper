import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type ChangeLogItemProps = {
  path: string;
  title: string;
  description?: string;
  cover: string;
};

const ChangeLogItem = ({
  cover,
  title,
  description,
  path,
}: ChangeLogItemProps) => {
  return (
    <article className="mb-16 flex flex-col gap-6">
      <Image
        src={`/velite${cover}`}
        alt={title}
        width="647"
        height="480"
        className="rounded-lg border"
      />
      <div className="flex flex-col gap-2">
        <Link
          href={path}
          className="ring-control shrink-0 gap-1 rounded-full font-normal outline-none outline-0 focus-visible:ring"
        >
          <h2 className="text-xl">{title}</h2>
        </Link>
        <p className="text-sm text-muted-foreground md:text-base">
          {description}
        </p>
        <Link
          href={path}
          className={cn(
            buttonVariants({ variant: 'link' }),
            'mr-auto items-center gap-1 px-0 text-muted-foreground hover:text-primary'
          )}
        >
          Read More
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
};

export default ChangeLogItem;
