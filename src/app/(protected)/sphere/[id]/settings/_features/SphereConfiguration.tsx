'use client';
import Container from '@/components/ui/container';
import React from 'react';
import ChangeSphereTitle from './ChangeSphereTitle';
import ChangeSphereDescription from './ChangeSphereDescription';
import ChangeSphereType from './ChangeSphereType';
import ChangSphereOtherConfig from './ChangSphereOtherConfig';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSphereAction } from '@/lib/actions/sphere.actions';
import DeleteSphereDescription from './DeleteSphere';
import { Skeleton } from '@/components/ui/skeleton';

const SphereConfiguration = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['sphere', id],
    queryFn: async () => {
      return await getSphereAction(id as string);
    },
  });
  if (isLoading) {
    return (
      <Container className="my-8 mb-24 grid max-w-6xl gap-8">
        <Skeleton className="min-h-56" />
        <Skeleton className="min-h-56" />
        <Skeleton className="min-h-56" />
        <Skeleton className="min-h-56" />
        <Skeleton className="min-h-56" />
      </Container>
    );
  }
  if (!data) {
    return null;
  }
  return (
    <Container className="my-8 mb-24 grid max-w-6xl gap-8">
      <ChangeSphereType type={data.type} />
      <ChangeSphereTitle title={data.title} />
      <ChangeSphereDescription
        description={data.description}
        id={id as string}
      />
      <ChangSphereOtherConfig
        isAcceptingMessage={data.isAcceptingMessage}
        showSuggestionToUser={data.showSuggestionToUser}
      />
      <DeleteSphereDescription />
    </Container>
  );
};

export default SphereConfiguration;
