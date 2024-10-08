import Container from '@/components/ui/container';
import React from 'react';

import Link from 'next/link';
import { LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import ChangeList from './_features/changelogs';

const Changelog = () => {
  return (
    <section className="mt-16">
      <div className="border-b">
        <Container className="flex w-full max-w-screen-md flex-col items-start justify-between gap-4 border-r border-border px-8 py-24 md:flex-row md:items-center">
          <div className="flex flex-1 flex-col-reverse items-start gap-3 self-start">
            <div className="flex max-w-[800px] flex-col items-start justify-center gap-1 self-start">
              <h1 className="text-3xl font-medium dark:text-gradient md:text-4xl">
                Changelog
              </h1>
            </div>
            <p className="max-w-screen-md text-pretty text-lg font-light text-muted-foreground md:text-xl">
              What are we shipping?
            </p>
          </div>
          <div className="flex items-center gap-2 md:flex-col">
            <p className="text-sm text-muted-foreground">Follow us on:</p>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/in/sudhanshuxsingh/"
                target="_blank"
              >
                <LinkedInLogoIcon className="h-5 w-5 text-muted-foreground transition-colors duration-200 hover:text-primary" />
              </Link>
              <Link href="https://twitter.com/sudhanshuxsingh" target="_blank">
                <TwitterLogoIcon className="h-5 w-5 text-muted-foreground transition-colors duration-200 hover:text-primary" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <ChangeList />
    </section>
  );
};

export default Changelog;
