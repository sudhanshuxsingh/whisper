import React from 'react';
import FeedbackButton from './FeedbackButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FeedbackForm from './FeedbackForm';

const FeedbackWidget = () => {
  return (
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <FeedbackButton />
        </PopoverTrigger>
        <PopoverContent>
          <FeedbackForm />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FeedbackWidget;
