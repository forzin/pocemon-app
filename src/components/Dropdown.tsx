import React from 'react';

interface Props {
  toggleDropdown: () => void;
  isVisible: boolean;
}

export const DropdownButton: React.FC<Props> = ({
  toggleDropdown,
  isVisible,
}) => (
  <div className="relative inline-block text-left">
    <button
      type="button"
      onClick={toggleDropdown}
      className="inline-flex justify-center w-56 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-500 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
    >
      {!isVisible ? 'Choose 4 pokemons' : 'Hide Pokemons'}
      <svg
        className={`-mr-1 ml-2 h-5 w-5 transform ${isVisible ? 'rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
);

export default DropdownButton;
