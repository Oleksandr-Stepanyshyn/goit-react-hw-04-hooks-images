import { useEffect, useState } from 'react';
import { fetchImg } from 'services/imageApi';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ErrorText } from './App.styled';

// export class App-old extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     totalImg: '',
//     page: null,
//     isLoader: false,
//     showModal: false,
//     modalImg: null,
//     error: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const prevQuery = prevState.searchQuery;
//     const nextQuery = this.state.searchQuery;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       this.setState({ isLoader: true });
//       fetchImg(nextQuery, nextPage)
//         .then(data =>
//           this.setState(({ images }) => ({
//             images: [...images, ...data.hits],
//             totalImg: data.totalHits,
//             isLoader: false,
//           }))
//         )
//         .catch(error => {
//           console.log(error);
//           alert('something went wrong :( Please enter a valid request');
//         });
//     }
//   }

//   handlSubmit = query => {
//     this.setState({ searchQuery: query, page: 1, images: [] });
//   };

//   setModalImg = imgUrl => {
//     this.setState({ modalImg: imgUrl });
//   };

// incrementPage = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   render() {
//     const { searchQuery, images, isLoader, totalImg, showModal, modalImg } =
//       this.state;
// const showMoreButton = totalImg > images.length;
// const errorRequest = totalImg === 0;

//     return (
//       <>
//         <Searchbar onSubmit={this.handlSubmit} />
//         {images.length > 0 && (
//           <ImageGallery>
//             {images.map(image => (
//               <ImageGalleryItem
//                 key={image.id}
//                 img={image}
//                 setModalImg={this.setModalImg}
//                 toggleModal={this.toggleModal}
//               />
//             ))}
//           </ImageGallery>
//         )}
//         {isLoader && <Loader />}
//         {showMoreButton && <Button incrementPage={this.incrementPage} />}
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={modalImg} alt="#" />
//           </Modal>
//         )}
//         {errorRequest && (
//           <ErrorText>No results found for "{searchQuery}" :(</ErrorText>
//         )}
//       </>
//     );
//   }
// }

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
    fetchImg(searchQuery, page)
      .then(data => {
        setImages(p => [...p, ...data.hits]);
        setTotalImg(data.totalHits);
        setIsLoader(false);
      })
      .catch(error => {
        console.log(error);
        alert('something went wrong :( Please enter a valid request');
      });
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
    </>
  );
};
