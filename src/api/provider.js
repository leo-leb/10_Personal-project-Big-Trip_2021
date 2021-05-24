import {isOnline} from '@utils/common';

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.event);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const createStore1Structure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.name]: current,
    });
  }, {});
};

const createStore2Structure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.type]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, storeEvents, storeDestinations, storeOffers) {
    this._api = api;

    this._storeEvents = storeEvents;
    this._storeDestinations = storeDestinations;
    this._storeOffers = storeOffers;
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events);
          this._storeEvents.setItems(items);
          return events;
        });
    }

    const storeEvents = Object.values(this._storeEvents.getItems());
    return Promise.resolve(storeEvents);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStore1Structure(destinations);
          this._storeDestinations.setItems(items);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._storeDestinations.getItems());
    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStore2Structure(offers);
          this._storeOffers.setItems(items);
          return offers;
        });
    }

    const storeOffers = Object.values(this._storeOffers.getItems());
    return Promise.resolve(storeOffers);
  }

  updateEvent(event) {
    if (isOnline()) {
      return this._api.updateEvent(event)
        .then((updatedEvent) => {
          this._storeEvents.setItem(updatedEvent.id, updatedEvent);
          return updatedEvent;
        });
    }

    this._storeEvents.setItem(event.id, Object.assign({}, event));

    return Promise.resolve(event);
  }

  addEvent(event) {
    if (isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          this._storeEvents.setItem(newEvent.id, newEvent);
          return newEvent;
        });
    }

    return Promise.reject(new Error('Add event failed'));
  }

  deleteEvent(event) {
    if (isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._storeEvents.removeItem(event.id));
    }

    return Promise.reject(new Error('Delete event failed'));
  }

  sync() {
    if (isOnline()) {
      const storeEvents = Object.values(this._storeEvents.getItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);

          const items = createStoreStructure([...createdEvents, ...updatedEvents]);

          this._storeEvents.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
