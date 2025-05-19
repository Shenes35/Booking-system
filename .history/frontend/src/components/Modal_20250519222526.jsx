import Modal from './Modal'; // correct the path
import { useState } from 'react';

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <Modal onClose={closeModal}>
          <h2>Hello from Modal!</h2>
        </Modal>
      )}
    </div>
  );
};
