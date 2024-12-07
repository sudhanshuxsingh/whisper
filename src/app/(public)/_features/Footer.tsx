import Container from '@/components/ui/container';
import { LogoIcon } from '@/components/ui/header';
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
const footerLinks = [
  {
    title: 'Product',
    links: [
      { title: 'Features', href: '#' },
      { title: 'Integrations', href: '#' },
      { title: 'Changelog', href: '#' },
      { title: 'Docs', href: '#' },
      { title: 'Download', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About us', href: '#' },
      { title: 'Blog', href: '#' },
      { title: 'Careers', href: '#' },
      { title: 'Customers', href: '#' },
      { title: 'Brand', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Community', href: '#' },
      { title: 'Contact', href: '#' },
      { title: 'DPA', href: '#' },
      { title: 'Terms of service', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { title: 'API', href: '#' },
      { title: 'Status', href: '#' },
      { title: 'GitHub', href: '#' },
    ],
  },
];

export const Footer = () => (
  <footer className="border-transparent-white border-t py-[5.6rem] text-sm">
    <Container className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
      <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:flex-col sm:items-start">
        <LogoIcon className="" />
        <div className="text-grey flex space-x-4">
          <TwitterLogoIcon />
          <GitHubLogoIcon />
          <LinkedInLogoIcon />
        </div>
      </div>
      {footerLinks.map((column) => (
        <div key={column.title} className="min-w-[50%] lg:min-w-[18rem]">
          <h3 className="mb-3 font-medium">{column.title}</h3>
          <ul>
            {column.links.map((link) => (
              <li key={link.title} className="[&_a]:last:mb-0">
                <Link
                  className="mb-3 block text-muted-foreground transition-colors hover:text-primary"
                  href={link.href}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
    <p className="inset-x-0 mt-20 hidden bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-center text-5xl font-bold text-transparent dark:from-neutral-950 dark:to-neutral-800 md:block md:text-9xl lg:text-[12rem] xl:text-[13rem]">
      Whisper
    </p>
  </footer>
);
