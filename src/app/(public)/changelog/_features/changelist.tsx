import React from 'react';
import { changelog } from '#site/content';
import { Timeline } from '@/components/ui/timeline';
import ChangeLogItem from './changelogitem';
import { Image } from 'velite';
import { formateDate } from '@/lib/utils';

const ChangeList = async () => {
  const changelist = changelog;
  return changelist?.length > 0 ? (
    <ChangeLogTimeline data={changelist} />
  ) : (
    <h1>Noting to show</h1>
  );
};

export default ChangeList;

type ChangeLogTimelineProps = {
  data: {
    permalink: string;
    title: string;
    slug: string;
    date: string;
    content: string;
    metadata: {
      author?: string | undefined;
      tags?: string[] | undefined;
    };
    cover: Image | undefined;
    description?: string | undefined;
  }[];
};

function ChangeLogTimeline({ data }: ChangeLogTimelineProps) {
  return (
    <div className="mx-auto mt-8 w-full max-w-screen-md px-8">
      <Timeline
        data={data.map(({ cover, date, permalink, description, title }) => ({
          date: formateDate(date),
          content: (
            <ChangeLogItem
              path={`changelog/${permalink}`}
              cover={cover?.src ?? ''}
              title={title}
              description={description}
              key={permalink}
            />
          ),
        }))}
      />
    </div>
  );
}
