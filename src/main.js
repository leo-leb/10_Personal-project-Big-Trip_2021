import MenuView from '@view/menu';
import TripPresenter from '@presenter/trip';
import FilterPresenter from '@presenter/filter';
import InfoPresenter from '@presenter/info';
import EventsModel from '@model/events';
import FiltersModel from '@model/filter';
import Api from '@api/api';
import Store from '@api/store';
import Provider from '@api/provider';
import {AUTHORIZATION, END_POINT} from '@api/consts';
import {render} from '@utils/render';
import {RenderPosition, MenuItem, UpdateType, StoreName} from 'consts';
import {isOnline} from '@utils/common';
import {toast} from '@utils/toast';

const headerElement = document.querySelector('.page-header');
const infoElement = headerElement.querySelector('.trip-main');
const menuContainerElement = headerElement.querySelector('.trip-controls__navigation');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = mainElement.querySelector('.trip-events');
const menuComponent = new MenuView();

const api = new Api(END_POINT, AUTHORIZATION);

const storeEvents = new Store(StoreName.EVENTS, window.localStorage);
const storeDestinations = new Store(StoreName.DESTINATIONS, window.localStorage);
const storeOffers = new Store(StoreName.OFFERS, window.localStorage);

const apiWithProvider = new Provider(api, storeEvents, storeDestinations, storeOffers);

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

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel, apiWithProvider);
tripPresenter.init(handleEventNewFormClose);

const infoPresenter = new InfoPresenter(infoElement, eventsModel);

Promise.all([
  apiWithProvider.getEvents(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffers()])
  .then((serverData) => eventsModel.setData(UpdateType.INIT, serverData))
  .then(() => {
    infoPresenter.init();
    render(menuContainerElement, menuComponent, RenderPosition.BEFOREEND);
  });

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();

  if (menuComponent.getCurrentValue() === MenuItem.STATS) {
    return;
  }

  if (!isOnline()) {
    toast('You can\'t create new event offline');
    menuComponent.setMenuClickHandler(MenuItem.TABLE);
    return;
  }

  tripPresenter.createEvent();
  evt.target.disabled = true;
});

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
