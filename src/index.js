import './css/style.css';
import imagesTemplate from './templates/images.hbs';
import PixabayAPIService from './js/api';
import LoadMoreBtn from './js/components/load-more-btn';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
Notiflix.Notify.init({
  position: 'right-top',
  distance: '4rem',
  opacity: 1,
});

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};
const API = new PixabayAPIService();
const loadMoreBtn = new LoadMoreBtn();
loadMoreBtn.hide();
let hitsCount;

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();
  API.query = e.currentTarget.elements.searchQuery.value;
  if (API.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again',
    );
    return;
  }
  loadMoreBtn.hide();
  API.resetPage();
  clearGallery();
  fetchImages();
  hitsCount = 0;
}
async function fetchImages() {
  const { hits, totalHits } = await API.fetchImages();
  if (hits.length === 0) {
    loadMoreBtn.hide();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again',
    );
  }
  hitsCount += hits.length;
  if (hitsCount > totalHits) {
    loadMoreBtn.hide();
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
  }
  appendGalleryMarkup(hits);
  loadMoreBtn.show();
  if (API.page === 2 && hits.length !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}
function appendGalleryMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesTemplate(images));
  lightbox.refresh();
  if (API.page > 2) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 1.6,
      behavior: 'smooth',
    });
  }
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}
// simplelightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
