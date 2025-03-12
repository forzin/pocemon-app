import './PlayerInfoModal.css';
import { XMarkIcon, ChevronDownIcon} from '@heroicons/react/24/outline';
import { useState, useEffect } from "react"
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { getPocemons } from '../../api/getPocemons';
import ShowPokemons from '../ShowPokemons/ShowPokemons';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface Pokemon {
  name: string;
  url: string;
}

interface MyForm {
  firstName: string;
  lastName: string;
}


const PlayerInfoModal = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<MyForm>({
    mode: 'onChange',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [pocemons, setPocemons] = useState<any[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);

  const firstNameError = errors.firstName?.message
  const lastNameError = errors.lastName?.message
  const firstName = watch('firstName');
  const lastName = watch('lastName');

  const isFieldsValid = firstName && lastName && !errors.firstName && !errors.lastName;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const addToList = (pokemon: Pokemon) => {
    if (selectedPokemons.length < 4) {
      setSelectedPokemons((prev) => [...prev, pokemon]);
    } else {
      alert('You can only add up to 4 pokemons!');
    }
  }

  const submit: SubmitHandler<MyForm> = data => {
    console.log(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPocemons();
      setPocemons(data.results);
    };
    fetchData();
  }, [])

    return (
      <div className="modalOverlay">
        <div className="modalContainer">
          <div className="modalHeaderContainer">
            <h2 className="titleHeader">Select your team</h2>
            <XMarkIcon className="icon" />
          </div>
          <form action="" onSubmit={handleSubmit(submit)}>
            <div className="inputContainer">
              <label className="inputTitle" htmlFor="">First name</label>
              <input disabled={selectedPokemons.length > 0} className={`input ${firstNameError && 'borderRed'}`} type="text" {...register('firstName', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters long'
                },
                maxLength: {
                  value: 12,
                  message: 'Name must not exceed 12 characters'
                }
              })} placeholder='John' />
              {firstNameError && <p className="error">{firstNameError}</p>}
            </div>
            <div className="inputContainer">
              <label className="inputTitle" htmlFor="">Last name</label>
              <input disabled={selectedPokemons.length > 0} className={`input ${lastNameError && 'borderRed'}`} type="text" {...register('lastName', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters long'
                },
                maxLength: {
                  value: 12,
                  message: 'Name must not exceed 12 characters'
                }
              })} placeholder='Coperson' />
              {lastNameError && <p className="error">{lastNameError}</p>}
            </div>
            <div className="inputContainer">
              <label className="inputTitle" htmlFor="">Select your pocemons</label>
              <div className='iconContainer'>
                <input className="input" type="text" disabled={!isFieldsValid} />
                <button type='button'  className="buttonInput" onClick={toggleMenu} disabled={!isFieldsValid}>
                  <ChevronDownIcon className="iconInput" />
                </button>
                {isOpen && <DropDownMenu addToList={addToList} pocemons={pocemons} />}
                {selectedPokemons && <ShowPokemons selectedPokemons={selectedPokemons} setSelectedPokemons={setSelectedPokemons} />}
              </div>
            </div>
            <div className='footerModal'>
              <div className='buttonContainer'>
                <button className='buttonCancel' type="button">Cancel</button>
                <button className='buttonSave' type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default PlayerInfoModal;
