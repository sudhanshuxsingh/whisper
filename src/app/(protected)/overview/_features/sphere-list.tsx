'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAllSphereAction } from '@/lib/actions/sphere.actions';
import SphereCard from '@/app/(protected)/overview/_features/sphere-card';
import { SphereProps } from '@/types/sphere.types';
import { Skeleton } from '@/components/ui/skeleton';
import { getAbsoutePath } from '@/lib/utils';
const SphereList = () => {
  const {
    isLoading,
    isError,
    data: spheres,
    error,
  } = useQuery({
    queryKey: ['spheres'],
    queryFn: async (): Promise<SphereProps[] | undefined> => {
      const { data, code, error } = await getAllSphereAction();
      if (error) {
        console.log({ code, error });
        throw error;
      }
      return data;
    },
  });
  if (isLoading) {
    return [...Array(3)].map((_, index: number) => (
      <Skeleton key={index} className="rounded-lg" />
    ));
  }
  if (isError) {
    return (
      <div className="grid h-full place-items-center rounded-xl bg-red-300 p-4 text-xs dark:bg-red-950">
        Error : {JSON.stringify(error)}
      </div>
    );
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
