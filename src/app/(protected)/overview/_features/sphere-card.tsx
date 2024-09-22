import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon, CrumpledPaperIcon } from '@radix-ui/react-icons';
import { timeSince } from '@/lib/utils';
import { Badge } from '../../../../components/ui/badge';

type SphereCardProps = {
  title: string;
  type: 'message' | 'feedback';
  description?: string;
  linkIdentifier: string;
  updatedAt: Date;
  link?: string;
};

const SphereCard = ({
  title,
  type,
  link,
  linkIdentifier,
  updatedAt,
  description,
}: SphereCardProps) => {
  console.log({ type });
  return (
    <Link
      href={`/sphere/${linkIdentifier}`}
      className="group/dashboard-card rounded-xl bg-secondary p-1 pb-0"
    >
      <div className="relative flex h-5/6 flex-1 flex-col justify-between overflow-hidden rounded-lg border border-primary/15 bg-background/70 px-4 py-3 pt-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CrumpledPaperIcon />
            <p className="truncate text-xs">{link}</p>
          </div>
          <Badge
            variant="outline"
            className="rounded-[5px] text-xs font-light capitalize"
          >
            {type}
          </Badge>
        </div>
        <div className="">
          <p className="mb-2 truncate font-normal">{title}</p>
          <p className="line-clamp-1 text-xs capitalize text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="absolute -top-2 left-1/2 h-3 w-2/3 -translate-x-1/2 rounded-b-full bg-indigo-500"></div>
      </div>
      <div className="flex justify-between overflow-hidden px-3 py-2 text-xs font-medium text-muted-foreground">
        <span className="ease-&lsqb;cubic-bezier(0.2,0.4,0,1)&rsqb; transition group-hover/dashboard-card:-translate-x-[calc(100%+theme(spacing.4))] group-has-[a:focus-visible]:-translate-x-[calc(100%+theme(spacing.4))] motion-reduce:duration-0">
          Updated <time>{timeSince(updatedAt)}</time>
        </span>
        <span className="ease-&lsqb;cubic-bezier(0.2,0.4,0,1)&rsqb; flex translate-x-[calc(100%+theme(spacing.4))] items-center gap-1 transition group-hover/dashboard-card:translate-x-0 group-has-[a:focus-visible]:translate-x-0 motion-reduce:duration-0">
          Go to sphere <ArrowRightIcon />
        </span>
      </div>
    </Link>
  );
};

export default SphereCard;
