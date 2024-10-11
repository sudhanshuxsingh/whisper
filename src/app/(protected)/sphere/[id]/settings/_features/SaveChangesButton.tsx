import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import React from 'react';

type SaveChangesButtonProps = {
  isLoading: boolean;
};

const SaveChangesButton = ({ isLoading }: SaveChangesButtonProps) => {
  return (
    <Button className="rounded" variant="primarySquare" disabled={isLoading}>
      {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      Save
    </Button>
  );
};

export default SaveChangesButton;
