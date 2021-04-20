import InfoView from '@view/info/info';
import NavigationView from '@view/navigation';
import FilterView from '@view/filter/filter';
import TripPresenter from '@presenter/trip';

import {render} from '@utils/render';
import {generateEvent} from '@mock/event';

import {EVENT_COUNT, RenderPosition, MocksCount, FilterType} from 'consts';

const headerElement = document.querySelector('.page-header');
const infoElement = headerElement.querySelector('.trip-main');
const menuElement = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');

const events = new Array(MocksCount.EVENTS).fill().map(generateEvent);
const trip = events.slice(0, EVENT_COUNT);

render(infoElement, new InfoView(trip), RenderPosition.AFTERBEGIN);
render(menuElement, new NavigationView(), RenderPosition.BEFOREEND);
render(filterElement, new FilterView(FilterType), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement);

tripPresenter.init(trip);

// const renderEvent = (eventItem, eventList, isAdd) => {
//   const event = new EventItemView(eventItem);
//   const eventForm = new EventFormView(eventItem, isAdd);

//   const replaceCardToForm = () => replace(eventForm, event);
//   const replaceFormToCard = () => replace(event, eventForm);

//   const setFormEscHandler = () => {
//     replaceFormToCard();
//     document.removeEventListener('keydown', onFormEsc);
//   };

//   const onFormEsc = (evt) => isEscEvent(evt, setFormEscHandler());

//   event.setArrowClickHandler(() => {
//     replaceCardToForm();
//     document.addEventListener('keydown', onFormEsc);
//   });

//   eventForm.setArrowClickHandler(() => {
//     replaceFormToCard();
//     document.removeEventListener('keydown', onFormEsc);
//   });

//   eventForm.setFormSubmitHandler(() => {
//     replaceFormToCard();
//     document.removeEventListener('keydown', onFormEsc);
//   });

//   render(eventList, event, RenderPosition.BEFOREEND);
// };

// const renderTrip = (container, trip) => {
//   render(tripEventsElement, new SortView(SortType), RenderPosition.BEFOREEND);
//   render(tripEventsElement, eventList, RenderPosition.BEFOREEND);
//   if (trip.length) {
//     trip.forEach((event) => renderEvent(event, eventList.getElement(), false));
//   } else {
//     render(eventList.getElement(), new NoEventsView(), RenderPosition.BEFOREEND);
//   }
// };

// renderTrip(tripEventsElement, trip);
