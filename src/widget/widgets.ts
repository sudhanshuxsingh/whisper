import { Registry } from './schema';

export const widgets: Registry = [
  {
    name: 'feedback-01',
    type: 'registry:block',
    registryDependencies: ['button', 'form', 'input', 'textarea', 'popover'],
    files: [
      'feedback-01/FeedbackButton.tsx',
      'feedback-01/FeedbackForm.tsx',
      'feedback-01/Icons.tsx',
      'feedback-01/FeedbackWidget.tsx',
    ],
  },
];
