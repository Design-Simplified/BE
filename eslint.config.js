import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jestPlugin from 'eslint-plugin-jest';
import importHelpersPlugin from 'eslint-plugin-import-helpers';
import jestFormattingPlugin from 'eslint-plugin-jest-formatting';
import unicornPlugin from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // Untuk mendukung konfigurasi berbasis eslintrc lama
});

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'logs/', 'tests/', 'jest.config.ts', 'prisma/'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
        project: ['./tsconfig.eslint.json'],
      },
    },
    settings: {
      jest: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.ts', '.bun.js', '.bun.ts'],
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettier,
      jest: jestPlugin,
      'import-helpers': importHelpersPlugin,
      'jest-formatting': jestFormattingPlugin,
      unicorn: unicornPlugin,
      import: importPlugin,
    },
    rules: {
      // Prettier Rules
      'prettier/prettier': 'error',

      // Jest Rules
      'jest/valid-expect': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/prefer-to-have-length': 'warn',

      // Jest Formatting
      'jest-formatting/padding-around-test-blocks': 'error',
      'jest-formatting/padding-around-describe-blocks': 'error',

      // TypeScript Rules
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
          filter: { regex: '^_.*$', match: false },
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '[A-Z]*Props$',
            match: true,
          },
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
      ],

      // Import Rules
      'import/no-default-export': 'error',
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
        },
      ],
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^node:/',
            '/^@testing-library/',
            '/^supertest/',
            'module',
            '/^configs/',
            '/^controllers/',
            '/^middlewares/',
            '/^errors/',
            '/^models/',
            '/^repositories/',
            '/^services/',
            '/^strategies/',
            '/^utils/',
            '/^validations/',
            '/^constants/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],

      // Unicorn Rules
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            props: { properties: false },
            env: { environment: false },
            ref: { reference: false },
            args: { arguments: false },
          },  
          allowList: {
            req: true,
            res: true,
            e: true,
            err: true,
            db: true,
            globalDb: true,
            tx: true,
            dir: true,
          }
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],

      // Other Rules
      'quote-props': ['error', 'consistent-as-needed'],
      'arrow-body-style': ['error', 'as-needed'],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'try' },
        { blankLine: 'always', prev: 'try', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'throw' },
        { blankLine: 'always', prev: 'var', next: '*' },
      ],
    },
  },
  // Overrides
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
    },
  },
];
