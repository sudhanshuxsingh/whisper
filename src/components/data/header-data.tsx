import { ExternalLinkIcon } from 'lucide-react';

export const MENU_ITEM_LIST = [
  {
    content: 'Features',
    href: '/features',
    openInNew: false,
  },
  {
    content: 'Changelog',
    href: '/changelog',
    openInNew: false,
  },
  // {
  //   content: 'Case Study',
  //   href: '/case-study',
  //   openInNew: false,
  // },
  {
    content: (
      <>
        Github <ExternalLinkIcon className="h-3 w-3" />
      </>
    ),
    href: 'https://github.com/sudhanshuxsingh/whisper',
    openInNew: true,
  },
];
