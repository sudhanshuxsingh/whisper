import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { otherSphereConfigSchema } from '@/schema/sphereSchema';
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

type ChangSphereOtherConfigProps = {
  isAcceptingMessage: boolean;
  showSuggestionToUser: boolean;
};

const ChangSphereOtherConfig = ({
  isAcceptingMessage,
  showSuggestionToUser,
}: ChangSphereOtherConfigProps) => {
  const form = useForm<z.infer<typeof otherSphereConfigSchema>>({
    resolver: zodResolver(otherSphereConfigSchema),
    defaultValues: {
      isAcceptingMessage,
      showSuggestionToUser,
    },
  });
  const onSubmit = (value: z.infer<typeof otherSphereConfigSchema>) => {
    console.log({ value });
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
            <Button className="ml-auto rounded" variant="primarySquare">
              Save
            </Button>
          </Card.Footer>
        </form>
      </Form>
    </Card>
  );
};

export default ChangSphereOtherConfig;
