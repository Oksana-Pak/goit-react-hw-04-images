import PropTypes from 'prop-types';
import { useState } from 'react';
import { GalletyItem, GalletyItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export function ImageGalleryItem({ url, urlLarge, tags }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <GalletyItem onClick={toggleModal}>
      {showModal && (
        <Modal urlLarge={urlLarge} tags={tags} onClose={toggleModal} />
      )}
      <GalletyItemImage src={url} alt={tags} />
    </GalletyItem>
  );
}
ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  urlLarge: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
