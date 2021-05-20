import InfoView from '@view/info/info';
import MenuView from '@view/menu';
import TripPresenter from '@presenter/trip';
import FilterPresenter from '@presenter/filter';
import EventsModel from '@model/events';
import FiltersModel from '@model/filter';
import {render} from '@utils/render';
import {RenderPosition, MenuItem, UpdateType, AUTHORIZATION, END_POINT} from 'consts';
import Api from './api';

const headerElement = document.querySelector('.page-header');
const infoElement = headerElement.querySelector('.trip-main');
const menuContainer = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');
const menuComponent = new MenuView();

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const filterModel = new FiltersModel();

const handleEventNewFormClose = () => menuComponent.setMenuItem(MenuItem.TABLE);

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

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel, api);
tripPresenter.init(handleEventNewFormClose);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
  evt.target.disabled = true;
});

api.getEvents()
  .then((events) => events.map(EventsModel.adaptToClient))
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
    render(infoElement, new InfoView(eventsModel.getEvents()), RenderPosition.AFTERBEGIN);
    render(menuContainer, menuComponent, RenderPosition.BEFOREEND);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
    render(infoElement, new InfoView(eventsModel.getEvents()), RenderPosition.AFTERBEGIN);
    render(menuContainer, menuComponent, RenderPosition.BEFOREEND);
  });
