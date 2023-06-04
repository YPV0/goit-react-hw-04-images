import PropTypes from 'prop-types';
import { StyledImageGallery } from './ImageGallery.styled';
import { Modal } from 'components/Form/Form';

export const ImageGallery = ({
  showModal,
  largeImageURL,
  closeModal,
  children,
}) => {
  return (
    <div>
      <StyledImageGallery className="ImageGallery">
        {children}
      </StyledImageGallery>
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  showModal: PropTypes.bool.isRequired,
  largeImageURL: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
