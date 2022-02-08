import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/';

export default class PixabayAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const options = {
      params: {
        key: '25583037-a5404a14e1dce136772e20a61',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: this.page,
      },
    };
    const response = await axios.get('api/', options);
    const images = await response.data;
    this.incrementPage();
    return images;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
