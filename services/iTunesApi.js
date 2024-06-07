import axios from 'axios';

const API_URL = 'https://itunes.apple.com/search';

export const searchiTunes = async (term, media = 'music') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        term,
        media,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data from iTunes API', error);
    throw error;
  }
};
