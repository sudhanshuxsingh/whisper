'use client';
import { useClipboard } from '@/hooks/useClipboard';
import React from 'react';
import { Button } from './button';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
type CopyToClipboardButtonProps = {
  duration?: number;
  text: string;
  className?: string;
};
const CopyToClipButton = ({
  text,
  duration = 2000,
  className,
}: CopyToClipboardButtonProps) => {
  const { onCopy, hasCopied } = useClipboard(duration);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hasCopied) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        angle: 10,
        gravity: 0.8,
        scalar: 0.6,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    }
    onCopy(text);
  };
  return (
    <div onClick={handleClick} className="relative">
      {hasCopied ? (
        <SuccessButton className={className} />
      ) : (
        <CopyButtonIcon className={className} />
      )}
    </div>
  );
};

export const CopyButtonIcon = ({ className }: { className?: string }) => (
  <Button variant="ghost" size="xs" className={cn('p-0', className)}>
    <CopyIcon className="size-4 h-fit w-fit" />
  </Button>
);

export const SuccessButton = ({ className }: { className?: string }) => (
  <Button variant="ghost" size="xs" className={cn('p-0', className)}>
    <CheckIcon className="size-4 h-fit w-fit" />
  </Button>
);

export const CopyToClipButtonV2 = ({
  text,
  duration = 2000,
  className,
}: CopyToClipboardButtonProps) => {
  const { onCopy, hasCopied } = useClipboard(duration);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hasCopied) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confetti({
        angle: 10,
        gravity: 0.8,
        scalar: 0.6,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    }
    onCopy(text);
  };
  return (
    <div onClick={handleClick} className={cn('h-fit w-fit', className)}>
      {hasCopied ? (
        <Button
          className="h-9 min-w-[4.1rem] rounded-sm border"
          variant={'outline'}
        >
          <CheckIcon className="h-4 w-4" />
        </Button>
      ) : (
        <Button className="h-full rounded-sm border" variant={'outline'}>
          Copy
        </Button>
      )}
    </div>
  );
};

export default CopyToClipButton;
