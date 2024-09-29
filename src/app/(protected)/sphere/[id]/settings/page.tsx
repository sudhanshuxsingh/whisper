import Container from '@/components/ui/container';
import React from 'react';
import SphereConfiguration from './_features/SphereConfiguration';

const Settings = () => {
  return (
    <>
      <div className="relative w-full border-b bg-secondary/10">
        <Container className="max-w-6xl py-10 text-xl md:text-2xl xl:text-3xl">
          Settings
        </Container>
      </div>
      <SphereConfiguration />
    </>
  );
};

export default Settings;
