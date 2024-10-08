import { Button, ButtonProps } from '@/components/ui/button';
import React from 'react';
import FeedbackIcon from './FeedbackIcon';
import { cn } from '@/lib/utils';

const FeedbackButton = ({
  className,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) => {
  return (
    <Button
      variant="primary"
      className={cn(
        'grid aspect-square h-14 place-items-center rounded-full',
        className
      )}
      {...props}
    >
      <FeedbackIcon className="h-6 text-white" />
    </Button>
  );
};

export default FeedbackButton;
