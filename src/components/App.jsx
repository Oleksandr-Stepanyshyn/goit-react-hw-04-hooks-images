import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { fetch } from 'services/imageApi';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ErrorText } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalImg, setTotalImg] = useState('');
  const [page, setPage] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoader(true);
    (async function fetchImg() {
      try {
        const data = await fetch(searchQuery, page);
        setImages(p => [...p, ...data.hits]);
        setTotalImg(data.totalHits);
        setIsLoader(false);
      } catch (error) {
        console.log(error);
        toast.error('something went wrong :( Please enter a valid request');
      }
    })();
  }, [searchQuery, page]);

  const handlSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setPage(p => p + 1);
  };

  const toggleModal = () => {
    setShowModal(p => !p);
  };

  const showMoreButton = totalImg > images.length;
  const errorRequest = totalImg === 0;

  return (
    <>
      <Searchbar onSubmit={handlSubmit} />
      {images.length > 0 && (
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              img={image}
              setModalImg={setModalImg}
              toggleModal={toggleModal}
            />
          ))}
        </ImageGallery>
      )}
      {isLoader && <Loader />}
      {showMoreButton && <Button incrementPage={incrementPage} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImg} alt="#" />
        </Modal>
      )}
      {errorRequest && (
        <ErrorText>No results found for "{searchQuery}" :(</ErrorText>
      )}
      <ToastContainer />
    </>
  );
};
