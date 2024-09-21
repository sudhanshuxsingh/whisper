import Image from 'next/image';
import React from 'react';
import APP_PREVIEW from '@/assets/images/app_preview.png';
import Link from 'next/link';
type SpherePreviewProps = {
  url: string;
};

const SpherePreview = ({ url }: SpherePreviewProps) => {
  return (
    <div className="-mb-48 h-72 w-full rounded-md border bg-background p-2 lg:-mb-60 lg:h-80 xl:max-w-xl">
      <Link
        href={url}
        className="relative block h-full w-full overflow-hidden rounded-inherit border"
      >
        <Image src={APP_PREVIEW} alt="APP Preview"></Image>
      </Link>
    </div>
  );
};

export default SpherePreview;
