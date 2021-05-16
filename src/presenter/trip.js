import SortView from '@view/sort/sort';
import EventListContainerView from '@view/event-list-container';
import NoEventsView from '@view/no-events';
import EventPresenter from '@presenter/event';
import EventNewPresenter from '@presenter/new-event';
import {render, remove} from '@utils/render';
import {getEventsByTime, getEventsByPrice, getEventsByDate} from '@utils/sort';
import {filter} from '@utils/filter';
import {RenderPosition, SortType, UpdateType, UserAction, FilterType} from 'consts';

export default class Trip {
  constructor(parrent, eventsModel, filterModel) {
    this._parrent = parrent;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;

    this._eventPresenter = {};
    this._sortComponent = null;

    this._currentSort = SortType.DAY;

    this._eventListContainerComponent = new EventListContainerView();
    this._noEventsComponent = new NoEventsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleEventModeChange = this._handleEventModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._eventNewPresenter = new EventNewPresenter(this._eventListContainerComponent, this._handleViewAction);
  }

  init() {
    this._renderTrip();
  }

  createEvent() {
    this._currentSort = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init();
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
    render(this._parrent, this._sortComponent, RenderPosition.BEFOREEND);

  }

  _renderEventListContainer() {
    render(this._parrent, this._eventListContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListContainerComponent, this._handleViewAction, this._handleEventModeChange, this._handleEventDelete);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    this._getEvents().forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents() {
    render(this._eventListContainerComponent, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    this._renderSort();
    this._renderEventListContainer();

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

    if (resetSortType) {
      this._currentSort = SortType.DAY;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // this._clearTrip({resetSortType: true});
        this._clearTrip(true);
        this._renderTrip();
        // - обновить всю доску (например, при переключении фильтра)
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
    this._renderTrip();
  }
}
