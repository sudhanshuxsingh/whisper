'use client';
import { usePathname } from 'next/navigation';

const usePathActive = (path: string) => {
  const currentPath = usePathname();
  return currentPath.startsWith(path);
};

export default usePathActive;
