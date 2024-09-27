'use client';
import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

interface ViewTransitionDocument extends Document {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
  };
}
export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () => {
    const newTheme = theme == 'dark' ? 'light' : 'dark';
    const doc = document as ViewTransitionDocument;
    if (doc.startViewTransition) {
      doc.startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <Button
      variant="secondary"
      className="size-[2.1rem] rounded-full"
      onClick={handleThemeChange}
    >
      <SunIcon className="absolute size-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
