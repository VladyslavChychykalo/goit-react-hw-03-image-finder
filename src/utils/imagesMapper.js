const imagesMapper = images => {
  return images.map(
    ({ webformatURL: link, largeImageURL: linkLarge, ...props }) => ({
      linkLarge,
      link,
      ...props,
    }),
  );
};

export default imagesMapper;
