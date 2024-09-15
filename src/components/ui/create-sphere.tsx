'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import CreateSphereForm from './create-sphere-form';
export default function CreateSphere() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className="grid place-items-center bg-secondary/30"
        >
          <Button
            variant="outline"
            className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 text-sm font-normal text-muted-foreground"
          >
            <div className="flex items-center gap-1 text-primary">
              <PlusIcon stroke="4px" />
              <p>Create sphere</p>
            </div>
            <p className="text-xs">
              Press{' '}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-[9px]">⌘</span>/
              </kbd>
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-normal">
              Let&apos;s create your sphere
            </DialogTitle>
            <DialogDescription className="text-xs">
              The configurations can be changed anytime in the dashboard.
            </DialogDescription>
          </DialogHeader>
          <CreateSphereForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
