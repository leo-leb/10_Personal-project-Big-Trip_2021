import EventItemView from '@view/event-item/event-item';
import EventFormView from '@view/event-form/event-form';
import {render, replace, remove} from '@utils/render';
import {isEscEvent} from '@utils/event';
import {RenderPosition, EventMode, UserAction, UpdateType, State} from 'consts';
import {toast} from '@utils/toast';
import {isOnline} from '@utils/common';

export default class Event {
  constructor(parent, changeEventData, changeMode, eventsModel) {
    this._parent = parent;
    this._changeEventData = changeEventData;
    this._changeMode = changeMode;

    this._itemComponent = null;
    this._formComponent = null;

    this._destinations = eventsModel.getDestinations();
    this._offers = eventsModel.getOffers();

    this._mode = EventMode.ITEM;

    this._handleItemFavoriteClick = this._handleItemFavoriteClick.bind(this);
    this._handleItemRollUpClick = this._handleItemRollUpClick.bind(this);
    this._handleFormRollUpClick = this._handleFormRollUpClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormEsc = this._handleFormEsc.bind(this);

    this._handleFormDelete = this._handleFormDelete.bind(this);
  }

  init(event) {
    this._event = event;

    const prevItemComponent = this._itemComponent;
    const prevFormComponent = this._formComponent;

    this._itemComponent = new EventItemView(event);
    this._formComponent = new EventFormView(false, event, this._destinations, this._offers);

    this._itemComponent.setFavoriteClickHandler(this._handleItemFavoriteClick);
    this._itemComponent.setRollUpClickHandler(this._handleItemRollUpClick);
    this._formComponent.setRollUpClickHandler(this._handleFormRollUpClick);
    this._formComponent.setFormSubmitHandler(this._handleFormSubmit);

    this._formComponent.setFormDeleteHandler(this._handleFormDelete);

    if (prevItemComponent === null || prevFormComponent === null) {
      this._renderItem();
      return;
    }

    if (this._mode === EventMode.ITEM) {
      replace(this._itemComponent, prevItemComponent);
    }

    if (this._mode === EventMode.FORM) {
      replace(this._itemComponent, prevFormComponent);
      this._mode = EventMode.ITEM;
    }

    remove(prevItemComponent);
    remove(prevFormComponent);
  }

  destroy() {
    remove(this._itemComponent);
    remove(this._formComponent);
  }

  resetView() {
    if (this._mode !== EventMode.ITEM) {
      this._replaceFormToItem();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._formComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._formComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._formComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._itemComponent.shake(resetFormState);
        this._formComponent.shake(resetFormState);
        break;
    }
  }

  _renderItem() {
    render(this._parent, this._itemComponent, RenderPosition.BEFOREEND);
  }

  _replaceItemToForm() {
    replace(this._formComponent, this._itemComponent);
    this._changeMode();
    this._mode = EventMode.FORM;
  }

  _replaceFormToItem() {
    replace(this._itemComponent, this._formComponent);
    document.removeEventListener('keydown', this._handleFormEsc);
    this._mode = EventMode.ITEM;
  }

  _handleItemFavoriteClick() {
    this._changeEventData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._event.isFavorite,
        },
      ),
    );
  }

  _handleItemRollUpClick() {
    this._replaceItemToForm();
    document.addEventListener('keydown', this._handleFormEsc);
  }

  _handleFormRollUpClick() {
    this._formComponent.reset();
    this._replaceFormToItem();
  }

  _handleFormSubmit(event) {
    if (!isOnline()) {
      toast('You can\'t save event offline');
      return;
    }

    this._changeEventData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event,
    );

    document.removeEventListener('keydown', this._handleFormEsc);
  }

  _handleFormEsc(evt) {
    isEscEvent(evt, () => {
      this._formComponent.reset();
      this._replaceFormToItem();
    });
  }

  _handleFormDelete(event) {
    if (!isOnline()) {
      toast('You can\'t delent event offline');
      return;
    }

    this._changeEventData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  }
}
