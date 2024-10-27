import React from 'react';
import WhisperIcon from '@/components/logo/whisper';
const Loader = () => {
  return (
    <div className="fixed left-0 top-0 grid h-screen w-screen place-items-center">
      <div className="flex items-center gap-4">
        <div className="relative">
          <WhisperIcon className="absolute animate-ping" />
          <WhisperIcon className="animate-pulse" />
        </div>
        <p className="animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
