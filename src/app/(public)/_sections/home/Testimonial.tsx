import { cn } from '@/lib/utils';
import { Marquee } from '@/components/ui/marquee';
import Image from 'next/image';

const reviews = [
  {
    name: 'Sarah L',
    designation: 'Product Manager at Tech Innovations',
    body: 'Whisper has completely transformed our feedback collection process. The AI-driven insights have helped us identify key areas for improvement in our product, and the integration with our existing tools was seamless. We can now gather real-time feedback from our users without any hassle!',
    img: '/avatars/sarah.jpeg',
  },
  {
    name: 'Mark T',
    designation: 'CEO of Creative Solutions',
    body: "As a startup, we needed a reliable way to collect customer feedback efficiently. Whisper's embeddable widgets and sharable links made it easy for us to implement feedback forms across our platforms. The secure custom authentication gives us peace of mind knowing our data is safe.",
    img: '/avatars/mark.jpeg',
  },
  {
    name: 'Emily R',
    designation: 'Marketing Director at Global Enterprises',
    body: 'Using Whisper has allowed us to analyze customer calls in real time, enhancing our customer service significantly. The transcription accuracy is impressive, and the insights we gain from the data help us tailor our marketing strategies effectively.',
    img: '/avatars/emily.jpeg',
  },
  {
    name: 'Jason K',
    designation: 'Developer at App Builders',
    body: 'Integrating Whisper into our applications was straightforward, thanks to their comprehensive API documentation. The ability to transcribe audio and generate summaries has streamlined our content creation process immensely.',
    img: '/avatars/json.jpeg',
  },
  {
    name: 'Linda P',
    designation: 'Head of Customer Experience at Retail Corp',
    body: "Whisper's ability to provide real-time feedback during customer interactions has improved our service quality tremendously. Our team feels more empowered to address customer needs promptly, leading to higher satisfaction rates.",
    img: '/avatars/linda.jpeg',
  },
  {
    name: 'Tom H.',
    designation: 'Operations Manager at FinTech Solutions',
    body: 'Whisper has been a game changer for our team meetings. The real-time transcription allows us to focus on discussions rather than taking notes, and we can easily refer back to key points later.',
    img: '/avatars/tom.jpeg',
  },
];

const ReviewCard = ({
  img,
  name,
  designation,
  body,
}: {
  img: string;
  name: string;
  designation: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative h-52 w-96 cursor-pointer overflow-hidden rounded-xl border p-4'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium">{name}</figcaption>
          <p className="text-xs font-medium text-muted-foreground">
            {designation}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-muted-foreground">
        {body}
      </blockquote>
    </figure>
  );
};

export default function Testimonial() {
  return (
    <div className="relative mb-24 flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {reviews.map((review) => (
          <ReviewCard key={review.designation} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
