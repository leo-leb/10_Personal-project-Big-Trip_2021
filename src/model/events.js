import Observer from '@utils/observer';

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
    this._destinations = [];
    this._offers = [];
  }

  setData(updateType, data) {
    this._events = data[0].map((data) => Events.adaptToClient(data)).slice();
    this._destinations = data[1].slice();
    this._offers = data[2].slice();

    this._notify(updateType);
  }

  getDestinations() {
    return this._destinations;
  }

  getOffers() {
    return this._offers;
  }

  getEvents() {
    return this._events;
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
      {},
      event,
      {
        basePrice: event.base_price,
        dateFrom: event.date_from,
        dateTo: event.date_to,
        isFavorite: event.is_favorite,
      },
    );

    delete adaptedEvent.base_price;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = Object.assign(
      {},
      event,
      {
        base_price: event.basePrice,
        date_from: event.dateFrom,
        date_to: event.dateTo,
        is_favorite: event.isFavorite,
      },
    );

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
