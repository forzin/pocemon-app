// .storybook/main.js
export default {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.cache = {
      type: 'filesystem',
    };

    return config;
  },

  docs: {
    autodocs: true,
  },

  addons: ['@chromatic-com/storybook'],
};
