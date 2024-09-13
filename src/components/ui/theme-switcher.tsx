'use client';
import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  return (
    <Button variant="secondary" className="size-[2.1rem] rounded-full">
      <SunIcon
        className="absolute size-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme('dark')}
      />
      <MoonIcon
        className="absolute size-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme('light')}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
