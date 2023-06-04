import { useCallback, useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { GalleryItem } from './GalleryItem/GalleryItem';
import { StyledLoader } from './Loader/Loader.styled';

export const App = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [imagesLoadedSoFar, setImagesLoadedSoFar] = useState(0);

  const handleLoadingChange = useCallback(isLoading => {
    setIsLoading(isLoading);
  }, []);

  const onSearchSubmit = name => {
    setQ(name);
    setPage(1);
    setTotalHits(0);
    setImagesLoadedSoFar(0);
  };

  const onButtonClick = () => setPage(prevPage => prevPage + 1);

  const handleLoadedImagesChange = useCallback(images => {
    setImagesLoadedSoFar(prevState => prevState + images);
  }, []);

  const handleTotalHitsChange = useCallback(hits => {
    setTotalHits(hits);
  }, []);

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL(null);
  };

  return (
    <div>
      <SearchBar onSubmit={onSearchSubmit} />
      <ImageGallery
        showModal={showModal}
        largeImageURL={largeImageURL}
        closeModal={closeModal}
      >
        <GalleryItem
          q={q}
          page={page}
          openModal={openModal}
          onLoadingChange={handleLoadingChange}
          onLoadedImagesChange={handleLoadedImagesChange}
          onTotalHitsChange={handleTotalHitsChange}
        />
      </ImageGallery>

      <Button onClick={onButtonClick} hasMore={imagesLoadedSoFar < totalHits} />

      {isLoading && (
        <StyledLoader
          color={'cyan'}
          style={{
            margin: '-20px auto',
            position: 'static',
            display: 'block',
            width: '50px',
            height: '50px',
          }}
        />
      )}
    </div>
  );
};
