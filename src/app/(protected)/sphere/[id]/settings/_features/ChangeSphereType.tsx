'use client';
import { Button } from '@/components/ui/button';
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { sphereTypeSchema } from '@/schema/sphereSchema';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

type ChangeSphereTypeProps = {
  type: 'message' | 'feedback';
};

const ChangeSphereType = ({ type }: ChangeSphereTypeProps) => {
  const form = useForm<z.infer<typeof sphereTypeSchema>>({
    resolver: zodResolver(sphereTypeSchema),
    defaultValues: {
      type,
    },
  });
  const onSubmit = (value: z.infer<typeof sphereTypeSchema>) => {
    console.log(value);
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
            <Button className="rounded" variant="primarySquare">
              Save
            </Button>
          </Card.Footer>
        </form>
      </Form>
    </Card>
  );
};

export default ChangeSphereType;
