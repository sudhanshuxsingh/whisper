'use client';
import CopyToClipButton from '@/components/ui/copy-to-clipboard-button';
import React from 'react';
//  onClick={()=>onCopy(link)}
const SphereLink = ({ link }: { link: string }) => {
  return (
    <div className="flex w-full max-w-xl items-center justify-between gap-2 overflow-x-scroll rounded bg-secondary px-4 py-1 text-xs text-muted-foreground no-scrollbar md:w-fit">
      <pre>{link}</pre>
      <CopyToClipButton text={link} duration={3000} />
    </div>
  );
};

export default SphereLink;
