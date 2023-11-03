import flowbitePlugin from 'flowbite/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './public/**/*.html',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [flowbitePlugin],
};
export default config;
