import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({
  img: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(p => !p);
  };

  return (
    <GalleryItem>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => {
          toggleModal();
        }}
      />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="#" />
        </Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.object.isRequired,
};
