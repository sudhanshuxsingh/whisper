import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
// type

const DashboardCard = () => {
  return (
    <Link
      href={'/sphere/122'}
      className="group/dashboard-card rounded-xl bg-secondary p-1 pb-0"
    >
      <div className="relative flex h-5/6 flex-1 flex-col justify-between overflow-hidden rounded-lg border border-primary/15 bg-background/70 px-4 py-3">
        <div className="absolute -top-2 left-1/2 h-3 w-2/3 -translate-x-1/2 rounded-b-full bg-indigo-500"></div>
      </div>
      <div className="flex justify-between overflow-hidden px-3 py-2 text-xs font-medium text-muted-foreground">
        <span className="ease-[cubic-bezier(0.2,0.4,0,1)] transition group-hover/dashboard-card:-translate-x-[calc(100%+theme(spacing.4))] group-has-[a:focus-visible]:-translate-x-[calc(100%+theme(spacing.4))] motion-reduce:duration-0">
          Updated <time>2 days ago</time>
        </span>
        <span className="ease-[cubic-bezier(0.2,0.4,0,1)] flex translate-x-[calc(100%+theme(spacing.4))] items-center gap-1 transition group-hover/dashboard-card:translate-x-0 group-has-[a:focus-visible]:translate-x-0 motion-reduce:duration-0">
          Go to sphere <ArrowRightIcon />
        </span>
      </div>
    </Link>
  );
};

export default DashboardCard;
