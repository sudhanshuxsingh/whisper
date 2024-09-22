import React from 'react';
type FeedbackHeaderProps = {
  title: string;
  description: string;
};
const FeedbackHeader = ({ title, description }: FeedbackHeaderProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-medium">{title}</h2>
      <Features />
      <p className="line-clamp-2 hidden text-sm text-muted-foreground md:block">
        {description}
      </p>
    </div>
  );
};
const Features = () => {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-center gap-2">
        <CheckCircleIcon />
        <p>100% Annonymity</p>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircleIcon />
        <p>Submit your true feedback</p>
      </div>
    </div>
  );
};

const CheckCircleIcon = () => {
  return (
    <svg
      className="bg-background fill-primary"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="img"
      focusable="false"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.784-8.571a.885.885 0 0 0-.037-1.2.768.768 0 0 0-1.13.04L7.148 9.19 5.332 7.477a.768.768 0 0 0-1.13.07.885.885 0 0 0 .067 1.199l2.011 1.897c.54.509 1.365.47 1.859-.09l3.645-4.124Z"
      ></path>
    </svg>
  );
};

export default FeedbackHeader;
