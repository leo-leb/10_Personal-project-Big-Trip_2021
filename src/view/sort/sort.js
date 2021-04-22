import AbstractView from '@view/abstract';
import {createSortTemplate} from './sort.template';

export default class Sort extends AbstractView {
  constructor(sorts) {
    super();
    this._sorts = sorts;

    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }

  setSortClickHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortClickHandler);
  }

  _sortClickHandler(evt) {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
