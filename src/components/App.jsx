import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { fetchImages } from '../Api';
import { ErrorMessage } from './Services/Notifications';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus('pending');

    (async () => {
      try {
        const response = await fetchImages(query, page);
        if (!response.hits.length) {
          setStatus('rejected');
          ErrorMessage(`There are no images with ${query} name`);
          return;
        }

        const dataImages = response.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        setStatus('resolved');
        setImages(prevImages => [...prevImages, ...dataImages]);
        setTotalImages(response.totalHits);
      } catch {
        setStatus('rejected');
        ErrorMessage('Something wrong. Try again.');
      }
    })();
  }, [query, page]);

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
  };
  const handleFormSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  return (
    <Container>
      {status && (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          {(status === Status.PENDING || status === Status.RESOLVED) && (
            <>
              <ImageGallery items={images} />
              {status === Status.PENDING && <Loader />}
              {status === Status.RESOLVED && images.length < totalImages && (
                <Button onClick={handleButtonClick} />
              )}
            </>
          )}
          <ToastContainer />
        </>
      )}
    </Container>
  );
}
