import { widgetComponents } from '@/widget/index';
import { promises as fs } from 'fs';
import { z } from 'zod';
import { registryItemFileSchema } from '@/widget/schema';
import path from 'path';

const REGISTRY_BASE_PATH = 'src/widget';
const PUBLIC_FOLDER_BASE_PATH = 'public/widget';
const COMPONENT_FOLDER_PATH = 'components';
const TYPE = 'registry:block';

type File = z.infer<typeof registryItemFileSchema>;

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath);
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, data, 'utf-8');
    console.log(`File written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file`);
    console.error(error);
  }
}

const getComponentFiles = async (files: File[]) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    if (typeof file === 'string') {
      const filePath = `${REGISTRY_BASE_PATH}/${file}`;
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return {
        type: TYPE,
        content: fileContent,
        path: file,
        target: `${COMPONENT_FOLDER_PATH}/${file}`,
      };
    }
  });
  const filesArray = await Promise.all(filesArrayPromises);
  return filesArray;
};

const main = async () => {
  for (let i = 0; i < widgetComponents.length; i++) {
    const component = widgetComponents[i];
    const files = component.files;
    if (!files) throw new Error('No files found for component');
    const filesArray = await getComponentFiles(files);
    const json = JSON.stringify(
      {
        ...component,
        files: filesArray,
      },
      null,
      2
    );
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;
    await writeFileRecursive(jsonPath, json);
  }
};

main()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.error(err);
  });
