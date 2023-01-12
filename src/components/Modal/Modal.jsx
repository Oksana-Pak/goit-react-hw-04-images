import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    urlLarge: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { urlLarge, tags } = this.props;
    const { handleBackdropClick } = this;
    return (
      <Overlay onClick={handleBackdropClick}>
        <ModalContainer>
          <img src={urlLarge} alt={tags} />
        </ModalContainer>
      </Overlay>
    );
  }
}
