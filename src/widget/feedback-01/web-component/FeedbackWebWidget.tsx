import * as React from 'react';
import FeedbackForm from '../FeedbackForm';
import tailwindStyles from '@/app/globals.css?inline';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FeedbackIcon } from '../Icons';

type FeedbackWidgetProps = {
  apiKey?: string;
};

const FeedbackWebWidget = ({ apiKey }: FeedbackWidgetProps) => {
  return (
    <>
      <style>{tailwindStyles}</style>
      <div className={`feedback-widget fixed bottom-4 right-4`}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="primary"
              className="grid aspect-square h-14 place-items-center rounded-full"
            >
              <FeedbackIcon className="h-6 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <style>{tailwindStyles}</style>
            <FeedbackForm apiKey={apiKey ?? 'invalid-api-key'} />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default FeedbackWebWidget;
