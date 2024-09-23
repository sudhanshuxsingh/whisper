import Link from 'next/link';
import FeedbackHeader from '@/components/ui/FeedbackHeader';
import FeedbackForm from '@/components/ui/FeedbackForm';
import Container from '@/components/ui/container';
import SVGEmbeddedPreview from '@/components/ui/SVGEmbeddedPreview';

type WhisperFeedbakProps = {
  title: string;
  description: string;
  showSuggestionToUser: boolean;
  type: 'feedback' | 'message';
  sphereId: string;
};
type SpherePreviewProps = {
  url: string;
} & WhisperFeedbakProps;

const SpherePreview = ({ url, ...miniatureProps }: SpherePreviewProps) => {
  return (
    <div className="-mb-48 h-72 w-full rounded-md border bg-background p-2 lg:-mb-60 lg:h-80 xl:max-w-xl">
      <Link
        href={url}
        target="_blank"
        className="relative block h-full w-full overflow-hidden rounded-inherit border p-6"
      >
        <SVGEmbeddedPreview height={750} width={1024} className="h-[120%]">
          <WhisperFeedbak {...miniatureProps} />
        </SVGEmbeddedPreview>
      </Link>
    </div>
  );
};

const WhisperFeedbak = ({
  description,
  showSuggestionToUser,
  sphereId,
  title,
  type,
}: WhisperFeedbakProps) => (
  <Container className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1fr_30rem]">
    <FeedbackHeader title={title} description={description} />
    <FeedbackForm
      type={type}
      showSuggestionToUser={showSuggestionToUser}
      sphereId={sphereId}
    />
  </Container>
);

export default SpherePreview;
