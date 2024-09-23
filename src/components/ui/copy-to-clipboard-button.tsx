'use client';
import { useClipboard } from '@/hooks/useClipboard';
import React from 'react';
import { Button } from './button';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
type CopyToClipboardButtonProps = {
  duration: number;
  text: string;
};
const CopyToClipButton = ({
  text,
  duration = 2000,
}: CopyToClipboardButtonProps) => {
  const { onCopy, hasCopied } = useClipboard(duration);
  return (
    <div onClick={() => onCopy(text)} className="h-fiit w-fit">
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
