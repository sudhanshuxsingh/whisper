'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAllSphereAction } from '@/lib/actions/sphere.actions';
import SphereCard from '@/components/ui/sphere-card';
import { SphereProps } from '@/types/sphere.types';
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname } from 'next/navigation';
import { getAbsoutePath } from '@/lib/utils';
const SphereList = () => {
  const path = usePathname();
  console.log({ path });

  const {
    isLoading,
    isError,
    data: spheres,
    error,
  } = useQuery({
    queryKey: ['spheres'],
    queryFn: async (): Promise<SphereProps[]> => {
      const result = await getAllSphereAction();
      return result;
    },
  });
  if (isLoading) {
    return [...Array(3)].map((_,index: number) => (
      <Skeleton key={index} className="rounded-lg" />
    ));
  }
  if (isError) {
    return <span>Error: {JSON.stringify(error)}</span>;
  }
  return (
    <>
      {spheres?.map(
        ({ _id, title, type, description, updatedAt }: SphereProps) => {
          return (
            <SphereCard
              key={_id}
              title={title}
              type={type}
              linkIdentifier={_id}
              description={description}
              updatedAt={updatedAt}
              link={getAbsoutePath(`whisper/${_id}`)}
            />
          );
        }
      )}
    </>
  );
};

export default SphereList;
