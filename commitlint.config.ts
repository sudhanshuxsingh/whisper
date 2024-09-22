import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'page',
        'api',
        'component',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'app',
        'pages',
        'api',
        'components',
        'lib',
        'styles',
        'utils',
        'hooks',
        'types',
        'config',
        'deps',
      ],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [
      2,
      'always',
      [
        'sentence-case',
        'start-case',
        'pascal-case',
        'upper-case',
        'lower-case',
      ],
    ],
    'body-max-line-length': [2, 'always', 100],
  },
};

export default Configuration;
