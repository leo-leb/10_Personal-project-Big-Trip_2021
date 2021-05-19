import InfoView from '@view/info/info';
import MenuView from '@view/menu';
import TripPresenter from '@presenter/trip';
import FilterPresenter from '@presenter/filter';
import EventsModel from '@model/events';
import FiltersModel from '@model/filter';
import {render} from '@utils/render';
import {generateEvent} from '@mock/event';
import {EVENT_COUNT, RenderPosition, MocksCount, MenuItem} from 'consts';
import {dataArrayAdapter} from '@utils/adapt';

const headerElement = document.querySelector('.page-header');
const infoElement = headerElement.querySelector('.trip-main');
const menuContainer = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');
const menuComponent = new MenuView();

const events = new Array(MocksCount.EVENTS).fill().map(generateEvent).slice(0, EVENT_COUNT);

const eventsModel = new EventsModel();
const filterModel = new FiltersModel();

eventsModel.setEvents(dataArrayAdapter(events));

render(infoElement, new InfoView(eventsModel.getEvents()), RenderPosition.AFTERBEGIN);
render(menuContainer, menuComponent, RenderPosition.BEFOREEND);

const handleEventNewFormClose = () => {
  menuComponent.setMenuItem(MenuItem.TABLE);
};

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init(handleEventNewFormClose);
      tripPresenter.removeStats();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      tripPresenter.renderStats();
      break;
  }
};

menuComponent.setMenuClickHandler(handleMenuClick);

const filterPresenter = new FilterPresenter(filterElement, filterModel, eventsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);
tripPresenter.init(handleEventNewFormClose);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
  evt.target.disabled = true;
});
