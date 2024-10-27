'use client';
import Card from '@/components/ui/card';
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import {
  otherSphereConfigSchema,
  updateSphereSchema,
} from '@/schema/sphereSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { modifySphereAction } from '@/lib/actions/sphere.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SaveChangesButton from './SaveChangesButton';

type ChangSphereOtherConfigProps = {
  isAcceptingMessage: boolean;
  showSuggestionToUser: boolean;
  id: string;
};

const ChangSphereOtherConfig = ({
  isAcceptingMessage,
  showSuggestionToUser,
  id,
}: ChangSphereOtherConfigProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: z.infer<typeof updateSphereSchema>) => {
      return await modifySphereAction(id, payload);
    },
  });
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof otherSphereConfigSchema>>({
    resolver: zodResolver(otherSphereConfigSchema),
    defaultValues: {
      isAcceptingMessage,
      showSuggestionToUser,
    },
  });
  const onSubmit = (value: z.infer<typeof otherSphereConfigSchema>) => {
    mutate(value, {
      onSuccess() {
        setIsProcessing(true);
        queryClient.invalidateQueries({
          queryKey: ['sphere', 'spheres', id],
        });
        setIsProcessing(false);
        toast({
          title: 'Configuration changed successfully.',
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
      <Card.Title>Other Configurations</Card.Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card.Body className="mt-2 space-y-6 pt-2">
            <FormField
              control={form.control}
              name="isAcceptingMessage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Accept user messages/feedback</FormLabel>
                    <FormDescription>
                      Check if you want to accept messages from users.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="showSuggestionToUser"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel> Show AI suggestions to users</FormLabel>
                    <FormDescription>
                      Check if you want to show AI suggestions to users.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </Card.Body>
          <Card.Footer className="flex items-center justify-between">
            <SaveChangesButton
              isLoading={isPending || isProcessing}
              className="ml-auto"
            />
          </Card.Footer>
        </form>
      </Form>
    </Card>
  );
};

export default ChangSphereOtherConfig;
