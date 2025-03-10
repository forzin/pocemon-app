// SelectPokemons.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import App from '../App';

export default {
  title: 'Components/SelectPokemons',
  component: App,
} as Meta;

const Template: StoryFn = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {};
