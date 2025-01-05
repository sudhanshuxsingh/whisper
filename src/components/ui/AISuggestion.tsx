import { getAISuggestionsAction } from '@/lib/actions/ai.actions';
import { ToastAction } from '@radix-ui/react-toast';
import { useToast } from '@/hooks/use-toast';
import MagicIcon from '@/components/ui/MagicIcon';
import { readStreamableValue } from 'ai/rsc';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LoaderIcon } from 'lucide-react';
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
      const { object } = await getAISuggestionsAction(
        title,
        description,
        partial
      );
      for await (const partialObject of readStreamableValue(object)) {
        if (partialObject) {
          setAISuggetions(partialObject?.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! AI suggestion limit excedded',
        description: 'AI suggestion limit excedded for today.',
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
        <LoaderIcon className="h-4 w-4 animate-spin" />
      ) : (
        <MagicIcon className="size-4 fill-primary" />
      )}
    </Button>
  );
};
export default AISuggestion;
