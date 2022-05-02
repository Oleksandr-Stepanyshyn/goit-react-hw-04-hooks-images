import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '25219432-d17570f843575def2add98e41';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});

export const fetch = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&${searchParams}`
  );
  return response.data;
};
