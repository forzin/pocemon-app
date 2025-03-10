import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite', // Для React з Vite
  stories: ['../src/**/*.stories.tsx'], // Шлях до історій
  addons: ['@storybook/addon-essentials', '@storybook/addon-links'],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};

export default config;
