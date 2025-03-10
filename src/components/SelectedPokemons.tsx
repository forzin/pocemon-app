import React from 'react';

interface Props {
  selectedPokemons: string[];
  setSelectedPokemons: (updatedSelection: string[]) => void;
}

export const SelectedPokemons: React.FC<Props> = ({
  selectedPokemons,
  setSelectedPokemons,
}) => {
  const handleDeselect = (pokemon: string) => {
    const updatedSelection = selectedPokemons.filter(
      (item) => item !== pokemon
    );
    setSelectedPokemons(updatedSelection);
  };

  return (
    selectedPokemons.length > 0 && (
      <div className="absolute top-72 left-0 w-56 bg-white shadow-md border border-gray-200 rounded-md p-2 z-20">
        <h4 className="text-sm font-semibold">Selected Pokémon:</h4>
        <div className="space-y-2">
          {selectedPokemons.map((pokemon) => (
            <div
              key={pokemon}
              className="flex justify-between items-center p-2 bg-blue-100 text-blue-800 rounded-md"
            >
              <span>{pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</span>
              <button
                onClick={() => handleDeselect(pokemon)}
                className="text-sm font-bold text-red-500 hover:text-red-700"
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default SelectedPokemons;
