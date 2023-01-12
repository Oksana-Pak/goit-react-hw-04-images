import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalletyItem, GalletyItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    urlLarge: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { url, urlLarge, tags } = this.props;
    const { showModal } = this.state;
    const { toggleModal } = this;
    return (
      <GalletyItem onClick={toggleModal}>
        {showModal && (
          <Modal urlLarge={urlLarge} tags={tags} onClose={toggleModal} />
        )}
        <GalletyItemImage src={url} alt={tags} />
      </GalletyItem>
    );
  }
}
