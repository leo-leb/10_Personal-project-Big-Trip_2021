import SortView from '@view/sort/sort';
import EventListContainerView from '@view/event-list-container';
import NoEventsView from '@view/no-events';
import StatsView from '@view/stats';
import LoadingView from '@view/loading';
import EventPresenter from '@presenter/event';
import EventNewPresenter from '@presenter/new-event';
import EventsModel from '@model/events';
import {render, remove} from '@utils/render';
import {getEventsByTime, getEventsByPrice, getEventsByDate} from '@utils/sort';
import {filter} from '@utils/filter';
import {RenderPosition, SortType, UpdateType, UserAction, FilterType, State} from 'consts';

export default class Trip {
  constructor(parent, eventsModel, filterModel, api) {
    this._parent = parent;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._api = api;

    this._eventPresenter = {};
    this._sortComponent = null;

    this._currentSort = SortType.DAY;
    this._isLoading = true;

    this._eventListContainerComponent = new EventListContainerView();
    this._noEventsComponent = new NoEventsView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleEventModeChange = this._handleEventModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._eventListContainerComponent, this._handleViewAction);
  }

  init(newEventClose) {
    this._newEventCloseCallback = newEventClose;

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderSort();
    this._renderTrip();
  }

  destroy() {
    this._clearTrip(true);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent() {
    this._currentSort = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(this._newEventCloseCallback, this._eventsModel);
  }

  renderStats() {
    const events = this._eventsModel.getEvents();
    this._statsComponent = new StatsView(events);
    render(this._parent.parentElement, this._statsComponent, RenderPosition.BEFOREEND);
  }

  removeStats() {
    remove(this._statsComponent);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);

    switch(this._currentSort) {
      case SortType.TIME:
        return getEventsByTime(filtredEvents);
      case SortType.PRICE:
        return getEventsByPrice(filtredEvents);
      case SortType.DAY:
        return getEventsByDate(filtredEvents);
      default:
        return getEventsByDate(filtredEvents);
    }
  }

  _renderSort() {
    this._sortComponent = new SortView(this._currentSort);
    this._sortComponent.setSortClickHandler(this._handleSortTypeChange);
    render(this._parent, this._sortComponent, RenderPosition.BEFOREEND);

  }

  _renderEventListContainer() {
    render(this._parent, this._eventListContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListContainerComponent, this._handleViewAction, this._handleEventModeChange, this._eventsModel);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    this._getEvents().forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents() {
    render(this._eventListContainerComponent, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._eventListContainerComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    this._renderEventListContainer();

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getEvents().length) {
      this._renderEvents();
      return;
    }

    this._renderNoEvents();
  }

  _clearTrip(resetSortType = false) {
    this._eventNewPresenter.destroy();

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());

    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._eventListContainerComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSort = SortType.DAY;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    const adaptedUpdate = EventsModel.adaptToServer(update);

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenter[update.id].setViewState(State.SAVING);
        this._api.updateEvent(adaptedUpdate)
          .then((response) => EventsModel.adaptToClient((response)))
          .then((response) => this._eventsModel.updateEvent(updateType, response))
          .catch(() => this._eventPresenter[update.id].setViewState(State.ABORTING));
        break;
      case UserAction.ADD_EVENT:
        this._eventNewPresenter.setSaving();
        this._api.addEvent(adaptedUpdate)
          .then((response) => EventsModel.adaptToClient((response)))
          .then((response) => this._eventsModel.addEvent(updateType, response))
          .catch(() => this._eventNewPresenter.setAborting());
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter[update.id].setViewState(State.DELETING);
        this._api.deleteEvent(adaptedUpdate)
          .then(() => this._eventsModel.deleteEvent(updateType, update))
          .catch(() => this._eventPresenter[update.id].setViewState(State.ABORTING));
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip(true);
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleEventModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(newSort) {
    if (this._currentSort === newSort) {
      return;
    }

    if (newSort === SortType.EVENT || newSort === SortType.OFFERS) {
      return;
    }

    this._currentSort = newSort;

    this._clearTrip();
    this._renderSort();
    this._renderTrip();
  }
}
