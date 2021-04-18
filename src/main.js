import InfoView from 'View/info/info';
import NavigationView from 'View/navigation';
import FilterView from 'View/filter/filter';
import SortView from 'View/sort/sort';
import EventListView from 'View/event-list';
import EventItemView from 'View/event-item/event-item';
import EventFormView from 'View/event-form/event-form';
import NoEventsView from 'View/no-events';

import {render, replace} from 'Utils/render';
import {isEscEvent} from 'Utils/event';
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

render(infoElement, new InfoView(trip), RenderPosition.AFTERBEGIN);
render(menuElement, new NavigationView(), RenderPosition.BEFOREEND);
render(filterElement, new FilterView(FilterType), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortView(SortType), RenderPosition.BEFOREEND);
render(tripEventsElement, eventList, RenderPosition.BEFOREEND);

const renderEvent = (eventItem, eventList, isAdd) => {
  const event = new EventItemView(eventItem);
  const eventForm = new EventFormView(eventItem, isAdd);

  const replaceCardToForm = () => replace(eventForm, event);
  const replaceFormToCard = () => replace(event, eventForm);

  const setFormEscHandler = () => {
    replaceFormToCard();
    document.removeEventListener('keydown', onFormEsc);
  };

  const onFormEsc = (evt) => isEscEvent(evt, setFormEscHandler());

  event.setArrowClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onFormEsc);
  });

  eventForm.setArrowClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onFormEsc);
  });

  eventForm.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onFormEsc);
  });

  render(eventList, event, RenderPosition.BEFOREEND);
};

if (trip.length) {
  trip.forEach((event) => renderEvent(event, eventList.getElement(), false));
} else {
  render(eventList.getElement(), new NoEventsView(), RenderPosition.BEFOREEND);
}
