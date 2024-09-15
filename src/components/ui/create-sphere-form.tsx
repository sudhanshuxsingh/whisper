'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { sphereSchema } from '@/schema/sphereSchema';
import { Button } from '@/components/ui/button';
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
import { Textarea } from './textarea';
const CreateSphereForm = () => {
  const form = useForm<z.infer<typeof sphereSchema>>({
    resolver: zodResolver(sphereSchema),
    defaultValues: {
      description: '',
      title: '',
      showSuggestionToUser: false,
      type: 'message',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof sphereSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                <Select {...field} onValueChange={field.onChange}>
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
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateSphereForm;
