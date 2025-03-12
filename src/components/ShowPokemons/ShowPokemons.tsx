import "./ShowPokemons.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getCourentSprite } from "../../api/getPocemons";
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Pokemon {
    name: string;
    url: string;
}

interface ShowPokemonsProps {
    selectedPokemons: Pokemon[];
    setSelectedPokemons: Dispatch<SetStateAction<Pokemon[]>>;  
}

const ShowPokemons = ({ selectedPokemons, setSelectedPokemons }: ShowPokemonsProps) => {
    const [pokemonsWithSprites, setPokemonsWithSprites] = useState<any[]>([]);

    useEffect(() => {
        const fetchPokemonSprites = async () => {
            const pokemonSprites = await Promise.all(
                selectedPokemons.map(async (pokemon) => {
                    const data = await getCourentSprite(pokemon.name);
                    return {
                        id: data.id,
                        name: pokemon.name, 
                        sprite: data.sprites.front_shiny
                    };
                })
            )
            setPokemonsWithSprites(pokemonSprites);
        }
        fetchPokemonSprites();
    }, [selectedPokemons]);

    const handleDeleteClick = (name: string) => {
        setSelectedPokemons((prev) => {
            const indexToDelete = prev.findIndex((pokemon) => pokemon.name === name);
            if (indexToDelete !== -1) {
                const newPokemons = [...prev];
                newPokemons.splice(indexToDelete, 1); 
                return newPokemons;
            }
            return prev;
        });
    };

    return (
        <div>
            <ul className="selectedPokemonsList">
                {pokemonsWithSprites.map((pokemon, index) => (
                    <li key={`${pokemon.id}-${index}`} className="spriteContainer">
                        <img src={pokemon.sprite} alt={pokemon.name} width="60" height="60"/>
                        <button type="button" onClick={() => handleDeleteClick(pokemon.name)} className="deleteSprite">
                            <XMarkIcon className="iconXMark"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShowPokemons;