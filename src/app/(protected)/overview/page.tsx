import Container from '@/components/ui/container';
import CreateSphere from '@/app/(protected)/overview/_features/create-sphere';
// import SphereCard from '@/components/ui/sphere-card';
// import React, { Suspense } from 'react';
// import { getAllSphereAction } from '@/lib/actions/sphere.actions';
import SphereList from './_features/sphere-list';

const Overview = () => {
  return (
    <Container className="mt-6 w-11/12">
      <h2 className="mb-4 text-2xl font-medium tracking-tight">Spheres</h2>
      <div className="grid auto-rows-[minmax(14rem,_1fr)] grid-cols-[repeat(1,_minmax(16rem,_1fr))] gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <CreateSphere />
        <SphereList />
      </div>
    </Container>
  );
};

export default Overview;
