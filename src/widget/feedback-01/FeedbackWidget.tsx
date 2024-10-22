import React from 'react';
import FeedbackButton from './FeedbackButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FeedbackForm from './FeedbackForm';

const FeedbackWidget = ({
  className,
  apiKey,
}: {
  className?: string;
  apiKey: string;
}) => {
  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <FeedbackButton />
        </PopoverTrigger>
        <PopoverContent>
          <FeedbackForm apiKey={apiKey} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FeedbackWidget;
