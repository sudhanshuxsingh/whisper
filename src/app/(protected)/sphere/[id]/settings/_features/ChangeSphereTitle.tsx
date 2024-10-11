'use client';
import Card from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { modifySphereAction } from '@/lib/actions/sphere.actions';
import { sphereTitleSchema, updateSphereSchema } from '@/schema/sphereSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SaveChangesButton from './SaveChangesButton';

type ChangeSphereTitleProps = {
  title: string;
  id: string;
};

const ChangeSphereTitle = ({ title, id }: ChangeSphereTitleProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: z.infer<typeof updateSphereSchema>) => {
      return await modifySphereAction(id, payload);
    },
  });
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof sphereTitleSchema>>({
    resolver: zodResolver(sphereTitleSchema),
    defaultValues: {
      title,
    },
  });
  const onSubmit = (value: z.infer<typeof sphereTitleSchema>) => {
    mutate(value, {
      onSuccess() {
        setIsProcessing(true);
        queryClient.invalidateQueries({
          queryKey: ['sphere', 'spheres', id],
        });
        setIsProcessing(false);
        toast({
          title: 'Title changed successfully.',
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
      <Card.Title>Title</Card.Title>
      <Card.Description>
        This is your sphere&apos;s title. It will be visible to everyone and
        will help AI provide relevant suggestions to users.
      </Card.Description>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card.Body>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="max-w-2xl rounded" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card.Body>
          <Card.Footer className="flex items-center justify-between">
            <p>Please use 200 characters at maximum.</p>
            <SaveChangesButton isLoading={isPending || isProcessing} />
          </Card.Footer>
        </form>
      </Form>
    </Card>
  );
};

export default ChangeSphereTitle;
