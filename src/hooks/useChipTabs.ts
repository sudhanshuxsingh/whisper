'use client';

import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
  DASHBOARD_HOME_TAB_LIST_SPHERE,
  DASHBOARD_HOME_TAB_LIST,
} from '@/app/(protected)/_data/home-navigation-tab-data';

export const useChipTabs = () => {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id as string | undefined;

  const tabs = useMemo(() => {
    if (id && pathname.includes('/sphere')) {
      return DASHBOARD_HOME_TAB_LIST_SPHERE.map((tab) => ({
        ...tab,
        href: tab.href.replace('[id]', id),
        isActive: pathname === tab.href.replace('[id]', id),
      }));
    } else {
      return DASHBOARD_HOME_TAB_LIST.map((tab) => ({
        ...tab,
        isActive: pathname === tab.href,
      }));
    }
  }, [id, pathname]);

  return tabs;
};
