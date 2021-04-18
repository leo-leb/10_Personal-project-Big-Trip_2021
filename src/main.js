import InfoView from 'View/info/info';
import NavigationView from 'View/navigation';
import FilterView from 'View/filter/filter';
import SortView from 'View/sort/sort';
import EventListView from 'View/event-list';
import EventItemView from 'View/event-item/event-item';
import EventFormView from 'View/event-form/event-form';
import NoEventsView from 'View/no-events';

import {render} from 'Utils/render';
import {generateEvent} from 'Mock/event';

import {EVENT_COUNT, RenderPosition, MocksCount, FilterType, SortType, KeyCode} from 'consts';

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

  const onEscKeyDown = (evt) => {
    if (evt.key === KeyCode.ESC) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  event.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventForm.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventForm.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventList, event.getElement(), RenderPosition.BEFOREEND);
};

if (trip.length !== 0) {
  trip.forEach((event) => renderEvent(event, eventList.getElement(), false));
} else {
  render(eventList.getElement(), new NoEventsView().getElement(), RenderPosition.BEFOREEND);
}
