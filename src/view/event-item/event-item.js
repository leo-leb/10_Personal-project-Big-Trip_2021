import {createEventItemTemplate} from './event-item.template';
import {createElement} from '../../utils/render';

export default class EventItem {
  constructor(event) {
    this._event = event;

    this._element = null;
  }

  getTemplate() {
    return createEventItemTemplate(this._event);
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
