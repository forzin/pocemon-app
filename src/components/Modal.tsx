interface ModalProps {
  isOpen: boolean;
  selectedPokemons: string[];
  onClose: () => void;
}

const Modal = ({ isOpen, selectedPokemons, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold">Your Pokémon Team</h2>
        <ul>
          {selectedPokemons.map((pokemon, index) => (
            <li key={index} className="py-2">
              {pokemon}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
