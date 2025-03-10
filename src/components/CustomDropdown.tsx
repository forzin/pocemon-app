import React, { useState } from 'react';
import { Pokemon } from '../types/Pokemon';

interface DropdownProps {
  isVisible: boolean;
  toggleDropdown: () => void;
  pokemons: Pokemon[];
  selectedPokemons: string[];
  setSelectedPokemons: React.Dispatch<React.SetStateAction<string[]>>;
  setWarningMessage: React.Dispatch<React.SetStateAction<string>>; // Додаємо setWarningMessage
}

const CustomDropdown = ({
  isVisible,
  pokemons,
  selectedPokemons,
  setSelectedPokemons,
}: DropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Фільтрація покемонів за запитом, але зберігаємо вибраних покемонів
  const filteredPokemons = pokemons.filter((pokemon) => {
    // Повертаємо або покемонів, що підходять під запит, або вже вибраних покемонів
    return (
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      selectedPokemons.includes(pokemon.name)
    );
  });

  const handleSelection = (pokemon: string) => {
    // Якщо вибрано більше 4 покемонів, не даємо додати новий
    if (selectedPokemons.length >= 4 && !selectedPokemons.includes(pokemon)) {
      return;
    }

    const updatedSelection = selectedPokemons.includes(pokemon)
      ? selectedPokemons.filter((item) => item !== pokemon)
      : [...selectedPokemons, pokemon];
    setSelectedPokemons(updatedSelection);
  };

  return (
    <div className="relative">
      {isVisible && (
        <div
          className="absolute z-10 mt-2 w-56 border border-gray-200 rounded-md bg-white shadow-lg"
          style={{
            maxHeight: '250px', // Обмежуємо висоту
            overflowY: 'scroll', // Завжди показуємо вертикальну прокрутку
          }}
        >
          <div className="p-2">
            {/* Інпут для фільтрації */}
            <input
              type="text"
              placeholder="Search..."
              className="mb-2 p-2 w-full border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Відображення покемонів після фільтрації */}
            {filteredPokemons.map((pokemon) => (
              <div
                key={pokemon.name}
                className={`p-2 cursor-pointer hover:bg-blue-100 ${
                  selectedPokemons.includes(pokemon.name) ? 'bg-blue-100' : ''
                } flex items-center`}
                onClick={() => handleSelection(pokemon.name)}
              >
                {selectedPokemons.includes(pokemon.name) && (
                  <img
                    src="/images/pokeball.svg"
                    alt="Selected"
                    className="mr-2 w-5 h-5"
                  />
                )}
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Вибрані покемони під dropdown (все під dropdown, а не всередині) */}
    </div>
  );
};

export default CustomDropdown;
