import { cn } from '@/lib/utils';

interface HeroProps {
  children: React.ReactNode;
  className?: string;
}

interface HeroElementProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroTitle = ({ children, className }: HeroElementProps) => {
  return (
    <h1 className={cn('text-gradient my-6 text-5xl md:text-7xl', className)}>
      {children}
    </h1>
  );
};

export const HeroSubtitle = ({ children, className }: HeroElementProps) => {
  return (
    <p
      className={cn(
        'text-md mb-12 text-muted-foreground md:text-lg',
        className
      )}
    >
      {children}
    </p>
  );
};

export const Hero = ({ children, className }: HeroProps) => {
  return <div className={cn('text-center', className)}>{children}</div>;
};
