import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { gallery } from '../main';
let lightbox;

export function renderPhotos(data) {
  const markup = data.hits
    .map(data => {
      return `<li class="gallery-item"><a href="${data.webformatURL}">
              <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
              <p>Likes: ${data.likes}</p>
              <p>Views: ${data.views}</p>
              <p>Comments: ${data.comments}</p>
              <p>Downloads: ${data.downloads}</p>
              </li>`;
    })
    .join('');

  if (lightbox) {
    lightbox.destroy();
  }

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox = new SimpleLightbox('.gallery a', options);
  lightbox.on('show.simplelightbox');
  lightbox.refresh();
}
const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animation: 250,
};
