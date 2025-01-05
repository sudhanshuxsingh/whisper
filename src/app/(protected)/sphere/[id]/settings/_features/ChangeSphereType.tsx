'use client';
import Card from '@/components/ui/card';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sphereTypeSchema, updateSphereSchema } from '@/schema/sphereSchema';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { modifySphereAction } from '@/lib/actions/sphere.actions';
import { ToastAction } from '@/components/ui/toast';
import SaveChangesButton from './SaveChangesButton';

type ChangeSphereTypeProps = {
  type: 'message' | 'feedback';
  id: string;
};

const ChangeSphereType = ({ type, id }: ChangeSphereTypeProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: z.infer<typeof updateSphereSchema>) => {
      const { data, error } = await modifySphereAction(id, payload);
      if (error) {
        throw new Error(error);
      }
      return data;
    },
  });
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof sphereTypeSchema>>({
    resolver: zodResolver(sphereTypeSchema),
    defaultValues: {
      type,
    },
  });
  const onSubmit = (value: z.infer<typeof sphereTypeSchema>) => {
    mutate(value, {
      onSuccess() {
        setIsProcessing(true);
        queryClient.invalidateQueries({
          queryKey: ['sphere', 'spheres', id],
        });
        setIsProcessing(false);
        toast({
          title: 'Type changed successfully.',
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
      <Card.Title>Type</Card.Title>
      <Card.Description>Select type of your sphere.</Card.Description>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card.Body>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="max-w-2xl rounded">
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card.Body>
          <Card.Footer className="flex items-center justify-between">
            <p>Please use feedback only if you want to recieve ratings</p>
            <SaveChangesButton isLoading={isPending || isProcessing} />
          </Card.Footer>
        </form>
      </Form>
    </Card>
  );
};

export default ChangeSphereType;
