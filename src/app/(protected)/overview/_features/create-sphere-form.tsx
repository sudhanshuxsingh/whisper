'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { sphereSchema } from '@/schema/sphereSchema';
import { Button } from '@/components/ui/button';

import { ToastAction } from '@/components/ui/toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { createSphereAction } from '@/lib/actions/sphere.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { SphereProps } from '@/types/sphere.types';
import { useRouter } from 'next/navigation';
import { ActionResponse } from '@/types/response.types';
import { LoaderIcon } from 'lucide-react';

const CreateSphereForm = () => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: (sphere: z.infer<typeof sphereSchema>) => {
      return createSphereAction(sphere);
    },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof sphereSchema>>({
    resolver: zodResolver(sphereSchema),
    defaultValues: {
      description: '',
      title: '',
      showSuggestionToUser: false,
      type: 'message',
      isAcceptingMessage: true,
    },
  });

  function onSubmit(values: z.infer<typeof sphereSchema>) {
    mutate(values, {
      onSuccess({ data: sphere, error, code }: ActionResponse<SphereProps>) {
        setIsProcessing(true);
        if (error) {
          const title =
            code == 401
              ? 'Please wait! You have exhausted your limit'
              : 'Uh oh! Something went wrong.';
          toast({
            variant: 'destructive',
            title,
            description: error,
            action: (
              <ToastAction
                altText="Try again"
                onClick={() => onSubmit(form.getValues())}
              >
                Try again
              </ToastAction>
            ),
          });
        }
        if (sphere) {
          queryClient.invalidateQueries({
            queryKey: ['spheres'],
            refetchType: 'active',
          });
          router.push(`/sphere/${sphere._id}`);
        }
        setIsProcessing(false);
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="rounded-sm">
                    <SelectValue placeholder="Select sphere type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="message">Message</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                If you select type as feedback you will be able to recieve
                rating from users
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Feedback for whisper"
                  {...field}
                  className="rounded-sm"
                />
              </FormControl>
              <FormDescription>This will be publicly visible</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Please provide your feedback for the wishper functionalities."
                  {...field}
                  className="rounded-sm"
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                This will be used for AI suggestions to users
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="!mt-6 w-full rounded-sm bg-indigo-500 text-white hover:bg-indigo-600"
          disabled={isPending || isProcessing}
        >
          {(isPending || isProcessing) && (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateSphereForm;
