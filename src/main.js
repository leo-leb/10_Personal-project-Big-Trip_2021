import InfoView from './view/info/info';
import NavigationView from './view/navigation';
import FilterView from './view/filter/filter';
import SortView from './view/sort/sort';
import EventListView from './view/event-list';
import EventItemView from './view/event-item/event-item';
import EventFormView from './view/event-form/event-form';

import {EVENT_COUNT, RenderPosition, MocksCount, FilterType, SortType} from './consts';
import {render} from './utils/render';

import {generateEvent} from './mock/event';

const headerElement = document.querySelector('.page-header');
const infoElement = headerElement.querySelector('.trip-main');
const menuElement = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');

const events = new Array(MocksCount.EVENTS).fill().map(generateEvent);
const trip = events.slice(0, EVENT_COUNT);

const eventList = new EventListView();

render(infoElement, new InfoView(trip).getElement(), RenderPosition.AFTERBEGIN);
render(menuElement, new NavigationView().getElement(), RenderPosition.BEFOREEND);
render(filterElement, new FilterView(FilterType).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortView(SortType).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, eventList.getElement(), RenderPosition.BEFOREEND);

const renderEvent = (eventItem, eventList, isAdd) => {
  const event = new EventItemView(eventItem);
  const eventForm = new EventFormView(eventItem, isAdd);

  const replaceCardToForm = () => eventList.replaceChild(eventForm.getElement(), event.getElement());
  const replaceFormToCard = () => eventList.replaceChild(event.getElement(), eventForm.getElement());

  event.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => replaceCardToForm());
  eventForm.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(eventList, event.getElement(), RenderPosition.BEFOREEND);
};

for (const event of trip) {
  renderEvent(event, eventList.getElement(), false);
}
