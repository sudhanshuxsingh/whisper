'use client';
import { feedbackSchema } from '@/schema/feedbackSchema';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Textarea } from '@/components/ui/textarea';
import AISuggestion from '@/components/ui/AISuggestion';
import { useMutation } from '@tanstack/react-query';
import { submitFeedbackAction } from '@/lib/actions/feedback.actions';
import { FeedbackSubmissionProps } from '@/types/feedback.types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useRouter } from 'next/navigation';
import Rating from './rating';

type FeedbackFormProps = {
  type: 'feedback' | 'message';
  showSuggestionToUser: boolean;
  sphereId: string;
  title: string;
  description: string;
};
const FeedbackForm = ({
  type,
  showSuggestionToUser,
  sphereId,
  title,
  description,
}: FeedbackFormProps) => {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {},
  });
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: FeedbackSubmissionProps) => {
      return submitFeedbackAction(values);
    },
  });
  const { toast } = useToast();
  const handleAISuggestion = (suggestion: string) => {
    form.setValue('content', suggestion);
  };
  function onSubmit(values: z.infer<typeof feedbackSchema>) {
    mutate(
      { ...values, sphereId },
      {
        onError: (error: Error) => {
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
        onSuccess: () => {
          router.push('success');
        },
      }
    );
  }
  return (
    <div className="rounded-lg border">
      <div
        className={`flex items-center justify-between border-b text-sm ${showSuggestionToUser ? 'p-2 px-4' : 'p-4'}`}
      >
        <p>Send your annonymus {type}</p>
        {showSuggestionToUser && (
          <AISuggestion
            setAISuggetions={handleAISuggestion}
            title={title}
            description={description}
            partial={form.getValues('content')}
          />
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sudhanshu Singh"
                    {...field}
                    className="rounded-sm bg-secondary/20"
                  />
                </FormControl>
                <FormDescription>This field is optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="sudhanshuxsingh@gmail.com"
                    {...field}
                    className="rounded-sm bg-secondary/20"
                  />
                </FormControl>
                <FormDescription>This field is optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Whishper is a best go to solution for getting annonymus feedbacks"
                    {...field}
                    className="rounded-sm bg-secondary/20"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type == 'feedback' && (
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Rating
                      rating={Number(field.value)}
                      setRating={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            type="submit"
            className="!mt-6 ml-auto w-full rounded-sm bg-indigo-500 text-white hover:bg-indigo-600"
          >
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Send Feedback
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
