import AbstractView from '@view/abstract';
import {createFilterTemplate} from './filter.template';

export default class Filter extends AbstractView {
  constructor(filters, currentFilter, emptyList) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilter;
    this._emptyFiltersList = emptyList;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter, this._emptyFiltersList);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target, evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
