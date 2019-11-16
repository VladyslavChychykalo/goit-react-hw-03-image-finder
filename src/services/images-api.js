import axios from 'axios';

const API_KEY = `14259511-dd01cdbc11ca08947c24eb055`;

const fetchImages = query => {
  const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=2&per_page=12&key=`;

  return axios.get(BASE_URL + API_KEY);
};

export default fetchImages;
