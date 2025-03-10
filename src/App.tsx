import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Pokemon } from './types/Pokemon';
import { SelectedPokemons } from './components/SelectedPokemons';
import DropdownButton from './components/Dropdown';
import PokemonSprites from './components/PokemonSprites';
import PokemonSelect from './components/PokemonSelect';
import pokeBallBackG from './assets/images/pokeball.svg';
import backgroundImg from './assets/images/background.jpeg';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((response) => setPokemons(response.data.results));
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleTrimInput = (fieldName: string) => {
    const value = watch(fieldName).trim();
    setValue(fieldName, value);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <div className="flex justify-center items-start h-screen pt-40">
        <div
          className="flex justify-center items-start"
          style={{ position: 'absolute', top: '183px', left: '260px' }}
        >
          <PokemonSelect
            pokemons={pokemons}
            selectedPokemons={selectedPokemons}
            setSelectedPokemons={setSelectedPokemons}
            isVisible={isDropdownVisible}
          />
        </div>

        <div
          className="flex justify-center items-start"
          style={{ position: 'absolute', top: '-70px', right: '480px' }}
        >
          <SelectedPokemons
            selectedPokemons={selectedPokemons}
            setSelectedPokemons={setSelectedPokemons}
          />
        </div>

        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-full max-w-md space-y-7 z-50">
          {Object.keys(errors).length > 0 || warningMessage ? (
            <>
              {errors.firstName && (
                <div className="error-message">
                  First Name must be between 2 and 12 characters.
                </div>
              )}
              {errors.lastName && (
                <div className="error-message">
                  Last Name must be between 2 and 12 characters.
                </div>
              )}
              {warningMessage && (
                <div className="error-message">{warningMessage}</div>
              )}
            </>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md p-6 bg-amber-200 rounded-lg shadow-xl flex items-center relative"
        >
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                {...register('firstName', {
                  required: true,
                  minLength: 2,
                  maxLength: 12,
                  onBlur: () => handleTrimInput('firstName'),
                })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                {...register('lastName', {
                  required: true,
                  minLength: 2,
                  maxLength: 12,
                  onBlur: () => handleTrimInput('lastName'),
                })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              />
            </div>

            <div>
              <DropdownButton
                toggleDropdown={toggleDropdown}
                isVisible={isDropdownVisible}
              />
              {warningMessage && (
                <div className="error-message">{warningMessage}</div>
              )}
            </div>
          </div>

          <div className="ml-6">
            <button
              type="submit"
              disabled={selectedPokemons.length !== 4}
              className={`w-40 h-40 rounded-full text-white flex items-center justify-center shadow-lg transition-all duration-600 ease-in-out transform hover:scale-110`}
              style={{
                backgroundImage: `url(${pokeBallBackG})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter:
                  selectedPokemons.length !== 4
                    ? 'brightness(70%)'
                    : 'brightness(100%)',
                boxShadow:
                  selectedPokemons.length !== 4
                    ? '0 4px 6px rgba(0, 0, 0, 0.3)'
                    : '0 10px 20px rgba(0, 0, 0, 0.4)',
                pointerEvents: selectedPokemons.length !== 4 ? 'none' : 'auto',
                transition:
                  'filter 0.3s ease-out, box-shadow 0.3s ease-out, transform 0.3s ease-out',
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{ transform: 'translateY(-45px)' }}
              >
                <span
                  className="font-bold"
                  style={{
                    fontSize: '0.8rem',
                    color: 'white',
                    backgroundColor: 'black',
                    borderRadius: '5px',
                    paddingInline: '20px',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  To the Battle
                </span>
              </div>
            </button>
          </div>
        </form>
        <PokemonSprites selectedPokemons={selectedPokemons} />
      </div>
    </div>
  );
}

export default App;
