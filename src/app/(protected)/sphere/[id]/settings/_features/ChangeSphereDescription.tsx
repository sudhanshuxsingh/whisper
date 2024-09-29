'use client';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  sphereDescriptionSchema,
  updateSphereSchema,
} from '@/schema/sphereSchema';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifySphereAction } from '@/lib/actions/sphere.actions';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { ReloadIcon } from '@radix-ui/react-icons';

type ChangeSphereDescriptionProps = {
  description: string;
  id: string;
};

const ChangeSphereDescription = ({
  description,
  id,
}: ChangeSphereDescriptionProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: z.infer<typeof updateSphereSchema>) => {
      return await modifySphereAction(id, payload);
    },
  });
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof sphereDescriptionSchema>>({
    resolver: zodResolver(sphereDescriptionSchema),
    defaultValues: {
      description,
    },
  });
  const onSubmit = (value: z.infer<typeof sphereDescriptionSchema>) => {
    console.log({ sphereDes: value });
    mutate(value, {
      onSuccess() {
        setIsProcessing(true);
        queryClient.invalidateQueries({
          queryKey: ['sphere', 'spheres', id],
        });
        setIsProcessing(false);
        toast({
          title: 'Description changed successfully.',
        });
      },
      onError(error: Error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error?.message,
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => onSubmit(form.getValues())}
            >
              Try again
            </ToastAction>
          ),
        });
      },
    });
  };
  return (
    <Card>
      <Card.Title>Description</Card.Title>
      <Card.Description>
        A brief overview of your sphere. This will be public and used by AI to
        generate suggestions for users.
      </Card.Description>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card.Body>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="max-w-2xl rounded" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card.Body>
          <Card.Footer className="flex items-center justify-between">
            <p>Please use 1k characters at maximum.</p>
            <Button className="rounded" variant="primarySquare">
              {(isPending || isProcessing) && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </Card.Footer>
        </form>
      </Form>
    </Card>
  );
};

export default ChangeSphereDescription;
