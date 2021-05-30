import FilterView from '@view/filter/filter';
import {FilterType, UpdateType, RenderPosition} from 'consts';
import {render, replace, remove} from '@utils/render.js';
import {filter} from '@utils/filter';

export default class Filter {
  constructor(parent, filterModel, eventsModel) {
    this._parent = parent;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._filters = FilterType;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._filters, this._filterModel.getFilter(), this._getFilterEvents());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._parent, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilterEvents() {
    const events = this._eventsModel.getEvents();

    const filtredEverything = filter[FilterType.EVERYTHING](events);
    const filtredFuture = filter[FilterType.FUTURE](events);
    const filtredPast = filter[FilterType.PAST](events);

    const filtredDataLength = {
      [FilterType.EVERYTHING]: filtredEverything.length,
      [FilterType.FUTURE]: filtredFuture.length,
      [FilterType.PAST]: filtredPast.length,
    };

    const emptyFilters = [];

    for (const key in filtredDataLength) {
      if (filtredDataLength[key] === 0) {
        emptyFilters.push(key);
      }
    }

    return emptyFilters;
  }
}
