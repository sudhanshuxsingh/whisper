import React from 'react';
import { SphereConfigurationSkelton } from './_features/SphereConfiguration';
import Container from '@/components/ui/container';

const SphereSettingsPageLoader = () => {
  return (
    <>
      <div className="w-full border-b bg-secondary/10">
        <Container className="max-w-6xl py-10 text-xl md:text-2xl xl:text-3xl">
          Settings
        </Container>
      </div>
      <SphereConfigurationSkelton />
    </>
  );
};

export default SphereSettingsPageLoader;
