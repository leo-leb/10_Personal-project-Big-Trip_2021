import AbstractView from 'View/abstract';
import {createSortTemplate} from './sort.template';

export default class Sort extends AbstractView {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }
}
