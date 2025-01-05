'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSphereAction } from '@/lib/actions/sphere.actions';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DeleteSphereButton = ({
  className,
  id,
}: {
  className?: string;
  id: string;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await deleteSphereAction(id);
      if (error) {
        throw new Error(error);
      }
      return data;
    },
  });
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setIsProcessing(true);
      await mutateAsync();
      queryClient.invalidateQueries({
        queryKey: ['spheres'],
      });
      toast({
        title: 'Sphere deleted successfully.',
      });
      setIsProcessing(false);
      router.push('/overview');
    } catch (error: unknown) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please try after sometime',
        action: (
          <ToastAction altText="Try again" onClick={() => handleDelete()}>
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn('rounded', className)} variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 dark:bg-black">
        <AlertDialogHeader className="p-6">
          <AlertDialogTitle className="text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            sphere and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-secondary/40 p-6 py-4">
          <AlertDialogCancel
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'rounded border-background'
            )}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={cn(
              buttonVariants({ variant: 'destructive' }),
              'rounded'
            )}
          >
            {(isPending || isProcessing) && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSphereButton;
