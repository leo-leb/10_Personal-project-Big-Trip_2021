import AbstractView from '@view/abstract';
import {createFilterTemplate} from './filter.template';

export default class Filter extends AbstractView {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
