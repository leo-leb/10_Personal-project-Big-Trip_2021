import InfoView from '@view/info/info';
import NavigationView from '@view/navigation';
import FilterView from '@view/filter/filter';
import TripPresenter from '@presenter/trip';
import {render} from '@utils/render';
import {generateEvent} from '@mock/event';
import {EVENT_COUNT, RenderPosition, MocksCount, FilterType} from 'consts';

import {dataArrayAdapter} from '@utils/adapt';

const headerElement = document.querySelector('.page-header');
const infoElement = headerElement.querySelector('.trip-main');
const menuElement = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');

const events = new Array(MocksCount.EVENTS).fill().map(generateEvent);
const trip = dataArrayAdapter(events).slice(0, EVENT_COUNT);

render(infoElement, new InfoView(trip), RenderPosition.AFTERBEGIN);
render(menuElement, new NavigationView(), RenderPosition.BEFOREEND);
render(filterElement, new FilterView(FilterType), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(trip);
