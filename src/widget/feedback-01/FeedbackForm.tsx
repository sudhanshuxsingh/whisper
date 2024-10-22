'use client';
import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Loader, CircleCheck } from './Icons';

const feedbackSchema = z.object({
  content: z
    .string({
      message: "Description can't be empty",
    })
    .min(10, 'Message must be of at least 10 character')
    .max(300, 'Message can be of at max 300 characters'),
  name: z
    .string()
    .min(3, {
      message: 'Name must be of atleast 3 character',
    })
    .max(50, {
      message: 'Name can be of at max 50 character',
    })
    .optional(),
  email: z.string().email({ message: 'Invalid Email' }).optional(),
  rating: z
    .number()
    .min(1, { message: "Rating value can't be less than 1" })
    .max(5, { message: "Rating value can't be more than 5" })
    .optional(),
  _id: z.string().optional(),
});

const FeedbackForm = ({ apiKey }: { apiKey: string }) => {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {},
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  async function onSubmit(values: z.infer<typeof feedbackSchema>) {
    setError(false);
    setSuccess(false);
    setLoading(true);
    try {
      const response = await fetch('/api/v1/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY-WHISPER': apiKey,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        setError(true);
        return;
      }
      setSuccess(true);
    } catch (error: unknown) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  return success ? (
    <SuccessResponse />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {error && (
          <div className="rounded-md border border-red-800/50 bg-red-700/10 p-4 text-xs">
            <p>Something went wrong! please try again</p>
          </div>
        )}
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
        <Button
          type="submit"
          className="!mt-6 ml-auto w-full rounded-sm bg-indigo-500 text-white hover:bg-indigo-600"
          disabled={loading}
        >
          {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Send Feedback
        </Button>
      </form>
    </Form>
  );
};

const SuccessResponse = () => (
  <div className="grid min-h-96 place-items-center">
    <div className="flex flex-col items-center gap-4 text-center">
      <CircleCheck className="h-6 w-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]" />
      <div className="space-y-1 text-sm">
        <p className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          Your feedback has been received!
        </p>
        <p className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          Thanks for the help
        </p>
      </div>
    </div>
  </div>
);

export default FeedbackForm;
