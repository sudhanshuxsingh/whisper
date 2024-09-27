'use client';
import { useClipboard } from '@/hooks/useClipboard';
import React from 'react';
import { Button } from './button';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
type CopyToClipboardButtonProps = {
  duration: number;
  text: string;
  className?: string;
};
const CopyToClipButton = ({
  text,
  duration = 2000,
  className,
}: CopyToClipboardButtonProps) => {
  const { onCopy, hasCopied } = useClipboard(duration);
  return (
    <div onClick={() => onCopy(text)} className={cn('h-fit w-fit', className)}>
      {hasCopied ? <SuccessButton /> : <CopyButtonIcon />}
    </div>
  );
};

const CopyButtonIcon = () => (
  <Button variant="ghost" size="xs" className="p-0">
    <CopyIcon className="size-4 h-fit w-fit" />
  </Button>
);

const SuccessButton = () => (
  <Button variant="ghost" size="xs" className="p-0">
    <CheckIcon className="size-4 h-fit w-fit" />
  </Button>
);

export default CopyToClipButton;
