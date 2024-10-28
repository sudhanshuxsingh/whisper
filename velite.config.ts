import { defineConfig, s, defineCollection } from 'velite';
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

const apidoc = defineCollection({
  name: 'apidoc',
  pattern: 'api-doc.mdx',
  schema: s
    .object({
      title: s.string().max(90),
      slug: s.slug(),
      date: s.isodate(),
      metadata: s.object({
        author: s.string().optional(),
        tags: s.array(s.string()).optional(),
      }),
      content: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `${data.slug}` })),
});

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/velite',
    base: '/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    changelog,
    userguide,
    casestudy,
    apidoc,
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      // [
      //   rehypePreetyCode,
      //   {
      //     theme: {
      //       dark: 'github-dark-dimmed',
      //       light: 'github-light',
      //     },
      //   },
      // ],
    ],
    remarkPlugins: [],
  },
});
