'use client';
import Container from '@/components/ui/container';
import React from 'react';
import ChangeSphereTitle from './ChangeSphereTitle';
import ChangeSphereDescription from './ChangeSphereDescription';
import ChangeSphereType from './ChangeSphereType';
import ChangSphereOtherConfig from './ChangSphereOtherConfig';
import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSphereAction } from '@/lib/actions/sphere.actions';
import DeleteSphereDescription from './DeleteSphere';
import { Skeleton } from '@/components/ui/skeleton';

const SphereConfiguration = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useQuery({
    queryKey: ['sphere', 'spheres', id],
    queryFn: async () => {
      return await getSphereAction(id as string);
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: 2,
  });
  if (isFetching) {
    return <SphereConfigurationSkelton />;
  }
  if (isError || !data) {
    notFound();
  }
  return (
    <Container className="my-8 mb-24 grid max-w-6xl gap-8">
      <ChangeSphereType type={data.type} id={id as string} />
      <ChangeSphereTitle title={data.title} id={id as string} />
      <ChangeSphereDescription
        description={data.description}
        id={id as string}
      />
      <ChangSphereOtherConfig
        isAcceptingMessage={data.isAcceptingMessage}
        showSuggestionToUser={data.showSuggestionToUser}
        id={id as string}
      />
      <DeleteSphereDescription id={id as string} />
    </Container>
  );
};

export const SphereConfigurationSkelton = () => (
  <Container className="my-8 mb-24 grid max-w-6xl gap-8">
    <Skeleton className="min-h-56" />
    <Skeleton className="min-h-56" />
    <Skeleton className="min-h-56" />
    <Skeleton className="min-h-56" />
    <Skeleton className="min-h-56" />
  </Container>
);

export default SphereConfiguration;
