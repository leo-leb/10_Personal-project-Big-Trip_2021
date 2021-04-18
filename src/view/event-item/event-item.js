import AbstractView from 'View/abstract';
import {createEventItemTemplate} from './event-item.template';

export default class EventItem extends AbstractView {
  constructor(event) {
    super();
    this._event = event;

    this._arrowClickHandler = this._arrowClickHandler.bind(this);
  }

  getTemplate() {
    return createEventItemTemplate(this._event);
  }

  _arrowClickHandler(evt) {
    evt.preventDefault();
    this._callback.arrowClick();
  }

  setArrowClickHandler(callback) {
    this._callback.arrowClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._arrowClickHandler);
  }
}
