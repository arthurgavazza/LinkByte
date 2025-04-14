import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx', '../components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    // Add a special alias for the auth provider in Storybook context
    if (config.resolve && config.resolve.alias) {
      // @ts-expect-error - alias type is not fully defined in StorybookConfig
      config.resolve.alias['@/providers/auth-provider'] = require.resolve('../stories/mock-providers.tsx');
    }
    return config;
  },
}

export default config