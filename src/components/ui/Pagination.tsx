import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from './button';
import { generateUrlWithQuery } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';

type PaginationProps = {
  hasNext: boolean;
  currentPage: number;
  totalPage: number;
};

const Pagination = ({
  hasNext,
  currentPage = 1,
  totalPage,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === 'prev' ? currentPage - 1 : currentPage + 1;
    const newUrl = generateUrlWithQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextPageNumber + '',
    });
    router.push(newUrl);
  };
  return (
    <div className="flex items-center gap-4 text-sm">
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage == 1}
        onClick={() => handleNavigation('prev')}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-baseline gap-1">
        <p>{currentPage}</p>
        <p className="text-xs text-muted-foreground">/{totalPage}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        disabled={!hasNext}
        onClick={() => handleNavigation('next')}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
