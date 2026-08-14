import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../../../packages/*/src/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/*/components/**/*.stories.@(ts|tsx|mdx)',
  ],
  framework: '@storybook/react-vite',
};

export default config;
