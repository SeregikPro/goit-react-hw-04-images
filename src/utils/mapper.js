const imageMapper = imageList => {
  return imageList.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));
};

export default imageMapper;
