import axios from 'axios';
import { ErrorMessage } from './components/Services/Notifications';

const URL = 'https://pixabay.com/api/';
const API_KEY = '31298446-18dbc6951dc09e2b2b9c5e503';

export const fetchImages = async (name, page) => {
  try {
    const response = await axios.get(
      `${URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&SameSite=None&Secure`
    );

    return response.data;
  } catch (error) {
    ErrorMessage('Something wrong. Try again.');
  }
};
