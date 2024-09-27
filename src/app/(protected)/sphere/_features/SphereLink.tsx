'use client';
import CopyToClipButton from '@/components/ui/copy-to-clipboard-button';
import React from 'react';
//  onClick={()=>onCopy(link)}
const SphereLink = ({ link }: { link: string }) => {
  return (
    <div className="relative flex w-full max-w-xl items-center gap-2 overflow-x-scroll rounded bg-secondary py-1 pl-4 pr-8 text-xs no-scrollbar md:w-fit">
      <pre className="text-muted-foreground">{link}</pre>
      <CopyToClipButton
        text={link}
        duration={3000}
        className="absolute right-2"
      />
    </div>
  );
};

export default SphereLink;
