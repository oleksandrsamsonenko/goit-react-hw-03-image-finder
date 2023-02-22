import axios from 'axios';

const imageInstance = axios.create({
  baseURL: 'https://pixabay.com/api',
});

export const searchImages = (q, page) => {
  return imageInstance.get('/', {
    params: {
      key: '32997992-21d577d14436d1c75bdc39ad8',
      orientation: 'horizontal',
      per_page: 12,
      q,
      page,
    },
  });
};
