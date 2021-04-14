import {createTripInfo} from '../src/view/trip-info';
import {createMenu} from '../src/view/menu';
import {createFilterList} from './view/filter-list';
import {createSortList} from './view/sort-list';
import {createEventsList} from '../src/view/events-list';
import {createEventsItem} from '../src/view/events-item';
import {createEventsEdit} from './view/events-edit';

import {EVENT_COUNT, RenderPosition, MocksCount} from './const';
import {render} from './common';

import {generateEvent} from './mock/event';

const headerElement = document.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const menuElement = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');

const events = new Array(MocksCount.EVENTS).fill().map(generateEvent);
const testTrip = events.slice(0, EVENT_COUNT);

render(tripInfoElement, createTripInfo(testTrip), RenderPosition.AFTERBEGIN);
render(menuElement, createMenu(), RenderPosition.BEFOREEND);
render(filterElement, createFilterList(), RenderPosition.BEFOREEND);
render(tripEventsElement, createSortList(), RenderPosition.BEFOREEND);
render(tripEventsElement, createEventsList(), RenderPosition.BEFOREEND);

const siteEventsList = mainElement.querySelector('.trip-events__list');

for (let i = 0; i < testTrip.length; i++) {
  (i === 0) ?
    render(siteEventsList, createEventsEdit(events[i]), RenderPosition.BEFOREEND) :
    render(siteEventsList, createEventsItem(events[i]), RenderPosition.BEFOREEND);
}
