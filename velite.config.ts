import { defineConfig, s, defineCollection } from 'velite';

const changelog = defineCollection({
  name: 'changelog',
  pattern: 'changelog/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug(), //s.path
      date: s.isodate(),
      cover: s.image().optional(),
      content: s.mdx(),
      metadata: s.object({
        author: s.string().optional(),
        tags: s.array(s.string()).optional(),
      }),
    })
    .transform((data) => ({ ...data, permalink: `/changelog/${data.slug}` })),
});

const casestudy = defineCollection({
  name: 'casestudy',
  pattern: 'casestudy/**/*.mdx',
  schema: s.object({
    title: s.string().max(99),
    slug: s.slug('casestudy'), //s.path
    date: s.isodate(),
    cover: s.image(),
    metadata: s.metadata(),
    content: s.mdx(),
  }),
});

const userguide = defineCollection({
  name: 'casestudy',
  pattern: 'casestudy/**/*.mdx',
  schema: s.object({
    title: s.string().max(99),
    slug: s.slug('casestudy'), //s.path
    date: s.isodate(),
    cover: s.image(),
    metadata: s.metadata(),
    content: s.mdx(),
  }),
});

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    changelog,
    userguide,
    casestudy,
  },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
