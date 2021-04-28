import AbstractView from '@view/abstract';
import {createSortTemplate} from './sort.template';
import {SortType} from 'consts';

export default class Sort extends AbstractView {
  constructor(type) {
    super();
    this._actualSort = type;

    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._actualSort);
  }

  setSortClickHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortClickHandler);
  }

  _sortClickHandler(evt) {
    evt.preventDefault();
    const target = Object.values(SortType).find((element) => {
      return element.name === evt.target.dataset.sortType && element.isToggle;
    });
    this._callback.sortTypeChange(target);
  }
}
