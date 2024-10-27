import React from 'react';
import { apidoc } from '#site/content';
import { MDXContent } from '@/components/mdx/mdx-components';
import Container from '@/components/ui/container';
import APIKey from '../_features/APIKey';
const Api = () => {
  const apiDoc = apidoc?.[0];
  return (
    <>
      <div className="relative w-full border-b bg-secondary/10">
        <Container className="max-w-5xl space-y-4 py-10">
          <h1 className="text-xl md:text-2xl xl:text-3xl">REST API</h1>
          <p className="text-muted-foreground">
            The Whisper REST API is a REST-styled API that gives control over
            the feedback collection process.
          </p>
        </Container>
      </div>
      <Container className="my-8 mb-24 grid max-w-5xl gap-8">
        <APIKey />
        <div className="">
          {apiDoc?.content && <MDXContent code={apiDoc?.content} />}
        </div>
      </Container>
    </>
  );
};

export default Api;
