import React, { useEffect, useState } from 'react';
import { getPokemonSprite } from '../api/getPokemon';

interface PokemonSpritesProps {
  selectedPokemons: string[];
}

export const PokemonSprites: React.FC<PokemonSpritesProps> = ({
  selectedPokemons,
}) => {
  const [sprites, setSprites] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPokemons.length === 4) {
      const getSprites = async () => {
        const newSprites = await Promise.all(
          selectedPokemons.map((pokemonName) => getPokemonSprite(pokemonName))
        );
        setSprites(newSprites);
      };
      getSprites();
    } else {
      setSprites([]);
    }
  }, [selectedPokemons]);

  return (
    <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {sprites.length === 4 && (
        <div className="flex space-x-6 justify-center">
          {sprites.map((spriteUrl, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={spriteUrl}
                alt={`Pokemon ${index + 1}`}
                className="w-24 h-24 rounded-lg shadow-lg border border-gray-300 duration-700 transform hover:scale-125"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonSprites;
