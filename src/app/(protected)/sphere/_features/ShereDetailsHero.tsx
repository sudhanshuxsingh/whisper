import Container from '@/components/ui/container';
import React from 'react';
import { RocketIcon } from '@radix-ui/react-icons';
import SphereLink from './SphereLink';
import SpherePreview from './SpherePreview';
const ShereDetailsHero = () => {
  return (
    <div className="relative w-full border-b">
      <Container className="flex flex-col justify-between gap-12 py-10 sm:pb-16 sm:pt-12 lg:flex-row lg:gap-12 lg:pt-16">
        <div className="flex flex-col gap-4">
          <RocketIcon className="size-6 text-muted-foreground" />
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl xl:text-3xl">
              Superbase Documentation Feedback
            </h2>
            <p className="text-sm text-muted-foreground xl:text-base">
              Learn how to get up and running with Supabase through tutorials,
              APIs and platform resources.
            </p>
          </div>
          <SphereLink link="http://localhost:3000/sphere/66ee4ee236463b221add928e" />
        </div>
        <SpherePreview url="http://localhost:3000/sphere/66ee4ee236463b221add928e" />
      </Container>
    </div>
  );
};

export default ShereDetailsHero;

/**
 * 
 before:absolute before:left-0 before:top-0 before:-z-10 before:h-72 before:w-full before:border-b before:border-b-secondary before:bg-background
 */
