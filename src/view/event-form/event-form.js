import AbstractView from '@view/abstract';
import {createEventFormTemplate} from './event-form.template';

export default class EventForm extends AbstractView {
  constructor(event, isAdd) {
    super();

    this._event = event;
    this._isAdd = isAdd;

    this._arrowClickHandler = this._arrowClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createEventFormTemplate(this._event, this._isAdd);
  }

  _arrowClickHandler(evt) {
    evt.preventDefault();
    this._callback.arrowClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setArrowClickHandler(callback) {
    this._callback.arrowClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._arrowClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }
}
