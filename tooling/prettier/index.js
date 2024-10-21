import { fileURLToPath } from 'url'

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',

  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  // Tailwind
  tailwindConfig: fileURLToPath(new URL('../../tooling/tailwind/index.ts', import.meta.url)),
  tailwindFunctions: ['cn', 'cva'],

  // Sort Imports
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrder: [
    '<TYPES>',
    '^(next/(.*)$)|^(next$)',
    '^(expo(.*)$)|^(expo$)',
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^@yuki',
    '^@yuki/(.*)$',
    '',
    '<TYPES>^(@/(.*)$)',
    '<TYPES>^[.|..]',
    '^@/',
    '^[..]',
    '^[.]',
  ],

  // Others
  overrides: [
    { files: '*.json.hbs', options: { parser: 'json' } },
    { files: '*.js.hbs', options: { parser: 'babel' } },
  ],
}

export default config
