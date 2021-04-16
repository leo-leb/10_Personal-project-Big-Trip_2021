import {createInfoTemplate} from './info.template';
import {createElement} from 'Utils/render';

export default class Info {
  constructor(trip) {
    this._trip = trip;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._trip);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
