import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import fetchImages from 'services/image-api';
import imageMapper from 'utils/mapper';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Box from './Box';

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams === '') {
      return;
    }

    const loadImages = async (searchParams, page) => {
      setIsLoading(true);

      fetchImages(searchParams, page)
        .then(hits => {
          if (!hits.length) {
            throw new Error(
              toast.error(
                `Sorry, there are no images with query "${searchParams}". Please try again.`
              )
            );
          }
          setItems(items => [...items, ...imageMapper(hits)]);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };

    loadImages(searchParams, page);
  }, [page, searchParams]);

  const handleSearchSubmit = searchParams => {
    setSearchParams(searchParams);
    setPage(1);
    setItems([]);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr"
      gridGap="16px"
      pb="24px"
      as="main"
    >
      <Searchbar onSubmit={handleSearchSubmit} />

      {items.length > 0 && <ImageGallery images={items} />}

      {isLoading && <Loader />}

      {items.length > 0 && (
        <Button children="Load more" handleClick={loadMore} />
      )}

      <ToastContainer autoClose={3000} />
    </Box>
  );
};

export default App;
