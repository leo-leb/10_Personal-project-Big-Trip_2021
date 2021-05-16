import EventFormView from '@view/event-form/event-form';
import {render, remove} from '@utils/render';
import {RenderPosition, UserAction, UpdateType} from 'consts';
import {nanoid} from 'nanoid';
import {isEscEvent} from '@utils/event';

import dayjs from 'dayjs';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  dateTo: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  isFavorite: false,
  type: '',
  offers: [],
};

export default class EventNew {
  constructor(parrent, changeEventData) {
    this._parrent = parrent;
    this._changeEventData = changeEventData;

    this._formComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleFormEsc = this._handleFormEsc.bind(this);
  }

  init() {
    if (this._formComponent !== null) {
      return;
    }

    this._formComponent = new EventFormView(true, BLANK_EVENT);
    this._formComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formComponent.setFormDeleteHandler(this._handleCancelClick);

    render(this._parrent, this._formComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._handleFormEsc);
  }

  destroy() {
    if (this._formComponent === null) {
      return;
    }

    remove(this._formComponent);
    this._formComponent = null;
    document.removeEventListener('keydown', this._handleFormEsc);
  }

  _handleFormSubmit(event) {
    this._changeEventData(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      Object.assign({id: nanoid()}, event),
    );
    this.destroy();
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  _handleCancelClick() {
    this.destroy();
  }

  _handleFormEsc(evt) {
    isEscEvent(evt, () => {
      this.destroy();
    });
  }
}
