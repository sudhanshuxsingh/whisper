import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeSince(date: Date | string): string {
  const now = new Date();
  const pastDate = new Date(date);
  const elapsedSeconds = (now.getTime() - pastDate.getTime()) / 1000;

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

  const units: { unit: TimeUnit; seconds: number }[] = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    const interval = Math.floor(elapsedSeconds / seconds);
    if (interval >= 1) {
      return rtf.format(-interval, unit);
    }
  }

  return rtf.format(0, 'second');
}

export function getAbsoutePath(partialPath: string) {
  const { protocol, host } = window.location;
  const fullPath = `${protocol}//${host}/${partialPath}`;
  return fullPath;
}

type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export function generateUrlWithQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

type RemoveQueryParams = {
  params: string;
  keysToRemove: string[];
};

export function removeKeysFromQueryParams({
  params,
  keysToRemove,
}: RemoveQueryParams) {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
}

export function formateDate(date: string | number): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}
