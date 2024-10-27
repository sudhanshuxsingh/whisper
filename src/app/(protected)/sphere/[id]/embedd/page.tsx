import Container from '@/components/ui/container';
import React from 'react';
import APIKey from '../_features/APIKey';
import FeedbackWidget from '@/widget/feedback-01/FeedbackWidget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeWindow from '@/components/ui/code-window';
const codeBlock = `<feedback-01 api-key="your-api-key-here"/>
<script src="https://whisper-widget.sudhanshuxsingh.in/feedback-widget/index.js"></script>`;
const Embedd = () => {
  return (
    <>
      <div className="relative w-full border-b bg-secondary/10">
        <Container className="max-w-5xl space-y-4 py-10">
          <h1 className="text-xl md:text-2xl xl:text-3xl">Web Embedd</h1>
          <p className="text-muted-foreground">
            Use this web component for integration to your application
          </p>
        </Container>
      </div>
      <Container className="my-8 mb-24 grid max-w-5xl gap-8">
        <Tabs defaultValue="preview" className="relative mt-2 w-full">
          <TabsList className="mb-4 w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="preview"
            className="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
          >
            <div className="grid h-[30rem] place-items-center rounded-md border bg-secondary/10">
              <FeedbackWidget apiKey="sample-api-key" />
            </div>
          </TabsContent>
          <TabsContent
            value="code"
            className="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
          >
            <CodeWindow language="html" codeWindowClassName="h-[27.6rem]">
              {codeBlock}
            </CodeWindow>
          </TabsContent>
        </Tabs>
        <APIKey />
      </Container>
    </>
  );
};

export default Embedd;
