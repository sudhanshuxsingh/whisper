'use client';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import CopyToClipButton from '@/components/ui/copy-to-clipboard-button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { getAPIKey } from '@/lib/actions/sphere.actions';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const APIKey = () => {
  const { id } = useParams();
  const {
    data: api,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['sphere', 'spheres', id],
    queryFn: async () => {
      const { data, error } = await getAPIKey(id as string);
      if (error) {
        throw Error(error);
      }
      return data;
    },
  });

  const [showKey, setShowKey] = useState(false);

  if (isError) {
    return (
      <Card className="border-red-800/50 bg-red-700/10">
        <Card.Title>Key</Card.Title>
        <Card.Description>
          <p>Failed to fetch API Key - {error.message}</p>
        </Card.Description>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Title>Key</Card.Title>
      <Card.Description className="text-base">
        To use the Whisper Feedback API, you need to include your API key in the
        request headers
      </Card.Description>
      <Card.Body className="flex items-center gap-4">
        {isLoading ? (
          <Skeleton className="h-10 w-4/5" />
        ) : (
          <>
            <Input
              type={showKey ? 'text' : 'password'}
              defaultValue={api?.apiKey ?? ''}
              className="w-9/12"
              disabled
            />
            <div className="flex">
              <Button
                onClick={() => setShowKey((prev) => !prev)}
                variant="ghost"
                size="icon"
                className="rounded"
              >
                {showKey ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </Button>
              <CopyToClipButton text={api?.apiKey ?? ''} className="h-9 w-9" />
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default APIKey;
