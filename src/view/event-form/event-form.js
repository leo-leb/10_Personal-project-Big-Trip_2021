import {createEventFormTemplate} from './event-form.template';
import {createElement} from 'Utils/render';

export default class EventForm {
  constructor(event, isAdd) {
    this._event = event;
    this._isAdd = isAdd;

    this._element = null;
  }

  getTemplate() {
    return createEventFormTemplate(this._event, this._isAdd);
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
