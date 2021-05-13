import InfoView from '@view/info/info';
import NavigationView from '@view/navigation';
import TripPresenter from '@presenter/trip';
import FilterPresenter from '@presenter/filter';
import EventsModel from '@model/events';
import FilterModel from '@model/filter';
import {render} from '@utils/render';
import {generateEvent} from '@mock/event';
import {EVENT_COUNT, RenderPosition, MocksCount} from 'consts';
import {dataArrayAdapter} from '@utils/adapt';

const headerElement = document.querySelector('.page-header');
const infoElement = headerElement.querySelector('.trip-main');
const menuElement = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');

const events = new Array(MocksCount.EVENTS).fill().map(generateEvent).slice(0, EVENT_COUNT);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

eventsModel.setEvents(dataArrayAdapter(events));

render(infoElement, new InfoView(eventsModel.getEvents()), RenderPosition.AFTERBEGIN);
render(menuElement, new NavigationView(), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(filterElement, filterModel, eventsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
  evt.target.disabled = true;
});
