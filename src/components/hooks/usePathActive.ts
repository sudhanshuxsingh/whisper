import { usePathname } from 'next/navigation';

const usePathActive = (path: string) => {
  const currentPath = usePathname();
  console.log({ currentPath, path });
  return currentPath.startsWith(path);
};

export default usePathActive;
