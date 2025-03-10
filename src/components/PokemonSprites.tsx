import React, { useEffect, useState } from 'react';
import { getPokemonSprite } from '../api/getPokemon'; // Функція для отримання спрайтів покемонів

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
        if (selectedPokemons.length === 4) {
          const newSprites = await Promise.all(
            selectedPokemons.map((pokemonName) => getPokemonSprite(pokemonName))
          );
          setSprites(newSprites);
        }
      };

      getSprites();
    }

    setSprites([]);
  }, [selectedPokemons]);

  return (
    <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Контейнер для 4 спрайтів */}
      {sprites.length === 4 && (
        <div className="flex space-x-6 justify-center">
          {sprites.map((spriteUrl, index) => (
            <div key={index} className="flex justify-center">
              {/* Квадрати для відображення спрайтів */}
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
