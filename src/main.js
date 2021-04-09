import {createTripInfo} from '../src/view/trip-info';
import {createMenu} from '../src/view/menu';
import {createFilter} from '../src/view/filter';
import {createSort} from '../src/view/sort';
import {createEventsList} from '../src/view/events-list';
import {createEventsItem} from '../src/view/events-item';
import {createEventsEdit} from './view/events-edit';

import {render} from './common';
import {EVENT_COUNT, RenderPosition} from './const';

const headerElement = document.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const menuElement = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');

render(tripInfoElement, createTripInfo(), RenderPosition.AFTERBEGIN);
render(menuElement, createMenu(), RenderPosition.BEFOREEND);
render(filterElement, createFilter(), RenderPosition.BEFOREEND);
render(tripEventsElement, createSort(), RenderPosition.BEFOREEND);
render(tripEventsElement, createEventsList(), RenderPosition.BEFOREEND);

const siteEventsList = mainElement.querySelector('.trip-events__list');

for (let i = 0; i < EVENT_COUNT; i++) {
  (i === 0) ?
    render(siteEventsList, createEventsEdit(), RenderPosition.BEFOREEND) :
    render(siteEventsList, createEventsItem(), RenderPosition.BEFOREEND);
}
