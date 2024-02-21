import axios from 'axios';
import { userInput } from '../main';
import { page } from '../main';
let per_page = 60;

export async function fetchPhotos() {
  const params = new URLSearchParams({
    page: page,
    per_page: per_page,
  });
  const apiKey = '42261083-50fe706ca9c2c1734499a9937';
  const query = userInput.value.trim();
  const response = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  return response.data;
}
