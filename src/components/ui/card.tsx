import { cn } from '@/lib/utils';
import React from 'react';

type CardElementProps = {
  className?: string;
  children: React.ReactNode;
};
const Card = ({ className, children }: CardElementProps) => {
  return (
    <div className={cn('rounded-md border bg-secondary/10', className)}>
      {children}
    </div>
  );
};

const Title = ({ className, children }: CardElementProps) => {
  return (
    <h4 className={cn('px-6 pb-2 pt-6 text-xl font-medium', className)}>
      {children}
    </h4>
  );
};
const Description = ({ className, children }: CardElementProps) => {
  return (
    <p className={cn('px-6 pb-6 text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
};
const CardBody = ({ className, children }: CardElementProps) => {
  return <div className={cn('px-6 pb-6', className)}>{children}</div>;
};
const CardFooter = ({ className, children }: CardElementProps) => {
  return (
    <div
      className={cn(
        'border-t px-6 py-3 text-sm text-muted-foreground',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Title = Title;
Card.Description = Description;
Card.Body = CardBody;
Card.Footer = CardFooter;
export default Card;
