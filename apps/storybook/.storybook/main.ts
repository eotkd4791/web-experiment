import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../../../packages/*/src/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/*/components/**/*.stories.@(ts|tsx|mdx)',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => ({
    ...config,
    plugins: config.plugins?.filter((plugin) => {
      if (!plugin || Array.isArray(plugin) || plugin instanceof Promise) return true;
      return plugin.name !== 'vite:storybook-inject-mocker-runtime';
    }),
  }),
};

export default config;
