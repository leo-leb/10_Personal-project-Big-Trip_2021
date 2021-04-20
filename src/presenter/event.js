import EventItemView from '@view/event-item/event-item';
import EventFormView from '@view/event-form/event-form';

import {render, replace, remove} from '@utils/render';
import {isEscEvent} from '@utils/event';
import {RenderPosition} from 'consts';

export default class Event {
  constructor(container) {
    this._eventContainer = container;

    this._itemComponent = null;
    this._formComponent = null;

    this._handleItemRollUpClick = this._handleItemRollUpClick.bind(this);
    this._handleFormRollUpClick = this._handleFormRollUpClick.bind(this);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormEsc = this._handleFormEsc.bind(this);
  }

  init(event) {
    const prevItemComponent = this._itemComponent;
    const prevFormComponent = this._formComponent;

    this._itemComponent = new EventItemView(event);
    this._formComponent = new EventFormView(event, false);

    this._itemComponent.setRollUpClickHandler(this._handleItemRollUpClick);
    this._formComponent.setRollUpClickHandler(this._handleFormRollUpClick);
    this._formComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevItemComponent === null || prevFormComponent === null) {
      this._renderItem();
      return;
    }

    if (this._eventContainer.getElement().contains(prevItemComponent.getElement())) {
      replace(this._itemComponent, prevItemComponent);
    }

    if (this._eventContainer.getElement().contains(prevFormComponent.getElement())) {
      replace(this._formComponent, prevFormComponent);
    }

    remove(prevItemComponent);
    remove(prevFormComponent);
  }

  _renderItem() {
    render(this._eventContainer, this._itemComponent, RenderPosition.BEFOREEND);
  }

  _replaceItemToForm() {
    replace(this._formComponent, this._itemComponent);
  }

  _replaceFormToItem() {
    replace(this._itemComponent, this._formComponent);
    document.removeEventListener('keydown', this._handleFormEsc);
  }

  _handleItemRollUpClick() {
    this._replaceItemToForm();
    document.addEventListener('keydown', this._handleFormEsc);
  }

  _handleFormRollUpClick() {
    this._replaceFormToItem();
  }

  _handleFormSubmit() {
    this._replaceFormToItem();
    document.removeEventListener('keydown', this._handleFormEsc);
  }

  _handleFormEsc(evt) {
    isEscEvent(evt, this._replaceFormToItem());
  }

  destroy() {
    remove(this._itemComponent);
    remove(this._formComponent);
  }
}
