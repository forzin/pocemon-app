import { useState } from 'react';
import './DropDownMenu.css';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Pokemon {
  name: string;
  url: string;
}

interface DropdownModalProps {
    pocemons: any[];
    addToList: (pokemon: Pokemon) => void;
}

const DropDownMenu = ({ pocemons, addToList }: DropdownModalProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredPocemons = pocemons.filter((pocemon) =>
        pocemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="listContainer">
            <input className="searchBox" type="text" onChange={(event) => setSearchTerm(event.target.value)} placeholder="Find pokemon"/>
            <ul className="list">
                {filteredPocemons.map((pokemon, index) => (
                    <li key={index}>
                        <div className='listItemContainer'>
                            <p>{pokemon.name}</p>
                            <button type='button' onClick={() => addToList(pokemon)} className='buttonPlus'>
                                <PlusIcon className='iconPlus'/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropDownMenu;
