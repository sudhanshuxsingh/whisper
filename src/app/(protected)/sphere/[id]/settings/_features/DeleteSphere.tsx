import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import React from 'react';

const DeleteSphere = () => {
  return (
    <Card className="border-red-800/50">
      <Card.Title>Delete Sphere</Card.Title>
      <Card.Description>
        The sphere will be permanently deleted including the feedback and
        messages. This action is irreversible and can not be undone.
      </Card.Description>
      <Card.Footer className="flex items-center justify-between border-red-800/50 bg-red-700/10">
        <Button className="ml-auto rounded" variant="destructive">
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default DeleteSphere;
