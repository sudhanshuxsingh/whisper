import { defineConfig, s, defineCollection } from 'velite';
import rehypePreetyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
const changelog = defineCollection({
  name: 'changelog',
  pattern: 'changelog/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug(),
      date: s.isodate(),
      cover: s.image(),
      content: s.mdx(),
      description: s.string().optional(),
      metadata: s.object({
        author: s.string().optional(),
        tags: s.array(s.string()).optional(),
      }),
    })
    .transform((data) => ({ ...data, permalink: `${data.slug}` })),
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
    assets: 'public',
    base: '/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    changelog,
    userguide,
    casestudy,
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePreetyCode,
        {
          theme: {
            dark: 'github-dark-dimmed',
            light: 'github-light',
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
