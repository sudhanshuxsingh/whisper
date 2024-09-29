import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sphereTitleSchema } from '@/schema/sphereSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ChangeSphereTitleProps = {
  title: string;
};

const ChangeSphereTitle = ({ title }: ChangeSphereTitleProps) => {
  const form = useForm<z.infer<typeof sphereTitleSchema>>({
    resolver: zodResolver(sphereTitleSchema),
    defaultValues: {
      title,
    },
  });
  const onSubmit = (value: z.infer<typeof sphereTitleSchema>) => {
    console.log(value);
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
            <Button className="rounded" variant="primarySquare">
              Save
            </Button>
          </Card.Footer>
        </form>
      </Form>
    </Card>
  );
};

export default ChangeSphereTitle;
