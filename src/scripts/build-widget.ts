import * as esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function processCSS(filePath: string) {
  const cssContent = await fs.promises.readFile(filePath, 'utf8');
  const result = await postcss([tailwindcss]).process(cssContent, {
    from: filePath,
  });
  return result.css;
}

const cssLoader = {
  name: 'css-loader',
  setup(build: esbuild.PluginBuild) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const cssContent = await processCSS(args.path);
      return {
        contents: `export default ${JSON.stringify(cssContent)}`,
        loader: 'js',
      };
    });
  },
};

esbuild
  .build({
    entryPoints: [
      path.resolve(__dirname, '../widget/feedback-01/web-component/index.ts'),
    ],
    bundle: true,
    format: 'iife',
    globalName: 'widget',
    outfile: path.resolve(__dirname, '../../public/feedback-widget/index.js'),
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    target: 'esnext',
    loader: {
      '.jsx': 'jsx',
    },
    plugins: [cssLoader],
  })
  .then(() => {
    console.log('Build successful!');
  })
  .catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });
