import SortView from '@view/sort/sort';
import EventListContainerView from '@view/event-list-container';
import NoEventsView from '@view/no-events';
import EventPresenter from '@presenter/event';
import {render} from '@utils/render';
import {updateItem} from '@utils/common';
import {RenderPosition, SortType} from 'consts';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};

    this._sortComponent = new SortView(SortType);
    this._eventListContainerComponent = new EventListContainerView();
    this._noEventsComponent = new NoEventsView();

    this._handleEventDataChange = this._handleEventDataChange.bind(this);
    this._handeEventModeChange = this._handeEventModeChange.bind(this);
  }

  init(trip) {
    this._trip = trip.slice();

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventListContainer() {
    render(this._tripContainer, this._eventListContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListContainerComponent, this._handleEventDataChange, this._handeEventModeChange);
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

  _handleEventDataChange(updatedEvent) {
    this._trip = updateItem(this._trip, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handeEventModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
