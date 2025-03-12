import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PlayerInfoModal from './PlayerInfoModal';

export default {
  title: 'PlayerInfoModal',
  component: PlayerInfoModal,
  argTypes: {
    selectedPokemons: { control: 'object' },
    firstName: { control: 'text' },
    lastName: { control: 'text' },
  },
} as Meta<typeof PlayerInfoModal>;

// Шаблон для сторіс
const Template: StoryFn<typeof PlayerInfoModal> = (args) => <PlayerInfoModal/>;

export const Default = Template.bind({});
Default.args = {
  selectedPokemons: [],
  firstName: '',
  lastName: '',
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  firstName: 'J', // Тестовий кейс для валідації
  lastName: 'C',
  selectedPokemons: [{ name: 'Squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7' }],
};
