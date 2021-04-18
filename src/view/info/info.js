import AbstractView from 'View/abstract';
import {createInfoTemplate} from './info.template';

export default class Info extends AbstractView {
  constructor(trip) {
    super();

    this._trip = trip;
  }

  getTemplate() {
    return createInfoTemplate(this._trip);
  }
}
