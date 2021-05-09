import SmartView from '@view/smart';
import {createEventFormTemplate} from './event-form.template';
import {offersMock, destinations} from '@mock/event';
import flatpickr from 'flatpickr';
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';
import {cloneDeep} from 'lodash';

export default class EventForm extends SmartView {
  constructor(event, isAdd) {
    super();

    this._data = Object.assign({}, event);
    this._originalData = cloneDeep(event);

    this._isAdd = isAdd;
    this._dateFromPicker = null;
    this._dateToPicker = null;

    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._offerClickHandler = this._offerClickHandler.bind(this);
    this._formDeleteHandler = this._formDeleteHandler.bind(this);

    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
  }

  getTemplate() {
    return createEventFormTemplate(this._data, this._isAdd);
  }

  reset() {
    this.updateData(this._originalData);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
    this.setRollUpClickHandler(this._callback.rollUpClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormDeletetHandler(this._callback.formDelete);
  }

  setRollUpClickHandler(callback) {
    this._callback.rollUpClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollUpClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFormDeletetHandler(callback) {
    this._callback.formDelete = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteHandler);
  }

  _setDateFromPicker() {
    if(this._dateFromPicker) {
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }

    if(this._data.dateFrom) {
      this._dateFromPicker = flatpickr(
        this.getElement().querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._data.dateFrom,
          onChange: this._dateFromChangeHandler,
        },
      );
    }
  }

  _setDateToPicker() {
    if(this._dateToPicker) {
      this._dateToPicker.destroy();
      this._dateToPicker = null;
    }

    if(this._data.dateTo) {
      this._dateToPicker = flatpickr(
        this.getElement().querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._data.dateTo,
          onChange: this._dateToChangeHandler,
        },
      );
    }
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollUpClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _formDeleteHandler(evt) {
    evt.preventDefault();
    this._callback.formDelete(this._data);
  }

  _typeClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.dataset.type,
      offers: [],
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    const newDestination = destinations.find((element) => {
      return element.name === evt.target.value;
    });
    this.updateData({
      destination: newDestination,
    });
  }

  _offerClickHandler(evt) {
    evt.preventDefault();
    const target = evt.currentTarget.querySelector('.event__offer-title');

    const offers = this._data.offers.concat();
    const offersForDataType = offersMock.find((elem) => elem.type === this._data.type).offers;

    const isSameTitle = (item) => item.title === target.textContent;

    const index = offers.findIndex(isSameTitle);
    const newElement = offersForDataType.find(isSameTitle);

    if (offers.some(isSameTitle)) {
      if (index === 0) {
        offers.shift();
      } else {
        offers.splice(index, 1);
      }
    } else {
      offers.push(newElement);
    }

    this.updateData({
      offers: offers,
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._typeClickHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._priceInputHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationInputHandler);
    this.getElement().querySelectorAll('.event__offer-selector').forEach((elem) => elem.addEventListener('click', this._offerClickHandler));
  }
}
