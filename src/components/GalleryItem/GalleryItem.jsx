import { useState, useEffect } from 'react';
import { getImgData } from 'API/API';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImage,
} from './GalleryItem.styled';

export const GalleryItem = ({
  q,
  page,
  openModal,
  onLoadingChange,
  onLoadedImagesChange,
  onTotalHitsChange,
}) => {
  const [imgData, setImgData] = useState([]);

  useEffect(() => {
    if (q.length > 0) {
      onLoadingChange(true);
      getImgData(q, page)
        .then(data => {
          if (page === 1) {
            setImgData(data.data.hits);
          } else {
            setImgData(prevImgData => [...prevImgData, ...data.data.hits]);
          }
          onLoadedImagesChange(data.data.hits.length);
          onTotalHitsChange(data.data.totalHits);
        })
        .finally(() => onLoadingChange(false));
    }
  }, [q, page, onLoadingChange, onLoadedImagesChange, onTotalHitsChange]);

  return (
    <>
      {imgData.map(({ id, webformatURL, largeImageURL }) => (
        <StyledImageGalleryItem key={nanoid()} className="ImageGallery-item">
          <StyledImageGalleryItemImage
            className="ImageGallery-image"
            src={webformatURL}
            alt={id}
            data-source={largeImageURL}
            onClick={() => openModal(largeImageURL)}
          />
        </StyledImageGalleryItem>
      ))}
    </>
  );
};

GalleryItem.propTypes = {
  q: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  onLoadingChange: PropTypes.func.isRequired,
  onLoadedImagesChange: PropTypes.func.isRequired,
  onTotalHitsChange: PropTypes.func.isRequired,
};
