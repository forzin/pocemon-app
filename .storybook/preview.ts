// .storybook/preview.js
import { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: {
        brandImage: '/luna_logo.svg',
        brandTitle: 'Luna Edge',
        brandUrl: '/',
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
