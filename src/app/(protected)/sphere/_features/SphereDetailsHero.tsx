'use client';
import Container from '@/components/ui/container';
import React from 'react';
import { RocketIcon } from '@radix-ui/react-icons';
import SphereLink from './SphereLink';
import SpherePreview from './SpherePreview';
import { getSphereAction } from '@/lib/actions/sphere.actions';
import { getAbsoutePath } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { SphereProps } from '@/types/sphere.types';
import Status from '@/components/ui/status';
import { Skeleton } from '@/components/ui/skeleton';
import { notFound } from 'next/navigation';
type SphereDetailsHeroParams = {
  sphereId: string;
};
const SphereDetailsHero = ({ sphereId }: SphereDetailsHeroParams) => {
  const {
    data: sphere,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sphere', 'spheres', sphereId],
    queryFn: async (): Promise<SphereProps> => {
      console.log('queryFn called with sphereId:', sphereId);
      return await getSphereAction(sphereId);
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: 2,
  });

  if (isLoading) {
    return <SphereDetailsHeroSkelton />;
  }

  if (isError) {
    console.log(sphere);
    notFound();
  }

  if (!sphere) {
    return null;
  }

  return (
    <div className="relative w-full border-b bg-secondary/10">
      <Container className="flex flex-col justify-between gap-12 py-10 sm:pb-16 sm:pt-12 lg:flex-row lg:gap-12 lg:pt-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <RocketIcon className="size-6 text-muted-foreground" />
            <Status isActive={sphere.isAcceptingMessage} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl xl:text-3xl">{sphere.title}</h2>
            <p className="text-sm text-muted-foreground">
              {sphere?.description}
            </p>
          </div>
          <div className="">
            <p className="mb-1 text-xs font-medium">Live link</p>
            <SphereLink link={getAbsoutePath(`whisper/${sphere._id}`)} />
          </div>
        </div>
        <SpherePreview
          url={getAbsoutePath(`whisper/${sphere._id}`)}
          title={sphere.title}
          description={sphere.description}
          showSuggestionToUser={sphere.showSuggestionToUser}
          type={sphere.type}
          sphereId={sphere._id}
        />
      </Container>
    </div>
  );
};

export default SphereDetailsHero;

export const SphereDetailsHeroSkelton = () => (
  <div className="relative h-80 w-full border-b bg-secondary/10">
    <Container className="flex h-72 flex-col justify-between gap-12 py-10 sm:pb-16 sm:pt-12 lg:flex-row lg:gap-12 lg:pt-16">
      <div className="w-full space-y-4">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-14 w-1/2 rounded-md" />
        <Skeleton className="h-6 w-9/12 rounded-md" />
        <Skeleton className="h-6 w-9/12 rounded-md" />
      </div>
      <Skeleton className="-mb-48 h-72 w-full rounded-md p-2 lg:-mb-60 lg:h-80 xl:max-w-xl" />
    </Container>
  </div>
);
