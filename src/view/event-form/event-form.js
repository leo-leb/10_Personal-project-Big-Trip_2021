import SmartView from '@view/smart';
import {createEventFormTemplate} from './event-form.template';
import flatpickr from 'flatpickr';
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';
import {cloneDeep} from 'lodash';
import dayjs from 'dayjs';
import {getDefaultDate} from '@utils/transform';

export default class EventForm extends SmartView {
  constructor(isAdd, event, destinations, offers) {
    super();

    this._data = EventForm.parseEventToData(event);
    this._originalData = cloneDeep(event);
    this._isAdd = isAdd;

    this._destinations = destinations;
    this._offers = offers;

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
    return createEventFormTemplate(this._isAdd, this._data, this._destinations, this._offers);
  }

  reset() {
    this.updateData(EventForm.parseEventToData(this._originalData));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormDeleteHandler(this._callback.formDelete);
    (this._isAdd === false ? this.setRollUpClickHandler(this._callback.rollUpClick) : '');
  }

  setRollUpClickHandler(callback) {
    this._callback.rollUpClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollUpClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFormDeleteHandler(callback) {
    this._callback.formDelete = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteHandler);
  }

  _setDateFromPicker() {
    if(this._dateFromPicker) {
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }

    if(this._data.dateFrom) {
      const date = this._isAdd === true ? '' : dayjs(this._data.dateFrom).format('DD/MM/YY HH/MM');

      this._dateFromPicker = flatpickr(
        this.getElement().querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: date,
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
      const date = this._isAdd === true ? '' : dayjs(this._data.dateTo).format('DD/MM/YY HH/MM');

      this._dateToPicker = flatpickr(
        this.getElement().querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: date,
          onChange: this._dateToChangeHandler,
        },
      );
    }
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: getDefaultDate(userDate),
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: getDefaultDate(userDate),
    });
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollUpClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventForm.parseDataToEvent(this._data));
  }

  _formDeleteHandler(evt) {
    evt.preventDefault();
    this._callback.formDelete(EventForm.parseDataToEvent(this._data));
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
    const price = Number(evt.target.value);
    this.updateData({
      basePrice: price,
    }, true);
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    const newDestination = this._destinations.find((destination) => destination.name === evt.target.value);
    this.updateData({
      destination: newDestination,
    });
  }

  _offerClickHandler(evt) {
    evt.preventDefault();
    const target = evt.currentTarget.querySelector('.event__offer-title');

    const offers = this._data.offers.concat();

    const offersForDataType = this._offers.find((offer) => offer.type === this._data.type).offers;

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

  static parseEventToData(task) {
    return Object.assign(
      {},
      task,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
