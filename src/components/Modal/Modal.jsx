import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

export function Modal({ urlLarge, tags, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={urlLarge} alt={tags} />
      </ModalContainer>
    </Overlay>
  );
}

Modal.propTypes = {
  urlLarge: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
