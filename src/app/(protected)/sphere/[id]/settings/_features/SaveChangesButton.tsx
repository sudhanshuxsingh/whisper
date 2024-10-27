import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

type SaveChangesButtonProps = {
  isLoading: boolean;
  className?: string;
};

const SaveChangesButton = ({
  isLoading,
  className,
}: SaveChangesButtonProps) => {
  return (
    <Button
      className={cn('rounded', className)}
      variant="primarySquare"
      disabled={isLoading}
    >
      {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      Save
    </Button>
  );
};

export default SaveChangesButton;
