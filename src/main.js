import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import { fetchPhotos } from './js/pixabay-api';
import { renderPhotos } from './js/render-function';

export const gallery = document.querySelector('.gallery');
export const userInput = document.querySelector('input');
const container = document.querySelector('.container');
const loadMoreBtn = document.querySelector('.load-more');
const fetchPicturesForm = document.querySelector('.form');

export let page = 1;

const showLoader = () => {
  const loader = document.createElement('span');
  loader.classList.add('loader');
  container.append(loader);
};

const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
};

const showLoadMoreButton = () => {
  loadMoreBtn.style.display = 'block';
};

const hideLoadMoreButton = () => {
  loadMoreBtn.style.display = 'none';
};

function shouldHideLoadMoreButton(loadedImagesCount, totalImagesCount) {
  return loadedImagesCount >= totalImagesCount;
}

fetchPicturesForm.addEventListener('submit', async e => {
  showLoader();
  page = 1;
  e.preventDefault();
  gallery.innerHTML = '';
  const userQuery = userInput.value.trim();
  if (userQuery === '') {
    hideLoader();
    return;
  }
  try {
    const photos = await fetchPhotos();
    renderPhotos(photos);

    hideLoader();
    showLoadMoreButton();

    if (photos.hits.length === 0) {
      iziToast.error({
        title: '',
        backgroundColor: '#EF4040',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
    if (shouldHideLoadMoreButton(gallery.children.length, photos.totalHits)) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    hideLoadMoreButton();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();
  try {
    page += 1;
    const photos = await fetchPhotos();
    renderPhotos(photos);
    hideLoader();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (gallery.children.length >= photos.totalHits) {
      iziToast.warning({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    hideLoader();
    hideLoadMoreButton();
  }
});
