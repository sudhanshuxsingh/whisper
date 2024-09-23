import Container from '@/components/ui/container';
import { Hero, HeroSubtitle, HeroTitle } from './_features/Hero';

export default function Home() {
  return (
    <main className="bg-page-gradient">
      <Container className="flex flex-col gap-4 pt-16">
        <Hero className="grid place-items-center py-12">
          <HeroTitle className="translate-y-[-1rem] animate-fade-in tracking-tighter opacity-0 [--animation-delay:200ms]">
            Go-to platform for anonymous
            <br className="hidden md:block" /> feedback collection
          </HeroTitle>
          <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            Organize feedback with spheres, get AI-driven suggestions, and{' '}
            <br className="hidden md:block" />
            integrate seamlessly into your website or app.
          </HeroSubtitle>
        </Hero>
      </Container>
    </main>
  );
}
