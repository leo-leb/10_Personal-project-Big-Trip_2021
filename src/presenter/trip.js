import SortView from '@view/sort/sort';
import EventListContainerView from '@view/event-list-container';
import NoEventsView from '@view/no-events';
import EventPresenter from '@presenter/event';
import {render} from '@utils/render';
import {updateItem} from '@utils/common';
import {RenderPosition, SortType} from 'consts';
import {getEventsByTime, getEventsByPrice} from '@utils/sort';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = new SortView(SortType);
    this._eventListContainerComponent = new EventListContainerView();
    this._noEventsComponent = new NoEventsView();

    this._handleEventDataChange = this._handleEventDataChange.bind(this);
    this._handleEventModeChange = this._handleEventModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(trip) {
    this._trip = trip.slice();
    this._originalTrip = this._trip.slice();

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortClickHandler(this._handleSortTypeChange);
  }

  _renderEventListContainer() {
    render(this._tripContainer, this._eventListContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListContainerComponent, this._handleEventDataChange, this._handleEventModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEventList() {
    this._trip.forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents() {
    render(this._eventListContainerComponent, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    this._renderSort();
    this._renderEventListContainer();

    if (this._trip.length) {
      this._renderEventList();
      return;
    }

    this._renderNoEvents();
  }

  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _sortEvents(sortType) {
    switch(sortType) {
      case SortType.TIME:
        this._trip = getEventsByTime(this._trip);
        break;
      case SortType.PRICE:
        this._trip = getEventsByPrice(this._trip);
        break;
      default:
        this._trip = this._originalTrip.slice();
    }
    this._currentSortType = sortType;
  }

  _handleEventDataChange(updatedEvent) {
    this._trip = updateItem(this._trip, updatedEvent);
    this._originalTrip = updateItem(this._originalTrip, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handleEventModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    this._renderEventList();
  }
}
