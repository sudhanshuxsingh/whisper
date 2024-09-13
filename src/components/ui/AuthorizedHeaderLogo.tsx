'use client';

import Image from 'next/image';
import Link from 'next/link';
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import useScrollPosition from '@react-hook/window-scroll';
import { useRange } from '../hooks/useRange';
export const AuthorizedHeaderLogo = () => {
  const y = useScrollPosition(60);
  const logoScale = useRange(y, 0, 50, 1, 0.8);
  const topPosition=useRange(y,0,50,1,.8)
  return (
    <Link
      href="/"
      about="home"
      style={{
        transform: `scale(${logoScale})`,
        top: `${topPosition}rem`,
      }}
      className="fixed left-6 z-[101]"
    >
      <Image
        alt="Whisper"
        src={WHISPER_LOGO_WHITE}
        className="hidden h-7 dark:block"
      />
      <Image
        alt="Whisper"
        src={WHISPER_LOGO_BLACK}
        className="h-7 dark:hidden"
      />
    </Link>
  );
};
