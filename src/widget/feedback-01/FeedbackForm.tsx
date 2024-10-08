'use client';
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
import { Textarea } from '@/components/ui/textarea';

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

const FeedbackForm = () => {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {},
  });
  function onSubmit(values: z.infer<typeof feedbackSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        >
          Send Feedback
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
