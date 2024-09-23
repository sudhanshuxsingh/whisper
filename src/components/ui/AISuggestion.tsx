import { getAISuggestions } from '@/lib/actions/ai.actions';
import { ToastAction } from '@radix-ui/react-toast';
import { useToast } from '@/hooks/use-toast';
import MagicIcon from '@/components/ui/MagicIcon';
import { readStreamableValue } from 'ai/rsc';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
type AISuggestionProps = {
  setAISuggetions: (suggestion: string) => void;
  title: string;
  description: string;
  partial: string;
};

const AISuggestion = ({
  setAISuggetions,
  title,
  description,
  partial,
}: AISuggestionProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const populateSuggestions = async () => {
    try {
      setLoading(true);
      const { object } = await getAISuggestions(title, description, partial);
      for await (const partialObject of readStreamableValue(object)) {
        if (partialObject) {
          setAISuggetions(partialObject?.message);
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: JSON.stringify(error),
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => populateSuggestions()}
          >
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="border"
      onClick={populateSuggestions}
    >
      {loading ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : (
        <MagicIcon className="size-4 fill-primary" />
      )}
    </Button>
  );
};
export default AISuggestion;
