import { changelog } from '#site/content';
import { MDXContent } from '@/components/mdx/mdx-components';
import Container from '@/components/ui/container';
import { formateDate } from '@/lib/utils';
import {
  ArrowLeftIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

type ChangeLogDetailPageProps = {
  params: {
    slug: string[];
  };
};

async function getChangeItemFromParams({ params }: ChangeLogDetailPageProps) {
  const slug = params?.slug?.join('/');
  console.log({ params, slug });
  const change = changelog.find((changeItem) => {
    return changeItem.slug == slug;
  });

  return change;
}

export async function generateStaticParams(): Promise<
  ChangeLogDetailPageProps['params'][]
> {
  return changelog.map((changeItem) => ({
    slug: changeItem.permalink.split('/'),
  }));
}

const ChangeLogDetailPage = async ({ params }: ChangeLogDetailPageProps) => {
  const changeItem = await getChangeItemFromParams({ params });
  if (!changeItem) {
    return notFound();
  }
  return (
    <article className="mt-16">
      <div className="border-b">
        <Container className="flex w-full max-w-screen-md flex-col items-start justify-between gap-4 border-r border-border px-8 py-24 md:flex-row md:items-center">
          <div className="flex flex-1 flex-col items-start gap-3 self-start">
            <Link
              href="/changelog"
              className="text-text-tertiary dark:text-dark-text-tertiary flex w-max items-center gap-1 text-sm hover:underline md:text-sm"
            >
              <ArrowLeftIcon />
              Back to changelog
            </Link>
            <div className="flex max-w-[800px] flex-col items-start justify-center gap-1 self-start">
              <h1 className="text-3xl font-medium dark:text-gradient md:text-4xl">
                {changeItem.title}
              </h1>
            </div>

            <p className="text-text-tertiary dark:text-dark-text-tertiary text-sm md:text-base">
              {formateDate(changeItem.date)}
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
      <Container className="prose mx-auto max-w-screen-md px-8 pb-20 pt-16 dark:prose-invert">
        <Image
          src={changeItem.cover.src}
          alt={changeItem.title}
          width={changeItem.cover.width}
          height={changeItem.cover.width}
          className="rounded-lg"
        />
        <MDXContent code={changeItem.content} />
      </Container>
    </article>
  );
};

export default ChangeLogDetailPage;
