import SortView from '@view/sort/sort';
import EventListView from '@view/event-list';
import NoEventsView from '@view/no-events';

import PointPresenter from '@presenter/point';

import {render} from '@utils/render';
import {RenderPosition, SortType} from 'consts';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView(SortType);
    this._eventListComponent = new EventListView();
    this._noEventsComponent = new NoEventsView();
    this._pointPresenter = {};
  }

  init(trip) {
    this._trip = trip.slice();

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const pointPresenter = new PointPresenter(this._eventListComponent);
    pointPresenter.init(event);
    this._pointPresenter[event.id] = pointPresenter;
  }

  _renderEvents() {
    this._trip.forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents() {
    render(this._eventListComponent, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    this._renderSort();
    this._renderEventsList();

    if (this._trip.length) {
      this._renderEvents();
      return;
    }

    this._renderNoEvents();
  }
}
