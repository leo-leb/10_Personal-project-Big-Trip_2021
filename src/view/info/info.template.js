import {sum} from 'mathjs';
import {getShortDate} from '@utils/transform';

const POINTS_LIMIT = 3;

const getRoute = (trip) => {
  const routeList = Array.from(new Set(trip.map((event) => event.destination.name)));

  if (routeList.length <= POINTS_LIMIT) {
    return routeList.join(' &mdash; ');
  } else {
    return routeList.slice(0, 1).concat(routeList.slice(-1)).join(' &mdash; ... &mdash; ');
  }
};

const getDates = (trip) => {
  const eventsList = trip.slice();
  const container = [];
  container.push(getShortDate(eventsList.shift().dateFrom));
  container.push(getShortDate(eventsList.pop().dateTo));
  return container.join(' &mdash; ');
};

const getPrice = (trip) => {
  const container = [];
  for (const event of trip) {
    container.push(event.basePrice);
    event.offers.forEach((elem) => container.push(elem.price));
  }
  return sum(container);
};

export const createInfoTemplate = (trip) => {
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getRoute(trip)}</h1>
      <p class="trip-info__dates">${getDates(trip)}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPrice(trip)}</span>
    </p>
  </section>`;
};
