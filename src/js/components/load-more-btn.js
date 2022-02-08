export default class LoadMoreBtn {
  constructor() {
    this.refs = this.getRefs();
  }

  getRefs() {
    const refs = {};
    refs.button = document.querySelector('.load-more');
    return refs;
  }
  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
