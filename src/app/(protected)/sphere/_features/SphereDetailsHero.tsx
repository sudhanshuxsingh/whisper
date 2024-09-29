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
type SphereDetailsHeroParams = {
  sphereId: string;
};
const SphereDetailsHero = ({ sphereId }: SphereDetailsHeroParams) => {
  const {
    data: sphere,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`sphere`, sphereId],
    queryFn: async (): Promise<SphereProps> => {
      return await getSphereAction(sphereId);
    },
  });

  if (isLoading) {
    return 'Loading';
  }

  if (isError) {
    return 'error';
  }

  if (!sphere) {
    return 'undefined';
  }

  console.log({ sphere });

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
