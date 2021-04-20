import SortView from '@view/sort/sort';
import EventListContainerView from '@view/event-list-container';
import NoEventsView from '@view/no-events';

import EventPresenter from '@presenter/event';

import {render} from '@utils/render';
import {RenderPosition, SortType} from 'consts';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView(SortType);
    this._eventListContainerComponent = new EventListContainerView();
    this._noEventsComponent = new NoEventsView();
    this._eventPresenter = {};
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
    const eventPresenter = new EventPresenter(this._eventListContainerComponent);
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
}
